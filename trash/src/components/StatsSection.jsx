import React from 'react';
import StatsCard from './StatsCard';
import DailyBreakdown from './DailyBreakdown';

const StatsSection = ({ statistics }) => {
  return (
    <div className="statistics-overview">
      <div className="daily-stats">
        <h3>Estadísticas Diarias</h3>
        <div className="stats-grid">
          <StatsCard
            title="Máximo Diario"
            value={`${statistics.maxDailyWeight.toFixed(1)} kg`}
            description={`el ${statistics.maxDailyDate}`}
            icon="arrow-up"
          />
          <StatsCard
            title="Mínimo Diario"
            value={`${statistics.minDailyWeight.toFixed(1)} kg`}
            description={`el ${statistics.minDailyDate}`}
            icon="arrow-down"
          />
          <StatsCard
            title="Promedio Diario"
            value={`${statistics.averageDailyWeight.toFixed(1)} kg`}
            description="promedio por día"
            icon="chart-line"
          />
        </div>

        {statistics.dailyBreakdown && (
          <DailyBreakdown 
            typeBreakdown={statistics.dailyBreakdown.typeBreakdown}
            areaBreakdown={statistics.dailyBreakdown.areaBreakdown}
            dates={statistics.dailyBreakdown.dates}
          />
        )}
      </div>
    </div>
  );
};

export default StatsSection;