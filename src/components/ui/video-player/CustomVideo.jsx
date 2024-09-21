import React, { useEffect, useState } from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import axios from "axios";

function CustomVideo({ videosrc }) {
  const [urls, setUrls] = useState([]);
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    if (!videosrc) {
      return;
    }
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${videosrc}`);
        const newUrls = response.data.map(video => video.url);
        const newdurations = response.data.map(video => video.duration);
        setUrls(newUrls);
        setDurations(newdurations)
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideo();
  }, [videosrc]);

  return <div>{urls.length > 0 && <CustomVideoPlayer urls={urls} durations={durations} />}</div>;
}

export default CustomVideo;
