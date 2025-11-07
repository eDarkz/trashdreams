import React, { useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import './Gridstyle.css';

const MyGrid = ({ respuesta }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!respuesta || !Array.isArray(respuesta)) {
      return;
    }

    const grid = new Grid({
      columns: [
        'Fecha',
        {
          name: 'Cantidad',
          sort: {
            compare: (a, b) => {
              const numA = parseFloat(a);
              const numB = parseFloat(b);
              return numA - numB;
            },
          },
        },
        'Tipo',
        'Procedencia',
      ],
      sort: true,
      width: 995,
      search: {
        enabled: true,
      },
      pagination: {
        enabled: true,
        limit: 10,
        summary: true,
      },
      language: {
        search: {
          placeholder: 'Introduce Búsqueda...',
        },
        pagination: {
          previous: 'Anterior',
          next: 'Siguiente',
          showing: 'Mostrando',
          results: () => 'Resultados',
        },
      },
      data: respuesta.map(item => [
        item.fecha,
        item.cantidad.toFixed(2),
        item.tipo,
        item.procedencia
      ]),
    });

    grid.render(gridRef.current);

    return () => {
      grid.destroy();
    };
  }, [respuesta]);

  return <div ref={gridRef}></div>;
};

export default MyGrid;