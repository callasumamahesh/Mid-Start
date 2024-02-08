import './App.css'
import {Route,Routes} from 'react-router-dom'
import HospitalsHomePage from './Components/HospitalsHomePage'
import SingleHospitalPage from './Components/SingleHospitalPage'
import mainIcon from '../src/assets/icon.png'

function App() {
  return(
  <>
  <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'4rem'}}>
    <img src={mainIcon} alt="" style={{marginTop:'1rem',marginRight:'1rem'}}/>
    <h1 style={{textAlign:'center',marginTop:'1rem'}}>Med Start</h1>
  </div>
      <Routes>
        <Route path="/" element={<HospitalsHomePage />}></Route>
        <Route path="/singlehospital" element={<SingleHospitalPage />}></Route>
      </Routes>
  </>
  )
};

export default App
