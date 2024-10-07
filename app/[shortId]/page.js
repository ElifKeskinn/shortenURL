import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function RedirectPage({ params }) {
  const { shortId } = params;
  console.log(`Received shortId: ${shortId}`); 

  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('urls')
    .select('long_url')
    .eq('short_url', shortId)
    .single();

  if (error || !data) {
    console.error(`Error fetching URL for shortId ${shortId}:`, error);
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - URL Bulunamadı</h1>
        <p>Girdiğiniz kısa URL geçerli değil.</p>
      </div>
    );
  }

  console.log(`Redirecting to long URL: ${data.long_url}`); // Ek Log
  redirect(data.long_url);
}
