import React from "react";
import { FaArrowLeft, FaCar } from "react-icons/fa";
import { categoriesData } from "../constants";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Post = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto bg-white text-sblue">
     <div className="h-screen w-auto">
     <div className="w-full relative flex items-center justify-center bg-slight py-5 px-4">
        <span onClick={() => navigate("/")} className="absolute left-4">
          <FaArrowLeft className="text-lg" />
        </span>
        <h2 className="m-auto font-semibold">Post Your Ad</h2>
      </div>
      <div className="w-full h-auto flex flex-col lg:gap-8 items-center">
        <div className="w-full flex justify-center">
          <h1 className="text-lg font-semibold py-3 lg:py-8">CHOOSE YOUR CATEGORY</h1>
        </div>
        <div className="lg:w-[50%] grid grid-cols-2  border-collapse">
          {categoriesData.map((category, index) => {
            if (index === 7) {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center border border-solid border-gray-300 py-7 "
                >
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="text-3xl">
                      <BsThreeDots />
                    </div>
                    <h3 className="text-sm font-semibold text-center">
                      MORE OPTIONS
                    </h3>
                  </div>
                </div>
              );
            } else if (index > 7) {
              return null;
            } else {
              return (
                <div
                  onClick={()=>navigate(`/post/attributes/${category.item}`)}
                  key={index}
                  className="flex items-center justify-center border border-solid border-gray-300 py-7 "
                >
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="text-3xl">{category.postIcon}</div>
                    <h3 className="text-sm font-semibold text-center">
                      {category.item}
                    </h3>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
     </div>
      <Footer/>
    </div>
  );
};

export default Post;
