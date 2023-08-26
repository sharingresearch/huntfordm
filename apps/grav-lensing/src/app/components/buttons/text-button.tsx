import styled from "@emotion/styled";

export type TextButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const ButtonPlain = styled.div`
  height: 2em;
  font-size: 1em;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.1em 0.75em;
  color: white;
  text-transform: uppercase;
`;

export const TextButton = ({ onClick, children }: TextButtonProps) => {
  return <ButtonPlain onClick={onClick}>{children}</ButtonPlain>;
};

export default TextButton;
