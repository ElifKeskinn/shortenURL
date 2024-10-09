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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <input type="text" name="firstName" placeholder="Adınız" required className="input-field" />
        <input type="text" name="lastName" placeholder="Soyadınız" required className="input-field" />
        <input type="email" name="email" placeholder="E-posta Adresiniz" required className="input-field" />
        <input type="password" name="password" placeholder="Şifreniz" required className="input-field" />
        <button type="submit" className="submit-btn">Kayıt Ol</button>
      </form>
      {error && <p className="error-message">{error}</p>} 
    </div>
  );
}