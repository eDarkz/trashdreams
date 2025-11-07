import React from 'react';
import './DailyBreakdown.css';

const DailyBreakdown = ({ typeBreakdown, areaBreakdown, dates }) => {
  return (
    <div className="daily-breakdown">
      <div className="breakdown-section">
        <h4>Desglose Diario por Tipo de Residuo</h4>
        <div className="breakdown-table-container">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Tipo de Residuo</th>
                {dates.map(date => (
                  <th key={date}>{new Date(date).toLocaleDateString('es-ES', { 
                    day: '2-digit',
                    month: '2-digit'
                  })}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {typeBreakdown.map(({ name, data }) => (
                <tr key={name}>
                  <td className="breakdown-name">{name}</td>
                  {data.map(({ date, value }) => (
                    <td key={date} className="breakdown-value">
                      {value.toFixed(1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="breakdown-section">
        <h4>Desglose Diario por Área</h4>
        <div className="breakdown-table-container">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Área</th>
                {dates.map(date => (
                  <th key={date}>{new Date(date).toLocaleDateString('es-ES', { 
                    day: '2-digit',
                    month: '2-digit'
                  })}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {areaBreakdown.map(({ name, data }) => (
                <tr key={name}>
                  <td className="breakdown-name">{name}</td>
                  {data.map(({ date, value }) => (
                    <td key={date} className="breakdown-value">
                      {value.toFixed(1)}
                    </td>
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