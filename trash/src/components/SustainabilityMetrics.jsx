import React from 'react';
import StatsCard from './StatsCard';
import './SustainabilityMetrics.css';

const SustainabilityMetrics = ({ environmentalImpact }) => {
  const {
    co2Saved,
    energySaved,
    waterSaved,
    totalRecycled,
    recyclingRate,
    impactByMaterial
  } = environmentalImpact;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1
    }).format(num);
  };

  return (
    <div className="sustainability-metrics">
      <h3>Impacto Ambiental</h3>
      
      <div className="metrics-overview">
        <StatsCard
          title="CO₂ Evitado"
          value={`${formatNumber(co2Saved)} kg`}
          description="equivalente a plantar árboles"
          icon="tree"
        />
        <StatsCard
          title="Energía Ahorrada"
          value={`${formatNumber(energySaved)} kWh`}
          description="energía conservada"
          icon="energy"
        />
        <StatsCard
          title="Agua Ahorrada"
          value={`${formatNumber(waterSaved)} L`}
          description="agua conservada"
          icon="water"
        />
        <StatsCard
          title="Tasa de Reciclaje"
          value={`${formatNumber(recyclingRate)}%`}
          description={`${formatNumber(totalRecycled)} kg reciclados`}
          icon="recycle"
        />
      </div>

      <div className="material-breakdown">
        <h4>Desglose por Material Reciclable</h4>
        <div className="material-grid">
          {Object.entries(impactByMaterial).map(([material, impact]) => (
            <div key={material} className="material-card">
              <h5>{material}</h5>
              <div className="material-stats">
                <div className="stat">
                  <span className="label">Cantidad:</span>
                  <span className="value">{formatNumber(impact.amount)} kg</span>
                </div>
                <div className="stat">
                  <span className="label">CO₂ Evitado:</span>
                  <span className="value">{formatNumber(impact.co2Saved)} kg</span>
                </div>
                <div className="stat">
                  <span className="label">Energía Ahorrada:</span>
                  <span className="value">{formatNumber(impact.energySaved)} kWh</span>
                </div>
                <div className="stat">
                  <span className="label">Agua Ahorrada:</span>
                  <span className="value">{formatNumber(impact.waterSaved)} L</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityMetrics;