'use client';
import Logo from '@/components/svgs/logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const MobileHeader = () => {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="mobileHeader">
      <Logo />
      <div className="hamburgerMenu">
        <div className="menu-container">
          <div className="menu-icon" onClick={toggleMenu}>
            ☰
          </div>
          <nav id="menu" className="menu" style={{ display: 'none' }}>
            <ul>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li className="resources">
                <a href="#">Resources</a>
              </li>
              {user ? (
                <>
                  <span>Hello {user.email}</span>
                  <button onClick={handleSignOut}>Çıkış Yap</button>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
