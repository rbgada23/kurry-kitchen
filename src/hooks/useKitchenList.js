import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { kitchenList } from "../stubs/kitchen-list";
import { addKitchenList } from "../utils/kitchenSlice";
import axios from "axios";

const useKitchenList = () => {

  const dispatch = useDispatch();
  const kitchens = useSelector(store => store.kitchen.kitchenList);

  const getKitchenList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/kitchen/all", {
        withCredentials: true
      });
      if (response && response?.data?.data?.length) {
        dispatch(addKitchenList(response.data.data));
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
