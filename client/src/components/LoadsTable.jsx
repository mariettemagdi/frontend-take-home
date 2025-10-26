import React from 'react'

export default function LoadsTable({loads,statuses,carriers}) {

  //status label
  const getStatusLabel = (statusId) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.label : statusId;
  };
  //carrier label
  const getCarrierLabel = (carrierId) => {
    const carrier = carriers.find(c => c.id === carrierId);
    return carrier ? carrier.label : carrierId;
  }
  //currency 
  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP'
  }).format(amount);
};

  return (
    <>
  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Load ID</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Status</th>
        <th>Date</th>
        <th>Weight</th>
        <th>Carrier</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {loads.map(load => (
        <tr key={load.id}>
          <th>{load.id}</th>
          <td>{load.origin}</td>
          <td>{load.destination}</td>
          <td><span className='badge badge-primary badge-sm'>{getStatusLabel(load.status)}</span></td>
          <td>{load.date}</td>
          <td>{load.weight}</td>
          <td><span className='badge badge-primary badge-sm'>{getCarrierLabel(load.carrier)}</span></td>
          <td>{formatCurrency(load.price)}</td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
    </>
  
  )
}
