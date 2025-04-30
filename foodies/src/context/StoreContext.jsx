import { createContext,useState,useEffect } from "react";
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

  const removeFromCart = (foodId) => {
     setQuantities((prevQuantities) => {
        const updatedQuantities = {...prevQuantities}
        delete updatedQuantities[foodId];
        return updatedQuantities;
     })
  }
  
  const contextValue = {
      foodList,
      quantities,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
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