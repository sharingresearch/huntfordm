import styled from "@emotion/styled";

export type PrimaryButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
} & ButtonStyleProps;
type ButtonStyleProps = {
  width?: string;
  height?: string;
  fontSize?: string;
};

const ButtonPill = styled.div<ButtonStyleProps>`
  border-radius: 3em;
  height: 2.2em;
  width: ${(props) => props.width || "6.5em"};
  background-color: #000a;
  font-size: ${(props) => props.fontSize || "1.5em"};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.4em;
  padding-right: 1em;
  padding-left: 1.3em;
  color: white;
  font-weight: 600;
  margin: 10px;
  z-index: 10;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
  &:hover {
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
  }
  text-transform: uppercase;
`;

export const PrimaryButton = ({
  onClick,
  children,
  width,
  fontSize,
}: PrimaryButtonProps) => {
  return (
    <ButtonPill fontSize={fontSize} width={width} onClick={onClick}>
      {children}
    </ButtonPill>
  );
};

export default PrimaryButton;
