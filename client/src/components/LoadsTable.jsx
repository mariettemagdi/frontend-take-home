import React from 'react'

export default function LoadsTable({loads,statuses,carriers}) {

  //status label
  const getStatusLabel = (statusId) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.label : statusId;
  };
  //status styling
  const styleStatus = (statusLabel) => {
    switch (statusLabel) {
      case "Pending":
        return "badge badge-warning"; // Yellow
      case "In Transit":
        return "badge badge-info"; // Blue
      case "Delivered":
        return "badge badge-success"; // Green
      case "Cancelled":
        return "badge badge-error"; // Red
      default:
        return "badge badge-ghost"; // Gray fallback
    }
  }
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
      <tr className='bg-blue-950 text-white'>
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
          <td><span className={styleStatus(getStatusLabel(load.status))}>{getStatusLabel(load.status)}</span></td>
          <td>{load.date}</td>
          <td>{load.weight}</td>
          <td><span
          className="badge badge-sm"
          style={{ backgroundColor: "#e05c13", color: "#ffffff", border: "none" }}
          >{getCarrierLabel(load.carrier)}</span></td>
          <td>{formatCurrency(load.price)}</td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
    </>
  
  )
}
