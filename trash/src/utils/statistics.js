import { residueTypes, sites } from '../constants';

export const calculateDailyBreakdown = (data) => {
  const breakdown = {
    byType: {},
    byArea: {},
    dates: new Set()
  };

  residueTypes.forEach(type => {
    breakdown.byType[type] = {};
  });
  sites.forEach(site => {
    breakdown.byArea[site] = {};
  });

  data.forEach(item => {
    const date = item.fecha.split(' ')[0];
    breakdown.dates.add(date);

    if (!breakdown.byType[item.tipo][date]) {
      breakdown.byType[item.tipo][date] = 0;
    }
    breakdown.byType[item.tipo][date] += item.cantidad;

    if (!breakdown.byArea[item.procedencia][date]) {
      breakdown.byArea[item.procedencia][date] = 0;
    }
    breakdown.byArea[item.procedencia][date] += item.cantidad;
  });

  const dates = Array.from(breakdown.dates).sort();
  
  const typeBreakdown = Object.entries(breakdown.byType).map(([type, values]) => ({
    name: type,
    data: dates.map(date => ({
      date,
      value: values[date] || 0
    }))
  }));

  const areaBreakdown = Object.entries(breakdown.byArea).map(([area, values]) => ({
    name: area,
    data: dates.map(date => ({
      date,
      value: values[date] || 0
    }))
  }));

  return {
    dates,
    typeBreakdown,
    areaBreakdown
  };
};

export const calculateDailyStats = (data) => {
  const dailyTotals = {};
  data.forEach(item => {
    const date = item.fecha.split(' ')[0];
    dailyTotals[date] = (dailyTotals[date] || 0) + item.cantidad;
  });

  const dailyValues = Object.entries(dailyTotals);
  if (dailyValues.length === 0) return {
    maxDailyWeight: 0,
    minDailyWeight: 0,
    averageDailyWeight: 0,
    maxDailyDate: '',
    minDailyDate: ''
  };

  const maxDaily = dailyValues.reduce((max, curr) => 
    curr[1] > max[1] ? curr : max
  );
  const minDaily = dailyValues.reduce((min, curr) => 
    curr[1] < min[1] ? curr : min
  );
  const avgDaily = dailyValues.reduce((sum, curr) => sum + curr[1], 0) / dailyValues.length;

  return {
    maxDailyWeight: maxDaily[1],
    minDailyWeight: minDaily[1],
    averageDailyWeight: avgDaily,
    maxDailyDate: maxDaily[0],
    minDailyDate: minDaily[0]
  };
};

export const calculateEnvironmentalImpact = (recyclableWeight) => {
  return {
    treesSaved: recyclableWeight * 0.017,
    waterSaved: recyclableWeight * 2.5,
    energySaved: recyclableWeight * 5.3
  };
};

export const calculateTopContributors = (data) => {
  const areaContributions = {};
  data.forEach(item => {
    areaContributions[item.procedencia] = (areaContributions[item.procedencia] || 0) + item.cantidad;
  });

  return Object.entries(areaContributions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([area, amount]) => ({ area, amount }));
};