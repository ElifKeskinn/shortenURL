'use server';

import { redirect } from 'next/navigation';

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch('/api/supabase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email, 
      password, 
      action: 'login' 
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error(`Giriş olurken hata: ${data.error}`);
    redirect('/error');
  } else {
    redirect('/');
  }
}
