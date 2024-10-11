'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './UserLinks.module.css';

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
    return <div className={styles.loading}>Yükleniyor...</div>;
  }

  return (
    <div className={styles.userLinksPage}>
      <h1 className={styles.pageTitle}>{user?.email} için kısaltılmış linkler</h1>
      {links.length > 0 ? (
        <ul className={styles.linksList}>
          {links.map((link) => (
            <li key={link.id} className={styles.linkItem}>
              <a href={link.short_url} target="_blank" rel="noopener noreferrer" className={styles.shortUrl}>
                {link.short_url}
              </a> - <span className={styles.longUrl}>{link.long_url}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noLinksMessage}>Henüz hiç link kısaltmadınız.</p>
      )}
    </div>
  );
};


export default UserLinks;
