import React from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getArtistByText, SearchInfo } from '../api';

export const ArtistList = () => {
  const [query, setQuery] = React.useState('');
  const [artist, setArtists] = React.useState<SearchInfo | null>(null);
  const [error, setError] = React.useState<string>('');

  const searchArtist = async (searchQuery: string) => {
    try {
      const response = await getArtistByText(searchQuery);
      setArtists(response);
    } catch (error) {
      console.error('Error fetching info:', error);
    }
  };

  const debouncedSearch = debounce(searchArtist, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length < 3) {
      setError('Search query must be at least 3 characters long');
      return;
    }
    setError('');
    debouncedSearch(value);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Tracks</h1>
      <input
        type='text'
        value={query}
        onChange={handleSearch}
        placeholder='Search artist...'
        className='w-full border border-gray-300 rounded-md px-4 py-2 mb-4'
        minLength={3}
      />
      {error && <p className='text-red-500'>{error}</p>}
      {artist === null && query.length > 0 && <p>Loading...</p>}
      {artist && artist.data.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className='container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {artist &&
            artist.data.map((artist) => (
              <div
                key={artist.id}
                className='border border-gray-300 p-4 rounded-md'
              >
                <h2 className='text-lg font-semibold mb-2'>{artist.title}</h2>
                <p className='text-sm text-gray-600 mb-2'>
                  Album: {artist.album.title}
                </p>
                <img
                  src={artist.album.cover_medium}
                  alt={artist.album.title}
                  className='rounded-md'
                />
                <Link
                  to={`/track/${artist.id}`}
                  className='text-blue-500 hover:underline block mt-2'
                >
                  View info
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
