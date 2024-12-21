import { useState, useEffect, useContext } from "react";
import HeroInfo from "./HeroInfo";
import { superherocontext } from "@/context/superherocontext";
import Loader from "./Loader";

const Content = () => {
  const context = useContext(superherocontext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    if (context) {
      const { superHeroes, setFavorites } = context;

      if (superHeroes.length >= 3) {
        const randomFavorites = new Set();
        
        while (randomFavorites.size < 3) {
          const randomHero = superHeroes[Math.floor(Math.random() * superHeroes.length)];
          randomFavorites.add(randomHero.id);
        }

        setFavorites(Array.from(randomFavorites));
      }
    }

    return () => clearTimeout(timeout);
  }, [context]);

  const generateRandomFavorites = () => {
    if (context) {
      const { superHeroes, setFavorites } = context;

      if (superHeroes.length >= 3) {
        const randomFavorites = new Set();

        while (randomFavorites.size < 3) {
          const randomHero = superHeroes[Math.floor(Math.random() * superHeroes.length)];
          randomFavorites.add(randomHero.id);
        }

        setFavorites(Array.from(randomFavorites));
      }
    }
  };

  return (
    <div className="content">
      {loading && <Loader />}
      <button onClick={generateRandomFavorites}>Mudar Favoritos</button>
      <div className="heroes-grid">
        {context?.favorites.slice(0, 3).map((favoriteId) => {
          const hero = context.superHeroes.find((h) => h.id === favoriteId);
          return hero ? (
            <div className="hero-card" key={hero.id}>
              <HeroInfo
                image={hero.image}
                name={hero.name}
                superPower={hero.super_power}
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Content;
