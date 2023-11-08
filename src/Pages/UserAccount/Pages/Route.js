import { Outlet } from "react-router-dom"
import Header from "./Header"
import './Rout.css'
function Route() {
  return (
    <div className='personala-data-route'>
        <Header />
        <div className="outlet mt-4">
            <Outlet />
        </div>
    </div>
  )
}

export default Route