import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {kitchenList} from "../stubs/kitchen-list";
import { addKitchenList } from "../utils/kitchenSlice";

const useKitchenList = () => {

  const dispatch = useDispatch();
  const kitchens = useSelector(store=>store.kitchen.kitchenList);


  const getKitchenList = () => {
    const data = kitchenList;
    console.log(data);
    dispatch(addKitchenList(data));
  };

  useEffect(() => {
    if(!kitchens)
        getKitchenList();
  }, []);
};

export default useKitchenList;
