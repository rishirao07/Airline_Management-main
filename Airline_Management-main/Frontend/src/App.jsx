import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import SignIn from "./Components/signIn/signIn";
import Profile from "./Components/Profile/Profile";
import SearchResults from "./Components/Results/SearchResults";
import Footer from "./Components/Footer/Footer";
import PaymentSuccess from "./Components/Results/Payment/PaymentSuccess";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchresults/*" element={<SearchResults />} />
          <Route path="/payment-success" element={<PaymentSuccess/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
