import React from "react";
import mascotImg from "../assets/dog.png";

function Mascot() {
  return (
    <div className="box mascot">
      
      <img
        src={mascotImg}
        alt="Mascot"
        className="mascot-img"
      />
      
    </div>
  );
}

export default Mascot;
