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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email" className="form-label">Email:</label>
        <input id="email" name="email" type="email" required className="input-field" />

        <label htmlFor="password" className="form-label">Password:</label>
        <input id="password" name="password" type="password" required className="input-field" />
        <button type="submit" className="submit-btn">Giriş Yap</button>
      </form>
      {error && <p className="error-message">{error}</p>} 
    </div>
  );
}
