import styled from "@emotion/styled";

export type TutorialTextProps = {
  heading: string;
  subheading?: string;
};

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  color: white;
  width: 725px;
  margin-left: 1.2em;
  flex-wrap: wrap;
  @media (max-width: 1080px) {
    font-size: 0.7em;
  }
  @media (max-height: 600px) {
    font-size: 0.6em;
  }
`;
const HeaderText = styled.div`
  font-size: 2.2em;
  font-weight: 600;
  line-height: 1.25em;
`;
const TextDiv = styled.div`
  font-size: 1.5em;
  line-height: 1.5em;
`;

export const TutorialText = ({ heading, subheading }: TutorialTextProps) => {
  return (
    <TextLayout>
      <HeaderText>{heading}</HeaderText>
      {/* {subheading && <p>{subheading}</p>} */}
      <TextDiv>{subheading}</TextDiv>
    </TextLayout>
  );
};
