import React from "react"
import { PharmacyView } from "./views/pharmacy/PharmacyView"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/navBar/NavBar"
import "./App.css"

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
