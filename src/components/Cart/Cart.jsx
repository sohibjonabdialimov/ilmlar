import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultuser from "../../imgs/user-1.png"
import "./style.css";
import axios from "axios";
import urlJoin from "url-join";
const Cart = (props) => {
  const navigate = useNavigate();
  let kursId = props.cart._id;
  function deleteplatforma(url) {
    try {
      if (url?.includes("platforma")) {
        url = url.split("/")
        let res = ""
        for (let i = 2; i < url.length; i++) {
          res += "/" + url[i]
        }
        return (res)
      }
      else { return url}
  
    } catch (error) {
      console.log(error)
    }
  } 
  const [teacher,setTeacher]=useState({});

  useEffect(()=>{
    axios.get("https://api.ilmlar.com/teacherinfo/"+props?.cart?.teacher_Id).then((res)=>{
      setTeacher(res.data);
    })
  },[])
  return (
    <div className="d-flex justify-content-center"
      onClick={() => {
        navigate("/student/kurs/" + kursId);
      }}
    >
      <div className="main-cart" style={{cursor: "pointer"}}>
      
        <img src={urlJoin("https://api.ilmlar.com", `${deleteplatforma(props?.cart?.obloshka)}`)} alt="" />
        <div className="cart-desc_wrap">
          <h3>{props?.cart?.Kursname?.length < 45 ? props?.cart?.Kursname : props?.cart?.Kursname?.split(0, 43) + "..."}</h3>
          <p>{props?.cart?.Kursdesc}</p>
          <div className="desc">
            {
              teacher.path?<img className="small_img" src={urlJoin("https://api.ilmlar.com", `${deleteplatforma( teacher.path)}`)} alt="" />:<img src={defaultuser}></img>
            }
            
            <span>{teacher?.fullname?.length < 30 ? teacher?.fullname : teacher.fullname?.split(0, 28) + "..."}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
