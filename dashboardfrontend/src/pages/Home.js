import React from "react";
import { Link } from "react-router-dom";

//
const Home = () => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("User is logged in");
  } else {
    console.log("User is not logged in");
  }
  return (
    <div>
      <h1>THIS IS HOME PAGE</h1>
    </div>
  );
};

export default Home;
