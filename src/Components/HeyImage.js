import styled from "styled-components";
export const RoundImage = styled.div`
  & {
    border-radius: 8px;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-image: url(${props => props.src});
    background-color: rgb(198, 205, 219);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
