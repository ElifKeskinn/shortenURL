'use client';
import Logo from '@/components/svgs/logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Hero from './Hero'; 

const MobileHeader = () => {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (user) {
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
    window.location.reload(); 
  };

  return (
    <>
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
                    <li>
                      <button onClick={handleSignOut}>Çıkış Yap</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login">Giriş Yap</Link>
                    </li>
                    <li>
                      <Link href="/signup">Kayıt Ol</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Hero email={user ? user.email : null} /> {/* Hero'ya email'i prop olarak geçiyoruz */}
    </>
  );
};

export default MobileHeader;
