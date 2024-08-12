import About from "../components/platforma-main/about/About";
import { useRef, useState } from "react";
import Footer from "../components/platforma-main/footer/Footer";
import Hero from "../components/platforma-main/hero/Hero";
import Student from "../components/platforma-main/student/Student";
import Teacher from "../components/platforma-main/teacher/Teacher";
import "../components/platforma-main/style.css";
import ReactPlayer from "react-player";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import VideoPlayer from "../VideoPlayer";

function PlatformMain() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);
  const customStartTime = 10;
  const customEndTime = 20;


  const videoUrls = [
    "http://static.kremlin.ru/media/events/video/ru/video_low/btQlxg5CoYIFvpf6iSYs2WqLqqLe1hNH.mp4", // First video URL
    "http://static.kremlin.ru/media/events/video/ru/video_low/kmkoPsYdq7EoAhOAac6COZaNZ4OV6vSA.mp4"  // Second video URL
  ];

  const handleProgress = (state) => {
    console.log(state);
    
    if (state.playedSeconds >= customEndTime) {
      console.log("stop");
      
      setPlaying(false); // Stop the video when it reaches the custom end time
    }
  };
  const handleEnded = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };
  const handleStart = () => {
    console.log("start");
    
    if (playerRef.current) {
      playerRef.current.seekTo(customStartTime, 'seconds');
      setPlaying(true); // Start playing the video
    }
  };
  return (
    <div className="landing_page">
      <Hero />
      {/* <div>
        <ReactPlayer
          playing={playing}
          ref={playerRef}
          alt="Video"
          onEnded={handleEnded}
          url={videoUrls[currentVideoIndex]}
          width="100%"
          progressInterval={3000}
          // onReady={handleStart}
          onProgress={handleProgress}
          muted={true}
          onDuration={(duration) => {
            console.log(duration);
          }}
          controls
          onContextMenu={(e) => e.preventDefault()}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
        <button onClick={handleStart}>Play Custom Segment</button>
      </div> */}
      <VideoPlayer />
      <About />
      <Teacher />
      <Student />
      <Footer />
    </div>
  );
}

export default PlatformMain;
