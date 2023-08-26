import styled from "@emotion/styled";
import PrimaryButton from "../buttons/primary-button";

type StackProp = {
  open: boolean;
  onClose: () => void;
  scanResult?: boolean;
};

type ImageProp = {
  imgSrc: string;
};
const StackOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  zindex: 1000;
`;
const ImageDiv = styled.div<ImageProp>`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid white;
  border-radius: 50%;
  background: url("${(props) => props.imgSrc}"), #000;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  zindex: 1000;
`;
const DarkMatterDiv = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid white;
  border-radius: 50%;
  background: #000;
  zindex: 1000;
`;
const DotDiv = styled.div`
  height: 12px;
  width: 12px;
  margin: 50% auto 50%;
  border-radius: 100%;
  background: yellow;
  position: flex;
  zindex: 1000;
`;
const StackFooter = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 80%;
  left: 50%;
  width: 600px;
  height: 300px;
  padding-top: 80px;
  transform: translate(-50%, -50%);
  zindex: 1000;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: white;
`;
const FooterText = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  height: 50px;
  width: 600px;
  transform: translate(-50%, -50%);
  zindex: 1000;
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  color: white;
`;

const DarkMatterText = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  width: 70vw;
  transform: translate(-50%, -50%);
  zindex: 1000;
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  color: yellow;
`;

export default function StackPopUp({ open, scanResult, onClose }: StackProp) {
  if (open === true) {
    if (scanResult === true) {
      return (
        <StackOverLay>
          <div>
            {/* <ImageDiv imgSrc = {'./assets/img/darkmatterbg.jpg'}></ImageDiv> */}
            <DarkMatterDiv>
              <DotDiv></DotDiv>
            </DarkMatterDiv>
            <StackFooter>
              <DarkMatterText>
                You've found a clump of Dark Matter!
              </DarkMatterText>
              <PrimaryButton width="6em" onClick={onClose}>
                NEXT
              </PrimaryButton>
            </StackFooter>
          </div>
        </StackOverLay>
      );
    }
    return (
      <StackOverLay>
        <div>
          <ImageDiv imgSrc={"./assets/img/gl-cu-sector.jpg"}>
            {/* {scanResult.distortion && <StackResult matrix={scanResult.distortion} layers={stackLayers} />} */}
          </ImageDiv>
          <StackFooter>
            <FooterText>No Dark Matter to be found here.</FooterText>
            <PrimaryButton width="6em" fontSize={"1.2em"} onClick={onClose}>
              TRY AGAIN
            </PrimaryButton>
          </StackFooter>
        </div>
      </StackOverLay>
    );
  }
  return null;
}
