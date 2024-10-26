import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addKitchen, addKitchenMenu } from "../utils/kitchenSlice";
import axios from "axios";

const useKitchenMenuList = () => {
  const dispatch = useDispatch();
  const kitchen = useSelector((store) => store.kitchen.kitchenObj);
  const kitchenMenuList = useSelector((store) => store.kitchen.kitchenMenuList);

  const getKitchenMenuList = async () => {
    const response = await axios.get("http://localhost:3001/kitchen/kitchenMenu", {
      withCredentials: true,
      params: {
        kitchen: kitchen._id,
      },
    });
    console.log(response.data);
    dispatch(addKitchenMenu(response.data.data));
  };

  useEffect(() => {
    if (!kitchenMenuList.length > 0) getKitchenMenuList();
  }, []);
};

export default useKitchenMenuList;
