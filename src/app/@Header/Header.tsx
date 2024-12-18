"use client"
import React from 'react';
import Link from 'next/link'; 
import "./header.css";


const Header = (props: { project_name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; my_name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
  return (
    <header className='header'>
       <h1>{props.project_name}</h1>
      <h5>Desenvolvido por {props.my_name}</h5>
      <nav>
        <Link href="/" className='nav'>Home</Link>
        <Link href="/dashboard" className='nav'>Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;