import React from "react";
import Spline from "@splinetool/react-spline";

const Avatar3D = ({ avatarType }) => {

  // Exemple : scène d'un robot (URL correcte en .splinecode)
  const sceneUrl =
    "https://prod.spline.design/JkW6af0FUPLi1SEu/scene.splinecode";

  return (
    <div className="w-full h-full">
      <Spline scene={sceneUrl} />
    </div>
  );
};

export default Avatar3D;