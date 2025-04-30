import { createContext,useState,useEffect } from "react";
import axios from "axios";
import { fetchFoodList } from "../service/foodservice";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    
  const [foodList,setFoodList] = useState([]);
  const [quantities,setQuantities] = useState({});

  const increaseQuantity = (foodId) => {
      setQuantities((prev) => ({...prev,[foodId]:(prev[foodId] || 0)+1}))
  }

  const decreaseQuantity = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0
    }));
  };
  
  const contextValue = {
      foodList
  };

  useEffect (() => {
      async function loadData() {
        const data = await fetchFoodList();
        setFoodList(data);
      }

      loadData();
      
  },[])
  
  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
  
}