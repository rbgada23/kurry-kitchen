import axios from "axios";

export const getKitchenMenu = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/kitchen/kitchenMenu",
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("API call failed:", error);
  }
};

