"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { superherocontext } from "../../context/superherocontext";

export default function AddEditHeroContent() {
  const context = useContext(superherocontext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [heroData, setHeroData] = useState({
    id: 0,
    name: "",
    image: "",
    super_power: "",
  });

  useEffect(() => {
    const heroId = searchParams.get("id");
    if (heroId) {
      const existingHero = context?.superHeroes.find((hero) => hero.id === Number(heroId));
      if (existingHero) setHeroData(existingHero);
    }
  }, [context?.superHeroes, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (heroData.id) {
      context?.editHero(heroData);
    } else {
      context?.addHero({
        id: heroData.id,
        name: heroData.name,
        image: heroData.image,
        super_power: heroData.super_power,
      });
    }
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulário similar ao anterior */}
    </form>
  );
}
