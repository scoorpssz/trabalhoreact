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
      const updatedList = [...currentData, hero];
      UpdateSuperhero(updatedList);
      return updatedList;
    });
  };

  const editHero = (updatedHero: Hero) => {
    setSuperHeroes(superHeroes.map(hero => (hero.id === updatedHero.id ? updatedHero : hero)));
    UpdateSuperhero(superHeroes.map(hero => (hero.id === updatedHero.id ? updatedHero : hero)));
  };

  const deleteHero = (id: number) => {
    setSuperHeroes(superHeroes.filter(hero => hero.id !== id));
    setFavorites(favorites.filter(hero => hero.id !== id));
    UpdateSuperhero(superHeroes.filter(hero => hero.id !== id));
    UpdateTop(favorites.filter(hero => hero.id !== id));
  };

  const toggleFavorite = (id: number) => {
    if (favorites.some(hero => hero.id === id)) {
      setFavorites(favorites.filter(hero => hero.id !== id));
      UpdateTop(favorites.filter(hero => hero.id !== id));
    } else {
      const heroToAdd = superHeroes.find(hero => hero.id === id);
      if (heroToAdd) {
        setFavorites([...favorites, heroToAdd]);
        UpdateTop([...favorites, heroToAdd]);
      }
    }
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