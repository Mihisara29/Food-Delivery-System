import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='cotainer-fluid py-5'>
      <h1 className='display-5 fw-bold'>Order your favourite food here</h1>
      <p className='col-md-8 fs-4'>Discover the best food and drinks in Ambalangoda</p>
      <Link to="/explore" className='btn btn-primary'>Explore</Link>
    </div>  
  )
}

export default Header