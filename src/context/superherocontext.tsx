"use client";
import React, { createContext, useState, useEffect } from "react";
import { PUBLIC_ID, GetHeroesFromUsers, GetTopHeroesFromUsers, UpdateSuperhero, UpdateTop } from '@/services/api';

interface Hero {
  id: number;
  name: string;
  super_power: string;
  image: string;
}

interface SuperheroContextType {
  superHeroes: Hero[];
  favorites: Hero[];
  addHero: (hero: Hero) => void;
  editHero: (updatedHero: Hero) => void;
  deleteHero: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

export const superherocontext = createContext<SuperheroContextType | undefined>(undefined);

export const SuperHeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [superHeroes, setSuperHeroes] = useState<Hero[]>([]);
  const [favorites, setFavorites] = useState<Hero[]>([]);

  useEffect(() => {
    GetHeroesFromUsers(PUBLIC_ID).then(res => {
      setSuperHeroes(res);
    });
  }, []);

  useEffect(() => {
    GetTopHeroesFromUsers(PUBLIC_ID).then(res => {
      setFavorites(res);
    });
  }, []);

  const addHero = (hero: Hero) => {
    setSuperHeroes((currentData) => {
      const newId = currentData.length > 0 ? Math.max(...currentData.map(h => h.id)) + 1 : 1;
      const heroWithId = { ...hero, id: newId };
      const updatedList = [...currentData, heroWithId];
      UpdateSuperhero(updatedList);
      return updatedList;
    });
  };

  const editHero = (updatedHero: Hero) => {
    setSuperHeroes(superHeroes.map(hero => (hero.id === updatedHero.id ? updatedHero : hero)));
    UpdateSuperhero(superHeroes.map(hero => (hero.id === updatedHero.id ? updatedHero : hero)));
  };

  const deleteHero = (id: number) => {
    const updatedHeroes = superHeroes.filter(hero => hero.id !== id);
    const updatedFavorites = favorites.filter(hero => hero.id !== id);
    setSuperHeroes(updatedHeroes);
    setFavorites(updatedFavorites);
    UpdateSuperhero(updatedHeroes);
    UpdateTop(updatedFavorites);
  };

  const toggleFavorite = (id: number) => {
    const heroToAdd = superHeroes.find(hero => hero.id === id);

    if (!heroToAdd) return;

    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(hero => hero.id === id);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter(hero => hero.id !== id)
        : [...prevFavorites, heroToAdd];

      UpdateTop(updatedFavorites);
      return updatedFavorites;
    });
  };

  const contextValue = {
    superHeroes,
    favorites,
    addHero,
    editHero,
    deleteHero,
    toggleFavorite,
  };

  return (
    <superherocontext.Provider value={contextValue}>
      {children}
    </superherocontext.Provider>
  );
};
