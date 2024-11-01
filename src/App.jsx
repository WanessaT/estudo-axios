
import './App.css'
import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default App
