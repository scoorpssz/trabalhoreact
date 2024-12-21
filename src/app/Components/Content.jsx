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

    return () => clearTimeout(timeout);
  }, []);

  const generateRandomFavorites = () => {
    if (context) {
      const { superHeroes, setFavorites } = context;
      const randomFavorites = [];
      while (randomFavorites.length < 3) {
        const randomHero = superHeroes[Math.floor(Math.random() * superHeroes.length)];
        if (!randomFavorites.includes(randomHero.id)) {
          randomFavorites.push(randomHero.id);
        }
      }
      setFavorites(randomFavorites);
    }
  };

  return (
    <div className="content">
      {loading && <Loader />}
      <button onClick={generateRandomFavorites}>Mudar Favoritos</button>
      <div className="heroes-grid">
        {context?.superHeroes
          .filter((hero) => context?.favorites.includes(hero.id))
          .slice(0, 3)
          .map((hero) => (
            <div className="hero-card" key={hero.id}>
              <HeroInfo
                image={hero.image}
                name={hero.name}
                superPower={hero.super_power}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Content;
