'use client';
import Logo from '@/components/svgs/logo';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Hero from './Hero'; 

const DesktopHeader = () => {
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload(); 
  };

  return (
    <>
      <div className="desktopHeader">
        <Logo />
        <div className="desktopNav">
          <div className="nav">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Resources</a>
          </div>
        </div>
        <div className="loginNav">
          {user ? (
            <>
             <Link href="/user-links">Kısaltılmış Linklerim</Link>
               <button className="signOutBtn"  onClick={handleSignOut}>Çıkış Yap</button>
            </>
          ) : (
            <>
              <Link href="/login">Giriş Yap</Link>
              <Link href="/signup">Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
      <Hero email={user ? user.email : null} /> 
    </>
  );
};

export default DesktopHeader;
