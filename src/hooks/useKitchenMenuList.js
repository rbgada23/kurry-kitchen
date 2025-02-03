import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addKitchenMenu } from "../utils/kitchenSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const useKitchenMenuList = () => {
  const dispatch = useDispatch();
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);

  const getKitchenMenuList = async () => {
    if (!kitchen?._id) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/kitchen/kitchenMenu`,
        {
          withCredentials: true,
          params: {
            kitchen: kitchen._id,
          },
        }
      );
      
      const menuData = response.data.data.map((menu) => {
        // Ensure image data exists and is of type buffer or array
        let base64Image = null;
        if (menu.image && menu.image.data && Array.isArray(menu.image.data.data)) {
          base64Image = `data:image/jpeg;base64,${btoa(
            String.fromCharCode(...new Uint8Array(menu.image.data.data))
          )}`;
        }
        
        return {
          ...menu,
          image: base64Image,
        };
      });

      dispatch(addKitchenMenu(menuData));
    } catch (error) {
      console.error("Failed to fetch kitchen menu list:", error);
    }
};


  useEffect(() => {
    if (!kitchenMenuList.length && kitchen?._id) {
      getKitchenMenuList();
    }
  }, [kitchen, kitchenMenuList]);
};

export default useKitchenMenuList;
