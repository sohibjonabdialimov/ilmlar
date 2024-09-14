import React, { useEffect, useState } from 'react'
import CustomVideoPlayer from './CustomVideoPlayer'
import axios from 'axios'

function CustomVideo({videosrc}) {
  console.log(videosrc?.orni)
  const [urls,seturls]=useState([])
  useEffect(() => {
    axios.get(`${videosrc?.orni}`).then((res) => {
      console.log(res);
      // seturls(res);
      
    })

  }, [])
  return (
    <div>ewf</div>
  )
}

export default CustomVideo