import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function HospitalsHomePage() {
    const navigation  = useNavigate()

    const [longtitude,setLongitude] = useState(0);
    const [latitude,setLatitude] = useState(0);
    const [dataOfHospitals,setDataOfHospitals] = useState([]) 

useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            })
        }
        else{
            console.log('error to find the user location')
        }
},[])


useEffect(()=>{
        const HospotalFetch = async () => {
            try{
                //let hospitalData = await axios.get('https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:77.4472,15.77595,10000&bias=proximity:77.47595,15.77595&limit=20&apiKey=1648dade364440e0bbf668fce898a5ab');
                let hospitalData = await axios.get(`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longtitude},${latitude},10000&bias=proximity:${longtitude},${latitude}&limit=20&apiKey=1648dade364440e0bbf668fce898a5ab`);

                hospitalData = hospitalData.data.features;
                setDataOfHospitals(hospitalData)               
            }
            catch(error){
                console.log('Error is ',error)
            }
        }
        HospotalFetch();
},[latitude,longtitude])

// useEffect(()=>{
//         const isScreen = () => {
//             setMobileView(window.innerWidth <= 600);
//         };

//         isScreen()
//         window.addEventListener('resize',isScreen())
//         return()=>{
//             window.removeEventListener('resize',isScreen())
//         }
// },[]);


  return (
    <div>
        <h1 style={{textAlign:'center',margin:'1rem 0rem',}}>Hospotals Near You</h1>
        <div className='AllHospitals'>
        {
            dataOfHospitals.map((EachHospital, index) => {
                return(
                    <div className='forCenter' key= {index} onClick={() => navigation('/singlehospital',{state : EachHospital})}>
                        <div className='EachHospital'>
                            <h2>{EachHospital.properties.name}</h2><br />
                            <p>{EachHospital.properties.address_line2}</p>
                            <p style={{marginTop:'0.5rem'}}>Distance : {EachHospital.properties.distance} Meters</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
    
    </div>
  )
}

export default HospitalsHomePage;