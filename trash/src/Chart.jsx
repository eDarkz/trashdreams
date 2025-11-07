import React from 'react';
import ReactECharts from 'echarts-for-react';

const Chart = ({ data }) => {
  let datos = [];
  Object.entries(data).forEach(([identificador, cantidad]) => {
    datos.push({
      value: cantidad,
      name: identificador,
    });
  });

  console.log(datos);
  const option = {
    legend: {
      top: 'bottom',
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        restore: { show: false },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Tipo de Residuo',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: datos,
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: '900px', width: '100%' }} />
  );
};

export default Chart;
