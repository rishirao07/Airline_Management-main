import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

const Search = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [travelers, setTravelers] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [classType, setClassType] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!classType) {
      setErrorMessage("Please select a cabin you want to fly in.");
      return;
    }

    if (!departure || !arrival || !travelers || !checkIn) {
      setErrorMessage("Please fill all the fields (Return Date is optional).");
      return;
    }

    const travelersNumber = Number(travelers);
    if (isNaN(travelersNumber) || travelersNumber <= 0) {
      setErrorMessage("Travelers should be a positive number.");
      return;
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(departure) || !namePattern.test(arrival)) {
      setErrorMessage("Departure and Arrival Airports should contain only letters and spaces.");
      return;
    }

    navigate(`/searchresults?departure=${departure}&arrival=${arrival}&travelers=${travelers}&checkIn=${checkIn}&checkOut=${checkOut}&classType=${classType}`);
  };

  const handleTextInputChange = (e, setState) => {
    const { value } = e.target;
    const namePattern = /^[a-zA-Z\s]*$/;
    if (namePattern.test(value)) {
      setState(value);
    }
  };

  const handleTravelersChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setTravelers(value);
    }
  };

  const handleTravelersBlur = (e) => {
    const { value } = e.target;
    if (!/^\d+$/.test(value) || Number(value) <= 0) {
      setErrorMessage("Travelers should be a positive number.");
      setTravelers("");
    } else if (Number(value) > 9) {
      setErrorMessage("Cannot book for more than 9 passengers.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="btns flex">
          {["Economy", "Business Class", "First Class"].map((type) => (
            <div
              key={type}
              className={`singleBtn ${classType === type ? "active" : ""}`}
              onClick={() => setClassType(type)}
            >
              <span>{type}</span>
            </div>
          ))}
        </div>

        <div className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Departure Airport</h4>
              <input
                type="text"
                placeholder="Departure Airport"
                value={departure}
                onChange={(e) => handleTextInputChange(e, setDeparture)}
                list="departureCities"
              />
              <datalist id="departureCities">
                {cityOptions.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Arrival Airport</h4>
              <input
                type="text"
                placeholder="Arrival Airport"
                value={arrival}
                onChange={(e) => handleTextInputChange(e, setArrival)}
                list="arrivalCities"
              />
              <datalist id="arrivalCities">
                {cityOptions.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Travelers</h4>
              <input
                type="text"
                placeholder="Number of Travelers"
                value={travelers}
                onChange={handleTravelersChange}
                onBlur={handleTravelersBlur}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <SlCalender className="icon" />
            </div>
            <div className="texts">
              <h4>Depart</h4>
              <input
                type="date"
                placeholder="Departure Date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <SlCalender className="icon" />
            </div>
            <div className="texts">
              <h4>Return</h4>
              <input
                type="date"
                placeholder="Return Date (Optional)"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn btnBlock flex"
            onClick={handleSearch}
            disabled={!departure || !arrival || !travelers || !checkIn || classType === "" || travelers > 9}
          >
            Search Flight
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Search;
