"use client";

import React, { Suspense } from "react";
import AddEditHeroContent from "./AddEditHeroContent";

export default function AddEditHero() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AddEditHeroContent />
    </Suspense>
  );
}
