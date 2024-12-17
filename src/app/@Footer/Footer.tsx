import React from 'react';
import './footer.css';

interface FooterProps {
  my_name: string;
  project_name: string;
}

const Footer: React.FC<FooterProps> = ({ my_name, project_name }) => {
  return (
    <footer className='footer'>
      <p>© 2024 - Criado por José Claudio.</p>
    </footer>
  );
};

export default Footer;