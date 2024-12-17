"use client";
import React, { createContext, useState, useEffect } from "react";
import heroesList from "../shared/heroesList";
a
interface Hero {
  id: string;
  name: string;
  image: string;
  super_power: string;
}

interface SuperHeroContextType {
  superHeroes: Hero[];
  favorites: Hero[];
  addHero: (hero: Omit<Hero, "id">) => void;
  editHero: (hero: Hero) => void;
  deleteHero: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const SuperHeroContext = createContext<SuperHeroContextType | undefined>(undefined);

export const SuperHeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [superHeroes, setSuperHeroes] = useState<Hero[]>([]);
  const [favorites, setFavorites] = useState<Hero[]>([]);

  useEffect(() => {
    if (superHeroes.length === 0) {
      setSuperHeroes(heroesList);
    }
  }, [superHeroes]);

  const addHero = (hero: Omit<Hero, "id">) => {
    const newHero = { ...hero, id: Date.now().toString() };
    setSuperHeroes([...superHeroes, newHero]);
  };

  const editHero = (updatedHero: Hero) => {
    setSuperHeroes(superHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero)));
  };

  const deleteHero = (id: string) => {
    setSuperHeroes(superHeroes.filter((hero) => hero.id !== id));
    setFavorites(favorites.filter((hero) => hero.id !== id));
  };

  const toggleFavorite = (id: string) => {
    const hero = superHeroes.find((hero) => hero.id === id);
    if (!hero) return;

    if (favorites.find((fav) => fav.id === id)) {
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } else {
      setFavorites([...favorites, hero]);
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
    <SuperHeroContext.Provider value={contextValue}>
      {children}
    </SuperHeroContext.Provider>
  );
};
