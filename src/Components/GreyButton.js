import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
export const GreyButton = styled.button`
  color: ${props => (props.disabled ? "#a0a4a9" : "#606367")};
  background-color: #f2f2f2;
  border: none;
  font-family: "Dosis", sans-serif;
  ${props => !props.disabled && "cursor: pointer"}
  font-size: ${props => (props.fontSize ? props.fontSize : "23.9497px")};
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
  font-weight: 600;
  width: 250px;
  height: 57px;
  box-sizing: border-box;
  outline: none;
  border-radius: 6.84277px;
  box-shadow: 0px 1px 10px 0px rgba(107, 115, 219, 0.09);
  &:active {
    background-color: #e2e2e2;
  }
  &:hover {
    background-color: ${props => (props.disabled ? "#f2f2f2" : "#d2d2d2")};
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 200px;
  }
  @media (max-width: 530px) {
    font-size: 13px;
    width: 160px;
  }
`;
