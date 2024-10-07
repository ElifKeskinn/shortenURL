'use client';

import { useState } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const result = await login(formData);

    if (result.success) {
      window.location.href = result.redirectTo;  
    } else {
      setError(result.message);  
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Log in</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </form>
  );
}
