'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function makeid(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export default function UrlForm() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setShortUrl('');
        setIsLoading(true);

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
            setIsLoading(false);
            return;
        }

        let shortId;
        let exists = true;
        let attempts = 0;
        const maxAttempts = 5;

        try {
            while (exists && attempts < maxAttempts) {
                shortId = makeid(6);
                const { data, error } = await supabase
                    .from('urls')
                    .select('id')
                    .eq('short_url', shortId)
                    .single();

                if (error && error.code === 'PGRST116') { // 404 Not Found
                    exists = false;
                } else if (!error && data) {
                    attempts += 1;
                } else {
                    throw error;
                }
            }

            if (exists) {
                setMessage('Kısa ID oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.');
                setIsLoading(false);
                return;
            }

            const { data: insertData, error: insertError } = await supabase
                .from('urls')
                .insert([{ short_url: shortId, long_url: longUrl }]);

            if (insertError) {
                setMessage('Bir hata oluştu: ' + insertError.message);
            } else {
                setShortUrl(`${window.location.origin}/${shortId}`);
                setMessage('Kısa URL oluşturuldu!');
                setLongUrl('');
            }
        } catch (error) {
            console.error('Error during URL shortening:', error);
            setMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="linkArea">
            <h1 className="title">Kısa URL Oluştur</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Uzun URL'yi buraya girin"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    className="link-input"
                />
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Kısaltılıyor...' : 'Kısalt'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {shortUrl && (
                <p className="short-url">
                    Kısa URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </p>
            )}
        </div>
    );
}
