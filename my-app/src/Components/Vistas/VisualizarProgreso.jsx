import React, { useState } from 'react';
import './sidebar.css'; // Estilos del sidebar
import Sidebar from '../sidebar'; 

function ViewProgress() {
  const allOrders = [
    { id: 1, name: 'Juan Pérez', orderNumber: 'ORD-001', progress: 'Aceptado' },
    { id: 2, name: 'María García', orderNumber: 'ORD-002', progress: 'Localizado' },
    { id: 3, name: 'Carlos López', orderNumber: 'ORD-003', progress: 'En Progreso' },
    { id: 4, name: 'Ana Martínez', orderNumber: 'ORD-004', progress: 'Finalizado' },
    { id: 5, name: 'Pedro Sánchez', orderNumber: 'ORD-005', progress: 'Aceptado' },
    { id: 6, name: 'Lucía Fernández', orderNumber: 'ORD-006', progress: 'Localizado' },
    { id: 7, name: 'Sofía Ramírez', orderNumber: 'ORD-007', progress: 'En Progreso' },
    { id: 8, name: 'Diego Torres', orderNumber: 'ORD-008', progress: 'Finalizado' },
    // Más órdenes...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(allOrders.length / itemsPerPage);

  const paginatedOrders = allOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const steps = ['Aceptado', 'Localizado', 'En Progreso', 'Finalizado'];

  return (
   
    <div className="container">
          <Sidebar /> {/* Usando el componente Sidebar */}
          <div className=""></div>

      <div className="main-content">
        <h2>Órdenes Activas</h2>
        <div className="orders-container">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>{order.name}</h3>
                <span className="order-number">{order.orderNumber}</span>
              </div>
              <div className="progress-container">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`step ${steps.indexOf(order.progress) >= index ? 'active' : ''}`}
                  >
                    <div className="circle">{index + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className={`progress-status ${order.progress.toLowerCase().replace(/ /g, '-')}`}>
                  {order.progress}
                </span>
                <button className="details-btn">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProgress;
