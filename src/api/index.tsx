const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com';
const X_RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';

export type SearchInfo = {
  data: Array<{
    id: number;
    title: string;
    album: {
      title: string;
      cover_medium: string;
    };
  }>;
};

export type TrackInfo = {
  id: number;
  title: string;
  album: {
    title: string;
    cover_medium: string;
  };
  artist: {
    name: string;
  };
  duration: number;
};

export const getArtistByText = async (artist: string): Promise<SearchInfo> => {
  const response = await fetch(`${BASE_URL}/search?q=${artist}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': X_RAPID_API_HOST,
      'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
    },
  });

  return response.json();
};

export const getTrackInfo = async (id: string): Promise<TrackInfo> => {
  const response = await fetch(`${BASE_URL}/track/${id}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': X_RAPID_API_HOST,
      'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
    },
  });

  return response.json();
};
