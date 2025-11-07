import React from 'react';
import ReactECharts from 'echarts-for-react';

const Chart = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    value,
    name,
  }));

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
        name: 'Distribución',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: chartData,
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