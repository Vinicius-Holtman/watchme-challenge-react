import { useCallback, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime'

import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';
import { GenreResponseProps } from './types/GenreResponse';
import { MovieProps } from './types/Movie';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  const fetchMovies = useCallback(
    async () => {
      await api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data);
      });
    },
    [selectedGenreId]
  )

  const fetchSelectedGenre = useCallback(
    async () => {
      await api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    },
    [selectedGenreId]
  )

  useEffect(() => {
    fetchMovies()
    fetchSelectedGenre()
  }, [selectedGenreId, fetchMovies, fetchSelectedGenre]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} setSelectedGenreId={setSelectedGenreId} />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  )
}