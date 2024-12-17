"use client";
import React, { useContext } from "react";
import { SuperHeroContext } from "../Context/SuperHeroContext";

export default function Dashboard() {
  const context = useContext(SuperHeroContext);

  if (!context) {
    return <div>Context not found</div>;
  }

  const { superHeroes, favorites, deleteHero, toggleFavorite } = context;

  if (superHeroes.length === 0) {
    return <div>Não há super-heróis para exibir.</div>;
  }

  return (
    <div>
      <h1>Super-Heróis Dashboard</h1>
      <table cellSpacing="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Superpoder</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {superHeroes.map((hero) => (
            <tr key={hero.id}>
              <td>{hero.id}</td>
              <td>
                <img src={hero.image} alt={hero.name} width="50" />
              </td>
              <td>{hero.name}</td>
              <td>{hero.super_power || "N/D"}</td>
              <td>
                <button onClick={() => deleteHero(hero.id)}>Apagar</button>
                <button onClick={() => toggleFavorite(hero.id)}>
                  {favorites.find((fav) => fav.id === hero.id)
                    ? "Remover Favorito"
                    : "Adicionar Favorito"}
                </button>
                <button>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
