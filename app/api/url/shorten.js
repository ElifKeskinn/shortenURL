import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  console.log('API Endpoint: /api/url/shorten - POST Request Received');  
  const supabase = createRouteHandlerClient({ cookies });

  const { longUrl, shortId } = await req.json();
  console.log('Received longUrl:', longUrl);
  console.log('Received shortId:', shortId);

  if (!longUrl || !shortId) {
    console.log('Eksik parametreler:', { longUrl, shortId });
    return NextResponse.json({ error: 'Eksik parametreler.' }, { status: 400 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.log('User error:', userError.message);
    return NextResponse.json({ error: 'Kullanıcı giriş yapmamış.' }, { status: 401 });
  }
  if (!user) {
    console.log('No user found.');
    return NextResponse.json({ error: 'Kullanıcı giriş yapmamış.' }, { status: 401 });
  }
  
  console.log('User ID:', user.id);

  const { data, error } = await supabase
    .from('urls')
    .insert([
      { long_url: longUrl, short_url: shortId, user_id: user.id }
    ]);

  if (error) {
    console.log("Veritabanına ekleme hatası:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log('URL başarıyla veritabanına eklendi:', data);

  return NextResponse.json({ success: true }, { status: 200 });
}
