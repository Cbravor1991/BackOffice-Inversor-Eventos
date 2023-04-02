import React from 'react';
import './k.scss';

const Dashboard = () => {
  return (
    <div className="app">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            Bienvenido Guido Movia
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className="buttons">
          <button className="create-event-btn">Crear evento</button>
          <button className="faq-btn">Preguntas frecuentes</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;