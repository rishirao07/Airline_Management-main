import React from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import PassengerDetails from "./PassengerDetails";
import Payments from "../Results/Payment/Payments";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const departure = query.get('departure');
  const arrival = query.get('arrival');
  const travelers = Number(query.get('travelers'));
  const checkIn = query.get('checkIn');
  const checkOut = query.get('checkOut');
  const classType = query.get('classType');

  const sampleFlights = [
    {
      airline: 'Air India',
      price: 'RS.10,000',
      departureTime: '09:00 AM',
      departureAirport: departure,
      arrivalAirport: arrival,
      date: checkIn,
      cabin: classType,
      arrivalTime: '11:30 AM',
      duration: '2h 30m',
    },
    {
      airline: 'Indigo',
      price: 'RS.10,500',
      departureTime: '010:00 AM',
      departureAirport: departure,
      arrivalAirport: arrival,
      date: checkIn,
      cabin: classType,
      arrivalTime: '12:45 PM',
      duration: '2h 45m'
    },
  ];

  const handleFlightSelect = () => {
    navigate('passenger-details');
  };

  return (
    <div className="searchResultsContainer">
      <Routes>
        <Route path="/" element={
          <div className="resultsGrid">
            {sampleFlights.map((flight, index) => (
              <div key={index} className="resultCard" onClick={handleFlightSelect}>
                <h2>{flight.airline}</h2>
                <p><span className="labels"></span> {flight.price}</p>
                <div className="detailsContainer">
                  <div className="flightInfo">
                    <p><span className="labels"></span> {flight.date}</p>
                    <p><span className="labels"></span> {flight.departureTime}</p>
                    <p><span className="labels"></span> {flight.departureAirport}</p>
                  </div>
                  <div className="flightDuration">
                    <p><MdFlightTakeoff className='logo'/>--------{flight.duration}--------<MdFlightLand className='logo'/></p>
                  </div>
                  <div className="flightTimes">
                    <p><span className="labels"></span> {flight.date}</p>
                    <p><span className="labels"></span> {flight.arrivalTime}</p>
                    <p><span className="labels"></span> {flight.arrivalAirport}</p>
                  </div>
                </div>
                <p><span className="cabin"></span> {flight.cabin}</p>
              </div>
            ))}
          </div>
        }/>
        <Route path="passenger-details" element={<PassengerDetails travelers={travelers} />} />
        <Route path="passenger-details/payment" element={<Payments />} />
      </Routes>
    </div>
  );
};

export default SearchResults;
