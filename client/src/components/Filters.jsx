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
            </div>
        </div>
    </div>
  )
}
