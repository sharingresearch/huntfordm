import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const HeaderLogoImage = styled.img`
  height: 1em;
`;

export const HeaderLogo = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push("/tutorial");
  }, [history]);
  return (
    <div onClick={handleClick} style={{ cursor: "pointer", zIndex: 1000 }}>
      <HeaderLogoImage
        src="/assets/img/header-logo.png"
        alt="The hunt for dark matter"
        draggable="false"
      />
    </div>
  );
};
