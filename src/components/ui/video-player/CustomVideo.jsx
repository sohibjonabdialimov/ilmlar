import React, { useEffect, useState } from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import axios from "axios";

function CustomVideo({ videosrc }) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (!videosrc) {
      return;
    }
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${videosrc}`);

        setUrls(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideo();
  }, [videosrc]);

  return <div>{urls.length > 0 && <CustomVideoPlayer urls={urls} />}</div>;
}

export default CustomVideo;
