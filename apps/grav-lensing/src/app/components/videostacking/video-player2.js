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
  //   videoRef1.current.play();
  // };

  const history = useHistory();

  const handleNext = useCallback(() => {
    amplitude
      .getInstance()
      .logEvent("Click on Stack Button", { CurrentPage: "Stacked Galaxies 2" });
    history.push("/tutorial/stackedgalaxies3");
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
            top: "31%",
            left: "56%",
            zIndex: "10",
            borderRadius: "3em",
            height: "2.2rem",
            width: "13rem",
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
          Stack the Rest
        </button>
        <VideoPlayer id="myVideo" autoPlay playsInline ref={videoRef}>
          <source src="../../assets/video/Second.mp4" type="video/mp4" />
        </VideoPlayer>
      </div>
    </>
  );
};

export default UseRefPlayer;
