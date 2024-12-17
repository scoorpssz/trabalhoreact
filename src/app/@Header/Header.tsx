"use client"
import React from 'react';
import Link from 'next/link'; 
import "./header.css";


interface HeaderProps {
  my_name: string;
  project_name: string;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='header'>
      <h1>League of Heroes</h1>
      <h5>Desenvolvido por José Cláudio</h5>
      <nav>
        <Link href="/" className='nav'>Home</Link>
        <Link href="/dashboard" className='nav'>Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;