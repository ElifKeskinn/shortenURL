'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleLogin = async (event) => {
    event.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(event.target));

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Giriş Yap</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </form>
  );
}
