import React, { useCallback, useRef } from "react";
import PrimaryButton from "../buttons/primary-button";
import amplitude from "amplitude-js";
import { useHistory } from "react-router-dom";
import { ClickSound } from "../../components/audio/sound";
import styled from "@emotion/styled";

const VideoPlayer = styled.video`
  width: 100vw;
`;

const UseRefPlayer = () => {
  const videoRef = useRef();

  // const handlePlay = () => {
  //   videoRef.current.play();
  // };

  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Next Button", { CurrentPage: "Stacked Galaxies 1" });
    history.push("/tutorial/stackedgalaxies2");
    ClickSound.play();
  }, [history]);

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
        <button
          style={{
            color: "red",
            position: "fixed",
            top: "63%",
            left: "40%",
            zIndex: "10",
            borderRadius: "3em",
            height: "2.2rem",
            width: "6.4rem",
            fontSize: "1.5em",
            display: "flex",
            flexDirection: "row",
            fontWeight: "600",
            justifyContent: "center",
            color: "black",
            backgroundColor: "#FFFA",
            visibility: "hidden",
          }}
          onClick={handleNext}
        >
          Stack
        </button>
        <VideoPlayer id="myVideo" autoPlay playsInline ref={videoRef}>
          <source src="../../assets/video/First.mp4" type="video/mp4" />
        </VideoPlayer>
      </div>
    </>
  );
};

export default UseRefPlayer;
