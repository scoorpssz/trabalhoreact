import { useState, useEffect, useContext } from 'react';
import HeroInfo from './HeroInfo';
import { superherocontext } from '@/context/superherocontext';
import Loader from './Loader';

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
      let randomFavorites = [];

      while (randomFavorites.length < 3) {
        let randomNum = Math.floor(Math.random() * context.superHeroes.length) + 1;

        if (!randomFavorites.includes(randomNum)) {
          randomFavorites.push(randomNum);
        }
      }

      randomFavorites.forEach((id) => {
        context.toggleFavorite(id);
      });
    }
  };

  return (
    <div className="content">
      {loading && <Loader />}
      <button onClick={generateRandomFavorites}>Mudar Favoritos</button>
      <div className="heroes-grid">
        {context?.superHeroes
          .filter(hero => context?.favorites.includes(hero.id))
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
