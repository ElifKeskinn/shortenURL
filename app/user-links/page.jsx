'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const UserLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUserAndLinks() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Kullanıcı bilgileri alınamadı:', userError);
        setLoading(false);
        return;
      }

      console.log('Kullanıcı bilgisi:', user);

      if (user) {
        setUser(user);

        const { data: linksData, error: linksError } = await supabase
          .from('urls')
          .select('*')
          .eq('user_id', user.id); 

        if (linksError) {
          console.error('Linkler getirilemedi:', linksError);
        } else {
          console.log('Kullanıcının linkleri:', linksData);
          setLinks(linksData);
        }
      }
      setLoading(false);
    }

    fetchUserAndLinks();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>{user?.email} için kısaltılmış linkler</h1>
      {links.length > 0 ? (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.short_url} target="_blank" rel="noopener noreferrer">
                {link.short_url}
              </a> - {link.long_url}
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz hiç link kısaltmadınız.</p>
      )}
    </div>
  );
};

export default UserLinks;
