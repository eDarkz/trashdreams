import React from 'react';
import './SummarySection.css';

const SummarySection = ({ typeSummary, siteSummary, recordCount }) => {
  return (
    <div className="summary-section">
      <div className="h-resume">
        <h3>Resumen por Tipo de Residuo</h3>
      </div>
      <div className="summary-cards">
        {Object.entries(typeSummary).map(([tipo, cantidad]) => (
          <div key={tipo} className="summary-card">
            <h4>{tipo}</h4>
            <p>{cantidad.toFixed(2)} kg</p>
          </div>
        ))}
      </div>
      
      <div className="h-resume">
        <h3>Resumen por Sitio de Procedencia</h3>
      </div>
      <div className="summary-cards">
        {Object.entries(siteSummary).map(([procedencia, cantidad]) => (
          <div key={procedencia} className="summary-card">
            <h4>{procedencia}</h4>
            <p>{cantidad.toFixed(2)} kg</p>
          </div>
        ))}
      </div>
      
      <p className="record-count">
        Información obtenida de {recordCount} registros
      </p>
    </div>
  );
};

export default SummarySection;