import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from '../pages/MapPage'; // Página donde estará el mapa
import ReactModal from 'react-modal';
import Login from '../components/auth/Login';
import * as L from 'leaflet';
import '../routes/modal.css';

// Ensure Modal.setAppElement is called correctly
ReactModal.setAppElement('#root');

const AppRouter: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<L.LatLng | null>(null);
    const [locationId, setLocationId] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>('');
    
    const handleSaveLocation = () => {
        if (currentPosition) {
            console.log('Cedula del Cliente:', locationId);
            console.log('Telefono:', phoneNumber);
            console.log('Nombre del Cliente:', customerName);
            console.log('Coordenadas:', currentPosition);
            setModalIsOpen(false);
        }
    };

    return (
        <>
            <Routes>
            <Route path="/" element={<MapPage setCurrentPosition={setCurrentPosition} />} />
            <Route path="/login" element={<Login />} />
                <Route path="/map" element={<MapPage setCurrentPosition={setCurrentPosition} />} />
            </Routes>

            <button
                onClick={() => setModalIsOpen(true)}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    zIndex: 1000,
                    color: 'white',
                    backgroundColor: 'green',
                    borderRadius: '10px',
                    padding: '10px 15px',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Registrar Visita
            </button>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Save Location"
                className="ModalContent"
                overlayClassName="Overlay"
            >
                <button className="ModalClose" onClick={() => setModalIsOpen(false)}>
                    X
                </button>
                <div className="modal-header">
                    <img className='logo-paloma' src='paloma.png' alt="logo" />
                    <h2>Registrar Visita</h2>
                </div>
                <form>
                    <label>
                        Nombre del Cliente:
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Cedula del Cliente:
                        <input
                            type="text"
                            value={locationId}
                            onChange={(e) => setLocationId(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Telefono:
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleSaveLocation}>
                        Guardar
                    </button>
                    <button type="button" onClick={() => setModalIsOpen(false)}>
                        Cancelar
                    </button>
                </form>
            </ReactModal>
        </>
    );
};

export default AppRouter;
