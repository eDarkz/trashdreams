import React from 'react';
import './DailyBreakdown.css';

const DailyBreakdown = ({ typeBreakdown, areaBreakdown, dates }) => {
  return (
    <div className="daily-breakdown">
      <h3>Desglose Diario</h3>
      
      <div className="breakdown-section">
        <h4>Por Tipo de Residuo</h4>
        <div className="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                {dates.map(date => (
                  <th key={date}>{new Date(date).toLocaleDateString('es-ES')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {typeBreakdown.map(({ name, data }) => (
                <tr key={name}>
                  <td>{name}</td>
                  {data.map(({ date, value }) => (
                    <td key={date}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="breakdown-section">
        <h4>Por Área</h4>
        <div className="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>Área</th>
                {dates.map(date => (
                  <th key={date}>{new Date(date).toLocaleDateString('es-ES')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {areaBreakdown.map(({ name, data }) => (
                <tr key={name}>
                  <td>{name}</td>
                  {data.map(({ date, value }) => (
                    <td key={date}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyBreakdown;