import styled from "@emotion/styled";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

export type ProgressBarProps = {
  steps: string[];
  currentStep: string;
};

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StepIndicator = styled.div`
  width: 0.5em;
  height: 0.5em;
  border: 1px solid white;
  border-radius: 0.5em;
  background-color: ${(props) => (props.color ? props.color : "clear")};
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #fffa;
  }
`;

const StepSeparator = styled.div`
  width: 3em;
  height: 1px;
  background-color: white;
`;

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  const history = useHistory();

  return (
    <BarContainer>
      {steps.map((link, index) => {
        if (index === steps.length - 1) {
          return (
            <StepIndicator
              key={link}
              color={link === currentStep ? "white" : "clear"}
              onClick={() => history.push(link)}
            />
          );
        } else {
          return (
            <Fragment key={link}>
              <StepIndicator
                color={link === currentStep ? "white" : "clear"}
                onClick={() => history.push(link)}
              />
              <StepSeparator />
            </Fragment>
          );
        }
      })}
    </BarContainer>
  );
};
