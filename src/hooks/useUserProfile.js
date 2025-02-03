import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL, SELLER } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const useUserProfile = () => {
  //fetch trailer
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.user);
 
  const getUserProfile = async (emailId) => {
    try {
      const userProfile = await axios.get(`${API_BASE_URL}/userProfile`, {
        withCredentials: true,
        params: {
          emailId: emailId,
        },
      });

      if (userProfile && userProfile.data) {
        const userInfo = {
          email: userProfile.data.data.emailId,
          displayName: userProfile.data.data.firstName,
          userType: userProfile.data.data.userType,
          userId: userProfile.data.data._id,
          contactNumber : userProfile?.data?.data?.contactNumber
        };
        dispatch(addUser(userInfo));
        userProfile?.data.data.userType == SELLER
          ? navigate("/kitchen")
          : navigate("/customer");
      }

    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${"token"}=`);
  if (parts.length === 2) {
    const user = localStorage.getItem("user");
    if(!userStore)
    getUserProfile(JSON.parse(user)?.email);
  }
};

export default useUserProfile;
