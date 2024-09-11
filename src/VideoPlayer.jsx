// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// const VideoPlayer = ({ playlistUrl }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     // Video.js pleerini yaratish
//     playerRef.current = videojs(videoRef.current, {
//       controls: true,
//       autoplay: false,
//       preload: 'auto',
//     });

//     // Pleerga playlist URL ni o'rnatish
//     playerRef.current.src({ src: playlistUrl, type: 'application/x-mpegURL' });

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose(); // Pleerni yo'q qilish
//       }
//     };
//   }, [playlistUrl]);

//   return (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-default-skin" style={{ width: '100%', height: 'auto' }} />
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && src) {
      const hls = new Hls();
      hls?.loadSource(src);
      hls?.attachMedia(video);
      hls?.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      if (video && video.src) {
        video.src = '';
      }
    };
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        width="640"
        height="264"
      >
        <p>Your browser does not support HTML5 video.</p>
      </video>
    </div>
  );
};

export default VideoPlayer;
