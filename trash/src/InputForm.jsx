import React, { useState } from 'react';
import Notification from './Notification';
import ip_server  from './configIP';
//import io from 'socket.io-client'; // Importar el cliente de Socket.IO
import { residueTypes, sites } from './constants'; // Importa las constantes
import './InputForm.css';

//const socket = io(`https://${ip_server}:3001`);
const InputForm = ({ onSubmit }) => {
  const [residueType, setResidueType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [site, setSite] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isSaving, setIsSaving] = useState(false); // Nuevo estado para indicar si se está guardando

  const handleNumberClick = (value) => {
    setQuantity((prev) => (prev + value).slice(0, 5));
  };

  const handleClearClick = () => {
    setQuantity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (residueType && quantity && site) {
      setIsSaving(true); // Indicar que se está guardando
      setNotificationMessage(
        'Se está guardando en la base de datos el registro...'
      );
      setNotificationType('info');
      setShowNotification(true);

      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(now.getDate()).padStart(2, '0')} ${String(
        now.getHours()
      ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
        now.getSeconds()
      ).padStart(2, '0')}`;

      const data = {
        residueType,
        quantity: parseFloat(quantity),
        site,
        date, // Fecha con hora local del sistema
      };
    //  socket.emit('open');
      try {
    
        const response = await fetch(`http://${ip_server}:3001/saveData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setNotificationMessage(
            'Datos guardados exitosamente en la base de datos'
          );

          setNotificationType('success');
          onSubmit(data); // Añadir los datos al estado local
          setResidueType('');
          setQuantity('');
          setSite('');

          setTimeout(() => setIsSaving(false), 2000); // Regresar al estado normal después de 3 segundos
        } else {
          setNotificationMessage(
            'Error al guardar los datos en la base de datos'
          );
          setNotificationType('error');

          setTimeout(() => setIsSaving(false), 2000); // Regresar al estado normal después de 3 segundos
        }
      } catch (error) {
        setNotificationMessage('Error al conectarse con la API');
        setNotificationType('error');
        console.error('Error al guardar los datos:', error);

        setTimeout(() => setIsSaving(false), 2000); // Regresar al estado normal después de 3 segundos
      }

      setTimeout(() => setShowNotification(false), 2000); // Ocultar la notificación después de 3 segundos
    } else {
      setNotificationMessage('Todos los campos son obligatorios');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setIsSaving(false); 
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <div className="horizontal-layout">
          <div className="input-section">
            <h3>Tipo de Residuo</h3>
            <div className="button-group">
              {residueTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`button ${
                    residueType === type ? 'selected' : ''
                  } `}
                  onClick={() => setResidueType(type)}
                  disabled={isSaving} // Desactivar botones durante el guardado
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="input-section">
            <h3>Cantidad (kg)</h3>
            <div className="numeric-pad">
              <input
                type="text"
                value={quantity}
                readOnly
                className="numeric-input"
              />
              <div className="numeric-buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className="num-button"
                    onClick={() =>
                      val === 'C'
                        ? handleClearClick()
                        : handleNumberClick(val.toString())
                    }
                    disabled={isSaving} // Desactivar botones durante el guardado
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="input-section">
            <h3>Sitio de Procedencia</h3>
            <div className="button-group">
              {sites.map((currentSite) => (
                <button
                  key={currentSite}
                  type="button"
                  className={`button ${site === currentSite ? 'selected' : ''}`}
                  onClick={() => setSite(currentSite)}
                  disabled={isSaving} // Desactivar botones durante el guardado
                >
                  {currentSite}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!residueType || !quantity || !site || isSaving}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Registrar Residuo</span>
        </button>
      </form>

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default InputForm;
