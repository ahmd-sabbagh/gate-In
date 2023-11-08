import './Employ.css'
import { Outlet } from 'react-router-dom'
import HeaderSteps from './Components/HeaderSteps/HeaderSteps'

function Employe() {
  return (
    <div className='employe-page py-5'>
        <HeaderSteps />
        <Outlet />
    </div>
  )
}

export default Employe