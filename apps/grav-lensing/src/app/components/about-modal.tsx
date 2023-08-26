import styled from "@emotion/styled";
import TextButton from "./buttons/text-button";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: #000;
  padding: 25px 40px;
  border-radius: 1.5em;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
  @media (max-width: 1080px) {
    font-size: 0.8em;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  z-index: 1000;
  color: white;
  justify-content: center;
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
  width: 100%;
  z-index: 1000;
  color: white;
  justify-content: center;
  text-align: center;
  font-size: 1em;
  font-weight: 200;
  & > p {
    margin-bottom: 0.5em;
  }
  & > p > a {
    color: white;
  }
`;

const ModalFooter = styled.div`
  width: 100%;
  z-index: 1000;
  color: white;
  justify-content: center;
  text-align: center;
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background: white;
  margin: 1em 0;
`;

export const AboutModal = ({ open, onClose }: AboutModalProps) => {
  if (!open) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>About</ModalHeader>
        <ModalContent>
          <p>
            Every massive object in the universe bends nearby rays of light.
            This gravitational lensing causes the images of distant galaxies to
            be distorted.
          </p>
          <p>
            Gravitational lensing is a powerful tool in modern cosmology.
            Cosmologists use the average distortion in measured galaxies to make
            maps of the matter in the universe, including the otherwise
            invisible dark matter.
          </p>
          <p>
            In "The Hunt for Dark Matter" you can follow this process yourself,
            interactively. You get a genuine intuition for how gravitational
            lensing works and what its effects look like in the sky, without
            needing your own powerful telescope, or needing to work through the
            mathematics.
          </p>
          <p>Once trained, you can test this intuition.</p>
          <p>
            In a minesweeper-like puzzle game, many clumps of invisible dark
            matter have been hidden in a toy universe. Can you spot the
            characteristic patterns of gravitational lensing?
          </p>
          <p>Will you succeed in the hunt for dark matter?</p>
          <Divider />
          <p>
            The Hunt for Dark Matter was conceived of by Shaun Hotchkiss at{" "}
            <a
              href="https://sharingresearch.com"
              target="_blank"
              rel="noreferrer"
            >
              Effective Research Sharing
            </a>{" "}
            (ERS) and produced in collaboration by ERS and{" "}
            <a href="https://dotdot.studio" target="_blank" rel="noreferrer">
              DOTDOT Studio
            </a>
            . The stacking animations in the tutorial were produced by{" "}
            <a href="https://sayostudio.com/" target="_blank" rel="noreferrer">
              Sayo Studio
            </a>
            .
          </p>
          <p>
            Funding and additional scientific consultation were provided by
            Antony Lewis, Catherine Heymans, Jens Chluba and Pierre Fleury
            through research grants from the European Research Council, The
            Royal Society, French National Centre for Scientific Research and la
            Caixa Foundation.
          </p>
          <p>
            The source code and other original content are released under the MIT licence and are available at: <a href="https://github.com/sharingresearch/huntfordm" target="_blank" rel="noreferrer">https://github.com/sharingresearch/huntfordm</a>
          </p>
          <p>
            For further details contact Shaun{" "}
            <a href="mailto:shaun@sharingresearch.com">via email</a>.
          </p>
          <Divider />
          <p>
            This project received financial support from “la Caixa” Foundation
            (ID 100010434, fellowship code LCF/BQ/PI19/11690018). This app is part of
            projects that received funding from the European Research 
            Council (ERC) under support from the European Research Council 
            under the European Union's Seventh Framework Programme 
            (FP/2007-2013) (Grant Agreement Nos. [616170], [647112] and [725456] )
          </p>
        </ModalContent>
        <ModalFooter>
          <TextButton onClick={onClose}>Close</TextButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AboutModal;
