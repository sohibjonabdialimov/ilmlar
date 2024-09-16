import React, { useEffect, useState } from 'react'
import CustomVideoPlayer from './CustomVideoPlayer'
import axios from 'axios'

function CustomVideo({ videosrc }) {
  const [urls, seturls] = useState([]);
  if(!videosrc){
    return;
  }
  useEffect(() => {
    axios.get(`${videosrc}`).then((res) => {
      console.log(res);
      seturls(res.data);

    })

  }, [videosrc])
  return (
    <div>
    { urls.length > 0 && <CustomVideoPlayer urls={urls} /> }
    </div>
  )
}

export default CustomVideo