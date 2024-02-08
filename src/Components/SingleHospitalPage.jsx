import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import '../App.css'
import axios from 'axios';

function SingleHospitalPage() {
  const [hospitalLatitude,setHospitalLatitude] = useState(0);
  const [hospitalLongitude,setHospitalLongitude] = useState(0);
  const [allDirections,setAllDirections] = useState([])
  const location = useLocation();
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const {state : EachHospital} = location;

useEffect(()=>{
  let HospitalCoordinates = EachHospital.geometry.coordinates;
  setHospitalLongitude(HospitalCoordinates[0])
  setHospitalLatitude(HospitalCoordinates[1])
},[EachHospital])



useEffect(()=>{
  if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }
},[]);

useEffect(() => {
        let DataDirection = async () => {
          try{
            let directions = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${hospitalLatitude},${hospitalLongitude}|${latitude},${longitude}&mode=drive&apiKey=1648dade364440e0bbf668fce898a5ab`)
            .then(directions => directions.json())
            let gettingDirections = directions.features
            gettingDirections.map((item)=>{
              setAllDirections(item.properties.legs[0].steps)
            })
          }
          catch(error){
          }
        }
        DataDirection();
  },[latitude,longitude])


  return (
    <div className='total'>
        <div className='LeftSide'>
          {
             EachHospital && (
              <>
                <h2 style={{paddingBottom:'15px',}}>{EachHospital.properties.name}</h2>
                <p>{EachHospital.properties.address_line2}</p>
                <p style={{paddingTop:'15px'}}>Distance : {EachHospital.properties.distance} Meters</p>
              </>
             )
          }
        </div>
        <div className='RightSide'>
          <h2>Directions to reach Your Destination</h2>
            {
              allDirections.map((item, index) => {
                return(
                  <div style={{display:'flex'}} key={index}>
                    <ul style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <input type="checkbox" />
                      <li style={{marginRight:'0.5rem',padding:'10px'}}>{item.instruction.text}<span style={{marginLeft:'0.5rem'}}>
                        {` => ${item.distance}`} Meters
                        </span></li>
                    </ul>
                    {/* <span style={{padding:'10px'}}>{item.distance} Meters</span> */}
                  </div>
                )
              })
            }
        </div>
    </div>
  )
}

export default SingleHospitalPage