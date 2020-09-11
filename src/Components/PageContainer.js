import styled from "styled-components";

export const PageContainer = styled.div`
  & {
    padding-left: 180px;
    padding-right: 180px;
    overflow: auto;
    height: 100%;
    padding-bottom: 50px;
  }

  @media only screen and (max-width: 1600px) {
    & {
      padding-left: 90px;
      padding-right: 90px;
    }
  }

  @media only screen and (max-width: 1200px) {
    & {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;
