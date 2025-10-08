import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);



  const parseCartKey = (cartKey) => {
  if (cartKey.includes("_")) {
    const [itemId, size] = cartKey.split("_");
    return { itemId, size };
  }
  return { itemId: cartKey, size: null };
};

  const addToCart = async (cartKey) => {
    const { itemId, size } = parseCartKey(cartKey);
    setCartItems((prev) => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1,
    }));
    if(token){
      try {

        await axios.post(url + "/api/cart/add", 
         { itemId , size},
         { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async(cartKey) => {
    const { itemId, size } = parseCartKey(cartKey);
    setCartItems((prev) => {
      if (!prev[cartKey]) return prev;
      const updated = { ...prev, [cartKey]: prev[cartKey] - 1 };
      if (updated[cartKey] <= 0) delete updated[cartKey];
      return updated;
    });
     await axios.post(
      `${url}/api/cart/remove`,
      { itemId, size },  // ✅ also include size
       { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [id, size] = cartKey.split("_");
        const itemInfo = food_list.find((f) => f._id === id);
        if (!itemInfo) continue;

        let price = 0;

        if (itemInfo.sizes && size) {
          price = itemInfo.sizes[size];           // pizza
        } else if (itemInfo.price !== undefined) {
          price = itemInfo.price;                 // normal item
        } else if (itemInfo.sizes) {
          const firstSizeKey = Object.keys(itemInfo.sizes)[0];
          price = itemInfo.sizes[firstSizeKey];   // fallback
        }

        totalAmount += price * cartItems[cartKey];
      }
    }
    return totalAmount;
    
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/foodlist");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token ) =>{
    const response = await axios.get(url+ "/api/cart/get",{ headers: { Authorization: `Bearer ${token}` } });
    setCartItems(response.data.cartData);
  }


  useEffect(() => {
  async function loadData() {
    await fetchFoodList();

    const storedToken = localStorage.getItem("token");
    if (storedToken){
      setToken(storedToken);
      await loadCartData(storedToken);
    }

  }

  loadData();
}, []);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
