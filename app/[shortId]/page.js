import { redirect } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default async function RedirectPage({ params }) {
    const { shortId } = params;

    console.log(`Redirecting for shortId: ${shortId}`);

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

    console.log(`Redirecting to long URL: ${data.long_url}`);
    redirect(data.long_url);
}
