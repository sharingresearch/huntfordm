import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";

const VideoPlayer = styled.video`
  width: 100vw;
`;

const UseRefPlayer = () => {
  const videoRef = useRef();

  const handlePlay = () => {
    videoRef1.current.play();
  };

  return (
    <>
      <div
        style={{
          overflow: "hidden",
          maxHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <button 
              style={{
                  color: 'red', 
                  position: "fixed", 
                  top:'32%', 
                  left:'56%', 
                  zIndex:'10',
                  borderRadius: '3em',
                  height: '2.2rem',
                  width: '13rem',
                  fontSize: '1.5em',
                  display: 'flex',
                  flexDirection: 'row',
                  fontWeight: '600',
                  justifyContent: 'center',
                  color: 'black',
                  backgroundColor: '#FFFA',
                }} 
              onClick={handlePlay}>
              Stack the Rest
            </button> */}
        <VideoPlayer id="myVideo" autoPlay playsInline ref={videoRef}>
          <source src="../../assets/video/Third.mp4" type="video/mp4" />
        </VideoPlayer>
      </div>
    </>
  );
};

export default UseRefPlayer;
