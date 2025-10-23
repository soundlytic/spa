import apiClient from './index';

export interface Song {
  id: string
  title: string
  source: string
  file_path: string
  status: string
  metadata: {file_type: string}
  local_song_features: LocalSongFeatures
  created_at: string
}

export interface LocalSongFeatures {
  genre: {name: string, value: string}[]
  mood: {name: string, value: string}[]
  aggressive: number
  happy: number
  sad: number
  relaxed: number
  engagement: number
  bpm: number
}


export const upload = async (file: File):Promise<void> => {
  const formData = new FormData();
  formData.append("files", file); // must match backend field name

  await apiClient.post<void>('me/upload-song', formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
}

export const getSongs = async ():Promise<Song[]> => {
  const response = await apiClient.get<Song[]>('me/get-songs')

  return response.data
}