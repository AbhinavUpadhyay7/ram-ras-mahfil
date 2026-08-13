import ramShadow from "../assets/ram-shadow-transparent.png";

import "./RamVisual.css";


export default function RamVisual() {

  return (

    <div className="ram-visual">

      <div className="ram-light"></div>

      <div className="ram-light-core"></div>


      <img
        src={ramShadow}
        alt=""
        className="ram-shadow-image"
        draggable="false"
      />


      <div className="ram-visual-mantra">
        ॥ श्री राम ॥
      </div>

    </div>

  );

}