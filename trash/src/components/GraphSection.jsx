import React from 'react';
import Chart from '../Chart';
import './GraphSection.css';

const GraphSection = ({ typeSummary, siteSummary }) => {
  return (
    <div className="graph-section">
      <div className="graph-container">
        <h3>Gráfica por tipo de residuo</h3>
        <Chart data={typeSummary} />
      </div>
      
      <hr className="styled-line" />
      
      <div className="graph-container">
        <h3>Gráfica por lugar de origen</h3>
        <Chart data={siteSummary} />
      </div>
    </div>
  );
};

export default GraphSection;