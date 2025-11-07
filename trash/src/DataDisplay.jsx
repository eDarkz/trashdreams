import React, { useState, useEffect } from 'react';
import ip_server  from './configIP';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { residueTypes, sites } from './constants';
import MyGrid from './Cgrid';
import Chart from './Chart';
import SustainabilityMetrics from './components/SustainabilityMetrics';
import { calculateEnvironmentalImpact } from './utils/sustainability';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DataDisplay.css';

const DataDisplay = () => {
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterSites, setFilterSites] = useState([]);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typeSummary, setTypeSummary] = useState({});
  const [siteSummary, setSiteSummary] = useState({});
  const [recordCount, setRecordCount] = useState(0);
  const [environmentalImpact, setEnvironmentalImpact] = useState({
    co2Saved: 0,
    energySaved: 0,
    waterSaved: 0,
    totalRecycled: 0,
    recyclingRate: 0,
    impactByMaterial: {}
  });

  const toggleFilterType = (type) => {
    if (type === 'Todos') {
      setFilterTypes(prev => 
        prev.length === residueTypes.length ? [] : [...residueTypes]
      );
    } else {
      setFilterTypes(prev =>
        prev.includes(type) 
          ? prev.filter(t => t !== type)
          : [...prev, type]
      );
    }
  };

  const toggleFilterSite = (site) => {
    if (site === 'Todos') {
      setFilterSites(prev => 
        prev.length === sites.length ? [] : [...sites]
      );
    } else {
      setFilterSites(prev =>
        prev.includes(site)
          ? prev.filter(s => s !== site)
          : [...prev, site]
      );
    }
  };

  const handleSelectRange = (ranges) => {
    const { selection } = ranges;
    setSelectedRange(selection);
    
    // Solo cerrar el calendario si ambas fechas están seleccionadas y son diferentes
    if (selection.startDate && 
        selection.endDate && 
        selection.startDate.getTime() !== selection.endDate.getTime()) {
      // Añadir un pequeño retraso para que el usuario pueda ver la selección completa
      setTimeout(() => setShowCalendar(false), 300);
    }
  };

  const formatSelectedRange = () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      return 'Seleccione un rango de fechas';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const start = selectedRange.startDate.toLocaleDateString('es-ES', options);
    const end = selectedRange.endDate.toLocaleDateString('es-ES', options);
    return `${start} - ${end}`;
  };

  const fetchData = async () => {
    if (!selectedRange.startDate || !selectedRange.endDate || 
        filterTypes.length === 0 || filterSites.length === 0) {
      alert('Debe seleccionar un rango de fechas, al menos un tipo de residuo y un origen.');
      return;
    }

    setIsLoading(true);
    const startDate = selectedRange.startDate.toISOString().split('T')[0];
    const endDate = selectedRange.endDate.toISOString().split('T')[0];

    try {
      const response = await fetch(
        `https://${ip_server}:3001/getDataByDate?startDate=${startDate}&endDate=${endDate}`
      );
      if (response.ok) {
        const result = await response.json();
        const filtered = result.filter(item =>
          filterTypes.includes(item.tipo) && filterSites.includes(item.procedencia)
        );
        setFilteredData(filtered);
        setRecordCount(filtered.length);
        calculateSummaries(filtered);
      } else {
        alert('Error al obtener los datos de la base de datos');
      }cc
    } catch (error) {
      alert('Error al conectarse con la API');
      console.error('Error al obtener los datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSummaries = (data) => {
    const typeSum = {};
    const siteSum = {};

    data.forEach((item) => {
      typeSum[item.tipo] = (typeSum[item.tipo] || 0) + item.cantidad;
      siteSum[item.procedencia] = (siteSum[item.procedencia] || 0) + item.cantidad;
    });

    setTypeSummary(typeSum);
    setSiteSummary(siteSum);
  };

  useEffect(() => {
    const impact = calculateEnvironmentalImpact(filteredData);
    setEnvironmentalImpact(impact);
  }, [filteredData]);

  return (
    <div className="data-display">
      <div className="filter-section">
        <div className="filter-group">
          <h3>Filtrar por Tipo de Residuo</h3>
          <div className="button-container">
            {residueTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`display-button ${filterTypes.includes(type) ? 'selected' : ''}`}
                onClick={() => toggleFilterType(type)}
              >
                {type}
              </button>
            ))}
            <button
              type="button"
              className={`display-button all-selected-button ${
                filterTypes.length === residueTypes.length ? 'selected' : ''
              }`}
              onClick={() => toggleFilterType('Todos')}
            >
              Seleccionar todos los tipos de residuos
            </button>
          </div>
        </div>

        <div className="filter-group">
          <h3>Filtrar por Sitio de Procedencia</h3>
          <div className="button-container">
            {sites.map((site) => (
              <button
                key={site}
                type="button"
                className={`display-button ${filterSites.includes(site) ? 'selected' : ''}`}
                onClick={() => toggleFilterSite(site)}
              >
                {site}
              </button>
            ))}
            <button
              type="button"
              className={`display-button all-selected-button ${
                filterSites.length === sites.length ? 'selected' : ''
              }`}
              onClick={() => toggleFilterSite('Todos')}
            >
              Seleccionar todos los posibles orígenes
            </button>
          </div>
        </div>

        <div className="filter-group-inline">
          <button
            className="date-button"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {formatSelectedRange()}
          </button>
          <button 
            className="apply-button"
            onClick={fetchData}
          >
            {isLoading ? 'Cargando...' : 'Consultar Datos'}
          </button>
        </div>

        {showCalendar && (
          <div className="date-picker-container">
            <DateRangePicker
              ranges={[selectedRange]}
              onChange={handleSelectRange}
              locale={es}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="backwards"
              showSelectionPreview={true}
              showPreview={true}
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <p>Cargando datos, por favor espere...</p>
      ) : filteredData.length > 0 ? (
        <>
          <SustainabilityMetrics environmentalImpact={environmentalImpact} />

          <div className="summary-section">
            <h3>Resumen por Tipo de Residuo</h3>
            <div className="summary-cards">
              {Object.entries(typeSummary).map(([tipo, cantidad]) => (
                <div key={tipo} className="summary-card">
                  <h4>{tipo}</h4>
                  <p>{cantidad.toFixed(2)} kg</p>
                </div>
              ))}
            </div>

            <h3>Resumen por Sitio de Procedencia</h3>
            <div className="summary-cards">
              {Object.entries(siteSummary).map(([procedencia, cantidad]) => (
                <div key={procedencia} className="summary-card">
                  <h4>{procedencia}</h4>
                  <p>{cantidad.toFixed(2)} kg</p>
                </div>
              ))}
            </div>

            <p className="record-count">
              Información obtenida de {recordCount} registros
            </p>
          </div>

          <div className="chart-section">
            <h3>Gráfica por tipo de residuo</h3>
            <Chart data={typeSummary} />
            <h3>Gráfica por lugar de origen</h3>
            <Chart data={siteSummary} />
          </div>

          <div className="table-container">
            <MyGrid respuesta={filteredData} />
          </div>
        </>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default DataDisplay;