import React from "react"
import { PharmacyView } from "./views/pharmacy/PharmacyView"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PharmacyView />} />
        </Routes>
      </div>
    </>
  )
}

export default App
