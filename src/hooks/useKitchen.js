import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addKitchen } from "../utils/kitchenSlice";
import axios from "axios";

const useKitchen = () => {
  const dispatch = useDispatch();
  const kitchens = useSelector((store) => store.kitchen.kitchenObj);

  const getKitchen = async () => {
    const response = await axios.get("http://localhost:3001/kitchen", {
      withCredentials: true,
      params: {
        userId: JSON.parse(localStorage.getItem("user"))?.userId,
      },
    });
    dispatch(addKitchen(response.data.data));
  };

  useEffect(() => {
    if (!kitchens) getKitchen();
  }, []);
};

export default useKitchen;
