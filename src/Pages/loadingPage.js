import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import loading from "hey-assets/images/loading.gif";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(55, 55, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
`;

const LoadingPage = () => (
  <LoadingContainer>
    <Image width={100} height={100} src={loading} />
  </LoadingContainer>
);

export default LoadingPage;
