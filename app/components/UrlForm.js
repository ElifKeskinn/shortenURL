'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default function UrlForm() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        };

        if (!isValidUrl(longUrl)) {
            setMessage('Geçersiz URL formatı.');
            return;
        }

        let shortId = makeid(6);
        let exists = true;

        while (exists) {
            const { data, error } = await supabase
                .from('urls')
                .select('id')
                .eq('short_url', shortId)
                .single();

            if (error && error.code === 'PGRST116') { // No rows found
                exists = false;
            } else {
                shortId = makeid(6);
            }
        }

        const { data, error } = await supabase
            .from('urls')
            .insert([
                { short_url: shortId, long_url: longUrl }
            ]);

        if (error) {
            setMessage('Bir hata oluştu: ' + error.message);
        } else {
            setShortUrl(`${window.location.origin}/${shortId}`);
            setMessage('Kısa URL oluşturuldu!');
            setLongUrl('');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Kısa URL Oluştur</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Uzun URL'yi buraya girin"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Kısalt
                </button>
            </form>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
            {shortUrl && (
                <p style={{ marginTop: '10px' }}>
                    Kısa URL: <a href={shortUrl} style={{ color: '#0070f3' }}>{shortUrl}</a>
                </p>
            )}
        </div>
    );
}
