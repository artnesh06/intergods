import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Active, DataRef, Over } from '@dnd-kit/core';
import { ColumnDragData } from '@/components/kanban/board-column';
import { TaskDragData } from '@/components/kanban/task-card';
import axios from 'axios';

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true;
  }

  return false;
}


export function formatAmount(amount: number | undefined | null) {
  if (!amount) return '0';
  return amount.toLocaleString('en-US'); // Menggunakan lokasi 'en-US' untuk memastikan koma sebagai pemisah ribuan
}

const getAccessToken = async (clientId: string, clientSecret: string) => {
  
  const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
          }
      }
  );
  
  return response.data.access_token;
};

export const getAlbum = async (clientId: string, clientSecret: string, albumId: string) => {
  const token = await getAccessToken(clientId, clientSecret);
  const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
  });

  return response.data;
};

export const getArtistAlbums = async (clientId: string, clientSecret: string, artistId: string) => {
  const token = await getAccessToken(clientId, clientSecret);
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: { 'Authorization': `Bearer ${token}` }
  });

  return response.data.items; // List album
};

export const getPlaylist = async (clientId: string, clientSecret: string, playlistId: string) => {
  try {
      const token = await getAccessToken(clientId, clientSecret);
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      });

      return response.data;
  } catch (error) {
      console.error('Error fetching playlist:', error);
      return null;
  }
};