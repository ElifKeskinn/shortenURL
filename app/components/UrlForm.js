'use client';

import { useState } from 'react';

function makeid(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
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

    let shortId = makeid(6);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl, shortId }),
      });

      const data = await response.json();

      if (data.error) {
        setMessage(`Hata: ${data.error}`);
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
          Kısa URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
