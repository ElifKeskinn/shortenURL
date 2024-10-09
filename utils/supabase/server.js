import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerComponentClient({
    cookies: () => cookieStore,
  });
}

export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { email, password, action, firstName, lastName } = await req.json();

  let error;
  if (action === 'login') {
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    error = loginError;
  } else if (action === 'signup') {
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          role: 'user',
          profilePhoto: '',
          bio: '',
          birthDate: '',
        },
      },
    });
    error = signupError;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
