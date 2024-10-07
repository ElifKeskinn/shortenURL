import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { longUrl, shortId } = await request.json();
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('urls')
    .insert([{ long_url: longUrl, short_url: shortId }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
