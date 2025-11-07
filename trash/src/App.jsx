import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import InputForm from './InputForm';
import DataDisplay from './DataDisplay';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [wasteData, setWasteData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const tabRef = useRef(null);

  const addWasteData = (newData) => {
    setWasteData([...wasteData, { ...newData, id: wasteData.length + 1 }]);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (tabRef.current && !tabRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div
          className={`top-tab ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          ref={tabRef}
        >
          <span className="tab-label">Seleccionar</span>
          {menuOpen && (
            <nav className="tab-nav">
              <Link to="/input">Registrar Residuo</Link>
              <Link to="/data">Mostrar Datos</Link>
            </nav>
          )}
        </div>
        <h1 className="top-h1">
          Sistema de Registro de Residuos - Dreams Los Cabos
        </h1>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Navigate to="/input" replace />} />
            <Route path="/input" element={<InputForm onSubmit={addWasteData} />} />
            <Route path="/data" element={<DataDisplay data={wasteData} />} />
            <Route path="*" element={<Navigate to="/input" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;