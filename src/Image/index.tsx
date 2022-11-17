
import React, { useState, useRef } from 'react'
import ReactCrop, {PixelCrop} from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

export default function CropDemo({img}: any) {
  const [crop, setCrop] = useState<PixelCrop>()

  return (
    <ReactCrop crop={crop} onChange={(c: PixelCrop) => {
      console.log(c)
    }}>
      <img src={img} className="modal-img"/>
    </ReactCrop>
  )
}
