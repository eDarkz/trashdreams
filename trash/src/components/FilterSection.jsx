import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { residueTypes, sites } from '../constants';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './FilterSection.css';

const FilterSection = ({
  filterTypes,
  filterSites,
  selectedRange,
  showCalendar,
  isLoading,
  onFilterType,
  onFilterSite,
  onSelectRange,
  onToggleCalendar,
  onFetchData,
  formatSelectedRange
}) => {
  return (
    <div className="filter-section">
      <div className="filter-group">
        <h3>Filtrar por Tipo de Residuo</h3>
        <div className="button-group">
          {residueTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`display-button ${
                filterTypes.includes(type) ? 'selected' : ''
              }`}
              onClick={() => onFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`display-button button-all ${
            filterTypes.length === residueTypes.length ? 'selected-all' : ''
          } all-selected-button`}
          onClick={() => onFilterType('Todos')}
        >
          Seleccionar todos los tipos de residuos
        </button>
      </div>

      <div className="filter-group">
        <h3>Filtrar por Sitio de Procedencia</h3>
        <div className="button-group">
          {sites.map((site) => (
            <button
              key={site}
              type="button"
              className={`display-button ${
                filterSites.includes(site) ? 'selected' : ''
              }`}
              onClick={() => onFilterSite(site)}
            >
              {site}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`display-button button-all ${
            filterSites.length === sites.length ? 'selected-all' : ''
          } all-selected-button`}
          onClick={() => onFilterSite('Todos')}
        >
          Seleccionar todos los posibles origenes
        </button>
      </div>

      <div className="filter-group-inline">
        <button className="date-button" onClick={onToggleCalendar}>
          {formatSelectedRange()}
        </button>
        <button className="apply-button" onClick={onFetchData}>
          {isLoading ? 'Cargando...' : 'Consultar Datos'}
        </button>
      </div>

      {showCalendar && (
        <div className="filter-group">
          <DateRangePicker
            ranges={[selectedRange]}
            onChange={onSelectRange}
            locale={es}
            moveRangeOnFirstSelection={false}
            className="date-range-picker"
          />
        </div>
      )}
    </div>
  );
};

export default FilterSection;