import React from 'react'

export default function Pagination({currentPage,totalPages,onPageChange}) {
    const pages=[];
    for(let i=1;i<=totalPages;i++){
        pages.push(i);
    }
  return (
    <div className='flex justify-between items-center p-4 '>
        <div className='text-sm text-base-content/60'>
            Page {currentPage} of {totalPages}
        </div>
        <div className='join'>
            <button className='join-item btn btn-sm' onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}>
                « Previous
            </button>
            {pages.map(page=>(
                <button
                    key={page}
                    className={`join-item btn btn-sm ${page===currentPage ? 'btn-active':''}`}
                    onClick={()=>onPageChange(page)}
                >{page}</button>))}
            <button className='join-item btn btn-sm' onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===totalPages}>
                Next »
            </button>

        </div>


    </div>
  )
}
