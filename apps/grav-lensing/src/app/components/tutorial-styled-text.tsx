import { useState, useEffect } from "react";
import styled from "@emotion/styled";

export const TutStyledText = styled.div`
  color: white;
  font-size: 2.3em;
  font-weight: 600;
  line-height: 1.35em;
  padding-bottom: 2em;
  display: block;
  margin: 40px 0 10px 0;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  text-align: center;
  @media (max-width: 1080px) {
    font-size: 2em;
  }
`;
