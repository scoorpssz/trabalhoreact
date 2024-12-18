"use client";
import React, { useContext } from "react";
import { SuperHeroContext } from "../Context/SuperHeroContext";
import Link from "next/link";
import "./dashboard.css";

export default function Dashboard() {
  const context = useContext(SuperHeroContext);

  if (!context) {
    return <div>Context not found</div>;
  }

  const { superHeroes, favorites, deleteHero, toggleFavorite } = context;

  if (superHeroes.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>League of Heroes Dashboard</h1>
        </div>
        <div className="no-heroes">Não há super-heróis para exibir.</div>
        <div className="add-hero-link">
          <Link href="/add-edit-hero" className="add-button">
            Adicionar Super-Herói
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Super-Heróis Dashboard</h1>
        <div className="dashboard-actions">
          <Link href="/" className="nav">Home</Link>
          <Link href="/add-edit-hero" className="add-button">Adicionar Super-Herói</Link>
        </div>
      </div>
      <table className="dashboard-table" cellSpacing="1" cellPadding="10">
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
              <td className="dashboard-buttons">
                <button
                  className="delete-button"
                  onClick={() => deleteHero(hero.id)}
                >
                  Apagar
                </button>
                <button
                  className="favorite-button"
                  onClick={() => toggleFavorite(hero.id)}
                >
                  {favorites.find((fav) => fav.id === hero.id)
                    ? "Remover Favorito"
                    : "Adicionar Favorito"}
                </button>
                <Link
                  href={`/add-edit-hero?id=${hero.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
