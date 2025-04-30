import React, { useContext } from 'react'
import './Menubar.css';
import { assests } from '../../assets/assests';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Menubar = () => {
  const {quantities} = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/'><img src={assests.logo} alt="" className='mx-2' height={48} width={48}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/explore">Explore</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact us</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center gap-4">
        <Link to={`/cart`}><div className="position-relative">
          <img src={assests.cart} alt='' height={32} width={32} className='position-relative'/>
          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>{uniqueItemsInCart}</span>
        </div></Link>
        <button className='btn btn-outline-primary'>Login</button>
        <button className='btn btn-outline-success'>Register</button>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Menubar;