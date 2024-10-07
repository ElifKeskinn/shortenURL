import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {createClient} from './client.js';

export { createClient };


export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore in Server Component
          }
        },
      },
    }
  );

  const { email, password, action } = await req.json();

  let error;
  if (action === 'login') {
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    error = loginError;
  } else if (action === 'signup') {
    const { error: signupError } = await supabase.auth.signUp({ email, password });
    error = signupError;
  }

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
