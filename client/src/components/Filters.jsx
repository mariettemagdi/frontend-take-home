import React from 'react'

export default function Filters({statuses,carriers,searchString,onSearchChange,onFilterChange}) {
  return (
    <div className='card bg-base-100 shadow-xl mb-6'>
        <div className='card-body'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>Search</span>
                    </label>
                    <input type="text" placeholder="Load ID, Origin, or Destination" className='input input-bordered w-full' value={searchString} onChange={onSearchChange} />  
                </div>
                <div className="form-control">
                     <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select className="select select-bordered w-full" onChange={(e)=>onFilterChange('status',e.target.value)} >
                      <option value="">All</option>
                      {statuses.map(status=>(
                        <option key={status.id} value={status.id}>{status.label}</option>
                      ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                      <span className="label-text">Carrier</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => onFilterChange('carrier', e.target.value)}>
                     <option value="">All</option>
                     {carriers.map(carrier=>(<option key={carrier.id} value={carrier.id}>{carrier.label}</option>))}
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}
