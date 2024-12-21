"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { superherocontext } from "../../context/superherocontext";
import './addedithero.css';  

export default function AddEditHeroContent() {
  const context = useContext(superherocontext);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!context) {
    return <div>Context not found</div>;
  }

  const { superHeroes, addHero, editHero } = context;

  const [heroData, setHeroData] = useState({
    id: 0,
    name: "",
    image: "",
    super_power: "",
  });

  
  useEffect(() => {
    const heroId = searchParams.get("id");
    if (heroId) {
      const existingHero = superHeroes.find((hero) => hero.id === Number(heroId));
      if (existingHero) setHeroData(existingHero);
    }
  }, [superHeroes, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (heroData.id) {
     
      editHero(heroData); 
    } else {
     
      addHero({
        name: heroData.name,
        image: heroData.image,
        super_power: heroData.super_power,
      }); 
    }
    router.push("/dashboard");
  };

  return (
    <div className="add-edit-hero-container">
      <h1>{heroData.id ? "Editar Super-Herói" : "Adicionar Super-Herói"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={heroData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Imagem (URL)"
          value={heroData.image}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="super_power"
          placeholder="Superpoder"
          value={heroData.super_power}
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          <button type="submit">Gravar</button>
          <button type="button" onClick={() => router.push("/dashboard")}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}