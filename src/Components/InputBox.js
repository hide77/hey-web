import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
const InputBox = styled.input`
  & {
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px 14px;
    font-family: Dosis;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #2f2f2f;
    display: inline-block;
    ${props => props.inValid && `border-color:#f72b2b!important`};
  }

  &:focus {
    outline: unset;
    border: 2px solid #50aff0;
  }

  &::placeholder {
    text-transform: uppercase;
    color: #dfdfdf;
  }
`;

InputBox.defaultProps = {
  color: "#7b7b7b",
  fontSize: "22px",
  fontWeight: "500",
  active: false,
  inValid: false
};

export default InputBox;
