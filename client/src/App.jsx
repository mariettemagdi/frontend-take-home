import { useState,useEffect} from 'react'
import LoadsTable from './components/LoadsTable.jsx';
import Filters from './components/Filters.jsx';

function App() {
const API_BASE = 'http://localhost:3001/api';
const [Loads,setLoads]=useState([]);
const [loading,setLoading]=useState(true);
const [statuses,setStatuses]=useState([]);
const [carriers,setCarriers]=useState([]);
const [error,setError]=useState(null);
const [searchString,setSearchString]=useState("");

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
  setCurrentPage(1);
}
let filteredLoads=Loads;
if(searchString){
  filteredLoads=filteredLoads.filter(load=>
    load.id.toLowerCase().includes(searchString.toLowerCase()) ||
    load.origin.toLowerCase().includes(searchString.toLowerCase()) ||
    load.destination.toLowerCase().includes(searchString.toLowerCase())
  )
}
//handle filter change
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
          // onFilterChange={handleFilterChange}
        />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
          <LoadsTable loads={filteredLoads} statuses={statuses} carriers={carriers}/>
          </div>
          </div>
      </div>
      </div>
    

    </>
  )
}

export default App
