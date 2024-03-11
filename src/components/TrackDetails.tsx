import React from 'react';
import { useParams } from 'react-router-dom';
import { getTrackInfo, TrackInfo } from '../api';
import { secondsToTime } from '../utils';

export const TrackDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [track, setTrack] = React.useState<TrackInfo>({
    id: 0,
    title: '',
    album: { title: '', cover_medium: '' },
    artist: { name: '' },
    duration: 0,
  });

  React.useEffect(() => {
    const fetchTrack = async () => {
      try {
        if (!id) {
          throw new Error('No track id provided');
        }
        const response = await getTrackInfo(id);
        setTrack(response);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchTrack();
  }, [id]);

  if (track.id === 0) {
    return null;
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Track info</h2>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-left'>Title</th>
            <th className='px-4 py-2 text-left'>Album</th>
            <th className='px-4 py-2 text-left'>Artist</th>
            <th className='px-4 py-2 text-left'>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-4 py-2'>{track.title}</td>
            <td className='px-4 py-2'>{track.album.title}</td>
            <td className='px-4 py-2'>{track.artist.name}</td>
            <td className='px-4 py-2'>{secondsToTime(track.duration)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
