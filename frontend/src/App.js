import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import RegisterPage      from "./pages/RegisterPage";
import LoginPage         from "./pages/LoginPage";
import DashboardPage     from "./pages/DashboardPage";
import AddCustomerForm   from "./pages/AddCustomerForm";
import CustomerSearchPage from "./pages/CustomerSearchPage";
import ServiceProblemPage from "./pages/ServiceProblemPage";
import BillPage          from "./pages/BillPage";
import BillLookupPage    from "./pages/BillLookupPage";

function App() {

  return (

    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/"         element={<LoginPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Customer */}
        <Route path="/add-customer"    element={<AddCustomerForm />} />
        <Route path="/search-customer" element={<CustomerSearchPage />} />

        {/* Service */}
        <Route path="/service-problem" element={<ServiceProblemPage />} />

        {/* Bill — generated after service */}
        <Route path="/bill"        element={<BillPage />} />

        {/* Bill Lookup — retrieve saved bill by phone */}
        <Route path="/bill-lookup" element={<BillLookupPage />} />

      </Routes>
    </Router>

  );

}

export default App;