import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage(){

const navigate = useNavigate();

return(

<div className="container">

<div className="card">

<h2>Garage Dashboard</h2>

<button onClick={()=>navigate("/search-customer")}>
Search Customer
</button>

</div>

</div>

);

}

export default HomePage;