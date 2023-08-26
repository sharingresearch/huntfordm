import styled from "@emotion/styled";

export type LabelProps = {
  fontSize?: string;
  height?: string;
  lineHeight?: string;
  borderRadius?: string;
};
const defaultLineHeight = "1em";
const defaultLabelHeight = "1em";
const defaultBorderRadius = "0.3em";

export const Label = styled.div<LabelProps>`
  width: max-content;
  height: ${(props) => props.height || defaultLabelHeight};
  padding: 0.3em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: ${(props) => props.borderRadius || defaultBorderRadius};
  background-color: #ff0;
  color: black;
  font-size: ${(props) => props.fontSize || props.height || defaultLabelHeight};
  line-height: ${(props) => props.lineHeight || defaultLineHeight};
  text-transform: uppercase;
`;
