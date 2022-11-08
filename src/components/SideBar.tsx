import { Dispatch, memo, SetStateAction, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { GenreResponseProps } from "../types/GenreResponse";
import { Button } from "./Button";
import 'regenerator-runtime/runtime'

import '../styles/sidebar.scss';

interface SideBarComponentProps {
  selectedGenreId: number;
  setSelectedGenreId: Dispatch<SetStateAction<number>>;
}

export function SideBarComponent({ selectedGenreId, setSelectedGenreId }: SideBarComponentProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const fetchGenres = useCallback(
    async () => {
      await api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    },
    []
  )

  useEffect(() => {
    fetchGenres()
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent)