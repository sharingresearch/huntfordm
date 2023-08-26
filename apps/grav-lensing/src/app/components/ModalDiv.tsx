import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const FadedDiv = styled.div`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

const TextDiv = styled.div`
  z-index: 101;
  position: fixed;
  top: 5%;
  left: 20%;
  width: 550px;
  background: black;
  opacity: 0.8;
  color: yellow;
  border: 1px solid yellow;
  border-radius: 10px;
  text-align: center;
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  flex-direction: row;
  opacity: 1;
`;

export const ModalDiv = ({ text }: { text: string }) => {
  let [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1080 && window.innerWidth != 0) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  return (
    <>
      {showModal && (
        <>
          <TextDiv>
            <button
              style={{
                color: "red",
                border: "0px",
                background: "rgba(0,0,0,0)",
                scale: "2",
                position: "absolute",
                top: "8px",
                right: "30px",
              }}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <p>{text}</p>
          </TextDiv>
        </>
      )}
    </>
  );
};
