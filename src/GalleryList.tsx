
import "./components/Modal.css";
import React, { useEffect, useState } from "react";
import {SlCloudUpload} from "react-icons/sl";
import {IconContext} from "react-icons";
import Modal from "./components/Modal";

import {getUrl} from "./helper/urlHelper";
import db from "./data/db.json";
import Spinners from "./components/Spinners";
import Gellery from "./Gellery";
import Image from "./Image";

console.log(db);

const GallerryList = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [bigImage, setBigImage]: any = useState('');
  const [image, setImage]: any = useState('');
  const [values, setValues] = useState({
    images: []
  });

  const [gallery, setGallery] = useState([]);

  const toggleModal = (e: any, image: any) => {
    setModal(!modal);
    console.log(e.src, image.title)
    setBigImage(e.src)
    setImage(image)
      
    if (!modal) {
      document.body.classList.add('active-modal')

    } else {
      document.body.classList.remove('active-modal')
    }
  };

  function changeHandler(e: any){
    let name = e.target.name;

    setValues({...values, [name]: [...values.images, ...e.target.files]});
  }

  useEffect(() => {
    async function getImages(){
      try{
        let response = await fetch(`${getUrl()}/images/images`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        })

        let rs = await response.json();

        if (rs.success){
          setGallery(rs.images);
          console.log(rs);

        } else if (rs.error){
          console.log(rs.error);
        }
      } catch(err){
        console.log(err);
      }
    }  
    
    getImages().then(d => {
      console.log(d);
    });
  }, [])

  function handleSubmit(){
    let imagesData = new FormData();
    setLoading(true)

    values.images && imagesData.append("imageSize", String(values.images.length));

    for (let i = 0; i < values.images.length; i++){
      imagesData.append(`image-${i + 1}`, values.images[i]);
    }

    async function saveItem(data: any){
      try{
        let response = await fetch(`${getUrl()}/images/add-images`, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: data
        })

        return await response.json();
      } catch(err){
        console.log(err);
      }
    }

    saveItem(imagesData).then(data => {
      setValues({images: []});
      setLoading(false);
      console.log(data);
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });
  }

  function deleteImage(index: any){
    let tempImageArray = [...values.images];
    tempImageArray.splice(index, 1);
    setValues({...values, images: tempImageArray});

    if (values.images.length <= 1){
      let elem: any = document.querySelector("input[type=file]");
      elem.value = "";
    }
  }

  return (
    <div className='gallery'>
      {loading && <div className="loading-container">
        <Spinners/>
      </div>}
      <div className="input-file">
        <div className="file-container">
          <input 
            type="file" 
            id="file" 
            style={{display: "none"}}
            name="images"
            onChange={changeHandler}
          />
          <div>
            <label htmlFor="file" className="file">
              Select File
              <span style={{verticalAlign: -3, marginLeft: 5}}>
                <SlCloudUpload color="white" className="icon"/>
              </span>
            </label>
          </div>
          <button 
            disabled={values.images.length > 0 ? false : true}
            className="upload-btn"onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="image-preview">
        {values.images.map((image, i) => (
          <div className="preview-container" key={i}>
            <img src={window.URL.createObjectURL(image)} key={i} width={100} height={100} className="preview"/>
            <button className="delete-image" onClick={() => deleteImage(i)}>X</button>
          </div>
        ))}
      </div>
      <div className="gallery-title">
        <h1>Gallery</h1>
      </div>
      <div className='gallery-list'>
        {gallery.map((image: any, i: any) => (
          <Gellery
            key={i} 
            image={image} 
            toggleModal={toggleModal}
          />
        ))}

        {modal && bigImage && image &&
          (<div className="modal">
            <div onClick={(e) => toggleModal(e.target, image)} className="overlay">
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2></h2>
                <img src={bigImage} alt="img" className="modal-img"/>
                {/**<Image img={bigImage}/> */}
                <button className="close-modal" onClick={(e) => toggleModal(e.target, image)}>
                    CLOSE
                </button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default GallerryList