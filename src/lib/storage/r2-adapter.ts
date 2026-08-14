/**
 * DRAWDOWN OS — CLOUDFLARE R2 STORAGE ADAPTER
 * Uses AWS SDK v3 with Cloudflare R2 S3-compatible API.
 * This is SERVER-SIDE ONLY. Never import from client components.
 *
 * Required environment variables:
 *   R2_ENDPOINT          — https://<account-id>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID     — R2 access key
 *   R2_SECRET_ACCESS_KEY — R2 secret key
 *   R2_BUCKET_NAME       — bucket name
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      'Cloudflare R2 is not configured. Set R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME in your environment.'
    );
    this.name = 'StorageNotConfiguredError';
  }
}

export interface StorageObjectMetadata {
  key: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  checksum?: string;
  eTag?: string;
  lastModified?: string;
}

export interface StorageStatus {
  configured: boolean;
  connected: boolean;
  bucketName: string | null;
  endpoint: string | null;
  error?: string;
}

function getR2Client(): S3Client {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new StorageNotConfiguredError();
  }

  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getBucketName(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new StorageNotConfiguredError();
  return bucket;
}

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.R2_ENDPOINT &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  );
}

export async function getStorageStatus(): Promise<StorageStatus> {
  if (!isStorageConfigured()) {
    return {
      configured: false,
      connected: false,
      bucketName: null,
      endpoint: null,
      error: 'R2 credentials not configured.',
    };
  }

  try {
    const client = getR2Client();
    const bucket = getBucketName();
    await client.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 }));
    return {
      configured: true,
      connected: true,
      bucketName: bucket,
      endpoint: process.env.R2_ENDPOINT ?? null,
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      bucketName: process.env.R2_BUCKET_NAME ?? null,
      endpoint: process.env.R2_ENDPOINT ?? null,
      error: err instanceof Error ? err.message : 'R2 connection failed.',
    };
  }
}

export async function uploadObject(
  key: string,
  data: Buffer | Uint8Array,
  mimeType: string,
  meta?: Record<string, string>
): Promise<StorageObjectMetadata> {
  const client = getR2Client();
  const bucket = getBucketName();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: data,
      ContentType: mimeType,
      Metadata: meta,
    })
  );

  const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));

  return {
    key,
    fileName: key.split('/').pop() ?? key,
    sizeBytes: head.ContentLength ?? data.byteLength,
    mimeType: head.ContentType ?? mimeType,
    eTag: head.ETag,
    lastModified: head.LastModified?.toISOString(),
  };
}

export async function getObjectMetadata(key: string): Promise<StorageObjectMetadata | null> {
  try {
    const client = getR2Client();
    const bucket = getBucketName();
    const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return {
      key,
      fileName: key.split('/').pop() ?? key,
      sizeBytes: head.ContentLength ?? 0,
      mimeType: head.ContentType ?? 'application/octet-stream',
      eTag: head.ETag,
      lastModified: head.LastModified?.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function objectExists(key: string): Promise<boolean> {
  const meta = await getObjectMetadata(key);
  return meta !== null;
}

export async function getSignedDownloadUrl(
  key: string,
  expiresInSeconds = 3600
): Promise<string> {
  const client = getR2Client();
  const bucket = getBucketName();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresInSeconds = 900
): Promise<string> {
  const client = getR2Client();
  const bucket = getBucketName();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function deleteObject(key: string): Promise<void> {
  const client = getR2Client();
  const bucket = getBucketName();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

/**
 * R2 object key conventions
 */
export function buildObjectKey(
  publicationId: string,
  role: 'masters' | 'covers' | 'previews' | 'epub' | 'kpf' | 'other',
  version: string,
  filename: string
): string {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  if (role === 'covers' || role === 'previews' || role === 'other') {
    return `publications/${publicationId}/${role}/${safe}`;
  }
  return `publications/${publicationId}/${role}/${version}/${safe}`;
}
