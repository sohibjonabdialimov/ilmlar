// import React from "react";
// import VideoPlayer from "./VideoPlayer";

// const videoUrls = [
//   "http://static.kremlin.ru/media/events/video/ru/video_low/btQlxg5CoYIFvpf6iSYs2WqLqqLe1hNH.mp4",
//   "http://static.kremlin.ru/media/events/video/ru/video_low/kmkoPsYdq7EoAhOAac6COZaNZ4OV6vSA.mp4",
// ];

// const generateM3U8Playlist = (urls) => {
//   const header = "#EXTM3U\n";
//   const playlistContent = urls.map(url => `#EXTINF:-1,\n${url}`).join("\n");
//   return header + playlistContent;
// };

// function NewPlayer() {
//   // M3U8 playlist yaratish
//   const m3u8Playlist = generateM3U8Playlist(videoUrls);
  
//   // M3U8 playlistni blobga o'girish
//   const blob = new Blob([m3u8Playlist], { type: 'application/x-mpegURL' });
//   const playlistUrl = URL.createObjectURL(blob);

//   return (
//     <div className="App">
//       <h1>Video Playlist with M3U8</h1>
//       <VideoPlayer playlistUrl={playlistUrl} />
//     </div>
//   );
// }

// export default NewPlayer;
import React from 'react';
import VideoPlayer from './VideoPlayer';

const videoUrls = [
  "http://static.kremlin.ru/media/events/video/ru/video_low/btQlxg5CoYIFvpf6iSYs2WqLqqLe1hNH.mp4",
  "http://static.kremlin.ru/media/events/video/ru/video_low/kmkoPsYdq7EoAhOAac6COZaNZ4OV6vSA.mp4",
];

// Playlist yaratish funksiyasi
const generateM3U8Playlist = (urls) => {
  const header = "#EXTM3U\n";
  const playlistContent = urls.map(url => `#EXTINF:-1,\n${url}`).join("\n");
  return header + playlistContent;
};

function NewPlayer() {
  const m3u8Playlist = generateM3U8Playlist(videoUrls);

  // Blobni yaratish
  const blob = new Blob([m3u8Playlist], { type: 'application/x-mpegURL' });
  const playlistUrl = URL.createObjectURL(blob);

  return (
    <div className="App">
      <h1>Video Playlist with M3U8</h1>
      <VideoPlayer src={playlistUrl} />
    </div>
  );
}

export default NewPlayer;

