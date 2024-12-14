import React from "react";
// ToDo: Replace with exact image
import BG_URL from "../../assets/kitchen4.avif";
import { kitchenIMG } from "../../utils/constants";

const KitchenCard = ({ kitchenName, postarPath, description, onClick, image }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer duration-700 w-1/6 mr-4 mb-4 shadow-md bg-white border-2 rounded-lg relative"
    >
      {/* Image container with fixed size */}
      <img
        className="object-cover rounded-lg shadow-lg h-72" // Fixed height and width (you can adjust h-48 to any other height)
        alt="Kitchen Card"
        src={image || "https://lh3.googleusercontent.com/proxy/HtfKFkdagZAMcDYISnQFW_KRwGig586P-ZcBqED8Mo38kf8ONen9NOQMp2is03ezbqq6J8LF6Fm4S8CUi3tQlJDirH0bzUuxkMDVvA1FFrfwKjBma1PC"}
      />

      {/* Transparent black overlay at the bottom with text */}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 py-4 px-4 rounded-b-lg">
        <div className="text-xl font-bold text-white">{kitchenName}</div>
        <p className="text-lg font-medium text-white">{description}</p>
      </div>
    </div>
  );
};

export default KitchenCard;
