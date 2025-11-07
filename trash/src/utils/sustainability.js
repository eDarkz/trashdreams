// List of recyclable materials
export const recyclableMaterials = [
  'Metales (Aluminio)',
  'Plástico (PET)',
  'Cristal',
  'Aceite de Cocina',
  'Orgánica'
];

// Environmental impact factors per kg of recycled material
const impactFactors = {
  'Metales (Aluminio)': {
    co2Saved: 9.07,   // kg CO2 saved per kg
    energySaved: 14,   // kWh saved per kg
    waterSaved: 15.3,  // liters saved per kg
  },
  'Plástico (PET)': {
    co2Saved: 2.29,    // kg CO2 saved per kg
    energySaved: 5.54,  // kWh saved per kg
    waterSaved: 17.2,   // liters saved per kg
  },
  'Cristal': {
    co2Saved: 0.58,    // kg CO2 saved per kg
    energySaved: 2.5,   // kWh saved per kg
    waterSaved: 7.5,    // liters saved per kg
  },
  'Aceite de Cocina': {
    co2Saved: 2.8,     // kg CO2 saved per kg
    energySaved: 1.2,   // kWh saved per kg
    waterSaved: 4.7,    // liters saved per kg
  },
  'Orgánica': {
    co2Saved: 0.5,     // kg CO2 saved per kg
    energySaved: 0.8,   // kWh saved per kg
    waterSaved: 1.2,    // liters saved per kg
  }
};

export const calculateEnvironmentalImpact = (data) => {
  let totalImpact = {
    co2Saved: 0,
    energySaved: 0,
    waterSaved: 0,
    totalRecycled: 0,
    recyclingRate: 0,
    impactByMaterial: {}
  };

  let totalWaste = 0;
  let totalRecyclable = 0;

  data.forEach(item => {
    totalWaste += item.cantidad;
    
    if (recyclableMaterials.includes(item.tipo)) {
      totalRecyclable += item.cantidad;
      const impact = impactFactors[item.tipo];
      
      if (!totalImpact.impactByMaterial[item.tipo]) {
        totalImpact.impactByMaterial[item.tipo] = {
          amount: 0,
          co2Saved: 0,
          energySaved: 0,
          waterSaved: 0
        };
      }

      const materialImpact = totalImpact.impactByMaterial[item.tipo];
      materialImpact.amount += item.cantidad;
      materialImpact.co2Saved += item.cantidad * impact.co2Saved;
      materialImpact.energySaved += item.cantidad * impact.energySaved;
      materialImpact.waterSaved += item.cantidad * impact.waterSaved;

      totalImpact.co2Saved += item.cantidad * impact.co2Saved;
      totalImpact.energySaved += item.cantidad * impact.energySaved;
      totalImpact.waterSaved += item.cantidad * impact.waterSaved;
    }
  });

  totalImpact.totalRecycled = totalRecyclable;
  totalImpact.recyclingRate = totalWaste > 0 ? (totalRecyclable / totalWaste) * 100 : 0;

  return totalImpact;
};