import axios from "axios";

const API_URL = 'http://localhost:8080/api/foods';

export const fetchFoodList = async() => {
  try{
    const response = await axios.get(API_URL);
    return response.data;
  } catch(error){
    console.log('Error fetching the food list:',error);
    throw error;
  }
}


export const fetchFoodDetails = async (id) => {
  try{
    const response = await axios.get(`http://localhost:8080/api/foods/${id}`);
    return response.data;
  }catch(error){
    console.log('Error fetching food details:',error);
    throw error;
  }  
  
    
  }