import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <p>Desarrollado por Ricardo Salazar</p>
      <p>{currentTime.toLocaleString()}</p>
    </footer>
  );
};

export default Footer;