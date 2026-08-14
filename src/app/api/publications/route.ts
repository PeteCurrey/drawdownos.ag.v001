import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, author, description, language, default_price, default_currency } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { data, error } = await supabaseServer
      .from('publications')
      .insert({
        title,
        subtitle: subtitle || null,
        author: author || '',
        slug: `${slug}-${Date.now().toString(36)}`,
        description: description || null,
        language: language || 'en',
        default_price: default_price || 0,
        default_currency: default_currency || 'GBP',
        status: 'DRAFT',
      })
      .select()
      .single();

    if (error) {
      console.error('[POST /api/publications]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
