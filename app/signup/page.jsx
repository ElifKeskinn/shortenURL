'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { firstName, lastName, email, password } = Object.fromEntries(formData);

    const { error } = await supabase.auth.signUp({
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

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input type="text" name="firstName" placeholder="Adınız" required />
        <input type="text" name="lastName" placeholder="Soyadınız" required />
        <input type="email" name="email" placeholder="E-posta Adresiniz" required />
        <input type="password" name="password" placeholder="Şifreniz" required />
        <button type="submit">Kayıt Ol</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
}
