import React from "react"
import { PharmacyView } from "./views/pharmacy/PharmacyView"
import { DeliveryView } from "./views/delivery/DeliveryView"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/navBar/NavBar"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PharmacyView />} />
          <Route path="/delivery" element={<DeliveryView />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
