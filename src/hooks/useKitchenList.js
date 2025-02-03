import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { kitchenList } from "../stubs/kitchen-list";
import { addKitchenList } from "../utils/kitchenSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const useKitchenList = () => {

  const dispatch = useDispatch();
  const kitchens = useSelector(store => store.kitchen.kitchenList);

  const getKitchenList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kitchen/all`, {
        withCredentials: true
      });
      const kitchenData = response.data.data.map((menu) => {
        const base64Image = menu.image
          ? `data:image/jpeg;base64,${btoa(
            String.fromCharCode(...new Uint8Array(menu.image.data.data))
          )}`
          : null;
        return {
          ...menu,
          image: base64Image,
        };
      });
      if (response && response?.data?.data?.length) {
        dispatch(addKitchenList(kitchenData));
      }

    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    if (!kitchens)
      getKitchenList();
  }, []);
};

export default useKitchenList;
