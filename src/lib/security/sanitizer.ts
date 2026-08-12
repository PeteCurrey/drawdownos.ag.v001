// INPUT SANITIZATION & XSS DEFENSE MODULE
// Ensures user input and marketplace copy snippets are safely sanitized before storage and rendering.

export function sanitizeInputText(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function maskSecretValue(value: string, visibleChars: number = 4): string {
  if (!value) return '';
  if (value.length <= visibleChars * 2) return '***';
  const start = value.substring(0, visibleChars);
  const end = value.substring(value.length - visibleChars);
  return `${start}***${end}`;
}

export function validateCanonicalIdFormat(id: string): boolean {
  // Enforces canonical ID format e.g. DD-HTT-001 or DD-PAM-002
  const canonicalRegex = /^DD-[A-Z0-9]{3,6}-[0-9]{3}$/;
  return canonicalRegex.test(id);
}
