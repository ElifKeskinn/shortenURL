"use client";
import Logo from "@/components/svgs/logo";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  return (
    <div>
      <MobileHeader />
    </div>
  );
}

const MobileHeader = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from the API route
    async function fetchUser() {
      const response = await fetch('/api/supabase/createClient', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    }

    fetchUser();
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <div className="mobileHeader">
      <Logo />
      <div className="hamburgerMenu">
        <div className="menu-container">
          <div className="menu-icon" onClick={toggleMenu}>☰</div>
          <nav id="menu" className="menu" style={{ display: 'none' }}>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li className="resources"><a href="#">Resources</a></li>
              <li> <Link href="/login">Login</Link> </li>
              <li> <Link href="/signup">Sign Up</Link> </li>
              {user && (
                <li>Welcome, {user.email}</li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { MobileHeader };
