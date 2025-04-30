import React from 'react'
import Menubar from './components/Menubar/Menubar';
import{Route,Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact'
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetail from './pages/FoodDetails/FoodDetail';
import Cart from './pages/Cart/Cart';

const App = () => {
  return (
    <div>
   <Menubar/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/explore' element={<ExploreFood/>}/>
      <Route path='/food/:id' element={<FoodDetail/>}/>
      <Route path='/cart' element={<Cart/>}/>
   </Routes>
    </div>
  )
}

export default App;