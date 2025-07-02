import React from "react";
import Search from "../Search/Search";

const Home=()=>{
  return(
    <div className="home flex container">
      <div className="mainText">
        <h1 className="heading1">Fly with Confidence</h1>
        <h1 className="heading2">Where Efficiency Meets Elegance</h1>
      </div>
      <Search/>
    </div>
  )
}
export default Home;