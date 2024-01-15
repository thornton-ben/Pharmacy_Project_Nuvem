import logo from "./public/logo.svg"
import { PharmacyView } from "./views/pharmacy/PharmacyView"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PharmacyView />        
      </header>
    </div>
  )
}

export default App
