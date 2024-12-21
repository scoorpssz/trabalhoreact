"use client";
import React, { createContext, useState, useEffect } from "react";
import { PUBLIC_ID, GetHeroesFromUsers, GetTopHeroesFromUsers, UpdateSuperhero, UpdateTop } from '@/services/api';


interface superherocontextType {
  superHeroes: any[];
  favorites: any[];
  addHero: (hero: any) => void;
  editHero: (updatedHero: any) => void;
  deleteHero: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

export const superherocontext = createContext<superherocontextType | undefined>(undefined);

export const SuperHeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [superHeroes, setSuperHeroes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    GetHeroesFromUsers(PUBLIC_ID).then(res => {
      setSuperHeroes(res);
    })
  });

  useEffect(() => {
    GetTopHeroesFromUsers(PUBLIC_ID).then(res => {
      setFavorites(res);
    });
  }, []);

  const addHero = (hero: any) => {
    const newHero = { ...hero, id: Date.now() };
    setSuperHeroes((currentData) => {
      const updatedList = currentData.map((item) => {
        if (item.id === parseInt(hero.id)) {
          return {
            ...item,
            name: hero.name,
            super_power: hero.super_power,
            image: hero.image,
          };
        }
        return item;
      });

      if (!updatedList.some(item => item.id === parseInt(hero.id))) {
        updatedList.push({
          id: currentData.length ? currentData[currentData.length - 1].id + 1 : 1,
          name: hero.name,
          super_power: hero.super_power,
          image: hero.image,
        });
      }

      UpdateSuperhero(updatedList);
      return updatedList;
    });
  };

  const editHero = (updatedHero: any) => {
    setSuperHeroes(superHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero)));
    UpdateSuperhero(superHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero)));
    UpdateTop(superHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero)));
  };

  const deleteHero = (id: number) => {
    setSuperHeroes(superHeroes.filter((hero) => hero.id !== id));
    setFavorites(favorites.filter((hero) => hero.id !== id));
    UpdateSuperhero(superHeroes.filter((hero) => hero.id !== id));
    UpdateTop(favorites.filter((hero) => hero.id !== id));
  };

  const toggleFavorite = (id: number) => {
    const isFavorite = favorites.includes(id);
    
    if (isFavorite) {
     
      const updatedFavorites = favorites.filter(favId => favId !== id);
      setFavorites(updatedFavorites);
      UpdateTop(updatedFavorites); 
    } else {
      // Se não é favorito, adiciona na lista
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
      UpdateTop(updatedFavorites); 
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