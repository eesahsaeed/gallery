
import React from "react";
import { getUrl } from "./helper/urlHelper";

export default function({image, toggleModal}: any){

  let link = `${getUrl()}/images/get-image/${image._id}`;

  return (
    <div className='gallery-preview'>
      <p onClick={(e) => toggleModal(e.target, image)}>
        <img src={link} alt="img" />
      </p>
    </div>
  )
}
