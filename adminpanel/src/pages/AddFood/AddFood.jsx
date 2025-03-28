import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';



const AddFood = () => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:'',
    description:'',
    price:'',
    category:'Biriyani'
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]: value}));

  }

  const onSubmitHandler = async(event)=>{

    event.preventDefault();

    if(!image){
      toast.error('Please select an image.');
      return;
    }

    try{
        await addFood(data,image);
        toast.success('Food added successfully')
       setData({name:'',description:'',category:'Biryani',price:''}) 
       setImage(null);
    }catch(error){

      toast.error('Error adding food.')
    }

  }



  return (
    <div className="mx-2 mt-2">
  <div className="row ">
    <div className="card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Add Food</h2>
        <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
            <label htmlFor="image" className="form-label"><img src={image ?URL.createObjectURL(image) : assets.upload} alt="" width={115}/></label>
           <input type="file" className='form-control' id="image" hidden onChange={(e)=>setImage(e.target.files[0])}/>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="5" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select name="category" id="category" className='form-control' onChange={onChangeHandler} value={data.category}>
            <option value="Biriyani">Biriyani</option>
            <option value="Cake">Cake</option><option value="Burger">Burger</option><option value="Pizza">Pizza</option><option value="Rolls">Rolls</option><option value="Salad">Salad</option><option value="Ice cream">Ice cream</option>  

            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
           <input type="number" name="price" className='form-control' id="price" onChange={onChangeHandler} value={data.price} />
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddFood;

<div className="container ">
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="contact-form">
        <h2 className="mb-4">Contact Us</h2>
        <form>
          <div className="mb-3">
            <label for="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">Your Email</label>
            <input type="email" className="form-control" id="email" required/>
          </div>
          <div className="mb-3">
            <label for="message" className="form-label">Your Message</label>
            <textarea className="form-control" id="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</div>