import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addKitchenMenu } from "../utils/kitchenSlice";
import axios from "axios";

const useKitchenMenuList = () => {
  const dispatch = useDispatch();
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);

  const getKitchenMenuList = async () => {
    if (!kitchen?._id) return;
    try {
      const response = await axios.get("http://localhost:3001/kitchen/kitchenMenu", {
        withCredentials: true,
        params: {
          kitchen: kitchen._id,
        },
      });
      dispatch(addKitchenMenu(response.data.data));
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
