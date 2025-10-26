import { useState,useEffect} from 'react'
import LoadsTable from './components/LoadsTable.jsx';
import Filters from './components/Filters.jsx';
import Pagination from './components/Pagination.jsx';

function App() {
const API_BASE = 'http://localhost:3001/api';
const [Loads,setLoads]=useState([]);
const [loading,setLoading]=useState(true);
const [statuses,setStatuses]=useState([]);
const [carriers,setCarriers]=useState([]);
const [error,setError]=useState(null);
const [searchString,setSearchString]=useState("");
const [statusFilter,setStatusFilter]=useState("");
const [carrierFilter,setCarrierFilter]=useState("");
const [currentPage,setCurrentPage]=useState(1);
const pageSize=10;

useEffect(() => {
  const fetchData=async()=>{
    setLoading(true);
    setError(null);
    try{
      const loadResponse=await fetch(`${API_BASE}/loads?limit=100`);
      const statusResponse= await fetch(`${API_BASE}/statuses`);
      const carrierResponse= await fetch(`${API_BASE}/carriers`);
      if(!loadResponse.ok || !statusResponse.ok || !carrierResponse.ok){
        throw new Error('Failed to fetch data');
      }
        const loadData= await loadResponse.json();
        const statusData= await statusResponse.json();
        const carrierData= await carrierResponse.json();
        // console.log("statusData "+statusData);
        // console.log("carrierData "+carrierData);
        setLoads(loadData.data);
        setStatuses(statusData);
        setCarriers(carrierData);
        setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };
  fetchData();
}, []);

//handle search change
const handleSearch=(e)=>{
  setSearchString(e.target.value);
  //setCurrentPage(1);
}
//handle filter change
const handleFilterChange=(filterType,value)=>{
//  console.log("value "+value , 
//   "type of value" + typeof value
//  );
  if(filterType==='status'){
    setStatusFilter(+value);
  }
  else if(filterType==='carrier'){
    setCarrierFilter(+value);
  }
};

let filteredLoads=Loads;
if(searchString){
  filteredLoads=filteredLoads.filter(load=>
    load.id.toLowerCase().includes(searchString.toLowerCase()) ||
    load.origin.toLowerCase().includes(searchString.toLowerCase()) ||
    load.destination.toLowerCase().includes(searchString.toLowerCase())
  )
}
if(statusFilter){
  filteredLoads=filteredLoads.filter(load=>load.status ==statusFilter);
}
if(carrierFilter){
  filteredLoads=filteredLoads.filter(load=>load.carrier ==carrierFilter);
}

//pagination
const totalPages=Math.ceil(filteredLoads.length/pageSize);
const startIndex=(currentPage -1)*pageSize;
const endIndex=startIndex + pageSize;
filteredLoads=filteredLoads.slice(startIndex,endIndex);

const handlePageChange=(page)=>{
  if(page>=1 && page <=totalPages){
    setCurrentPage(page);
  }
};



  return (
    <>
      <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shipping Loads</h1>
        <Filters 
          statuses={statuses}
          carriers={carriers}
          searchString={searchString}
          onSearchChange={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
          <LoadsTable loads={filteredLoads} statuses={statuses} carriers={carriers}/>
          {totalPages>1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>}
          </div>
          </div>
            
      </div>
      </div>
    

    </>
  )
}

export default App
