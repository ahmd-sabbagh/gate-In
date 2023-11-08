import React from 'react'
import EmployCard from '../../../Components/EmployCard/EmployCard'

function JobsApplication() {
  return (
    <div className='p-4 bg-white r-10'>
        <h3 className=' fs-32-600 mb-5'>طلبات الوظائف</h3>
        <div className="row g-4">
            <div className="col-12 col-lg-6">
                <EmployCard/>
            </div> 
            <div className="col-12 col-lg-6">
                <EmployCard/>
            </div>
        </div>
    </div>
  )
}

export default JobsApplication