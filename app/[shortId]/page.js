import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function RedirectPage({ params }) {
  const { shortID } = params;
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('urls')
    .select('long_url')
    .eq('short_url', shortID)
    .single();

  if (error || !data) {
    console.error(`Error fetching URL for shortId ${shortID}:`, error);
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - URL Bulunamadı</h1>
        <p>Girdiğiniz kısa URL geçerli değil.</p>
      </div>
    );
  }

  console.log(`Redirecting to long URL: ${data.long_url}`);
  redirect(data.long_url);
}
