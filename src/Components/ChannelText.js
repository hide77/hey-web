import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import Text from "./Text";

const ChannelText = styled(Text)`
  & {
    position: relative;
    font-weight: bold;
    padding-left: 24px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    font-size: ${props => props.fontSize};
    text-transform: ${props => (props.uppercase ? "uppercase" : "initial")};
    color: #3c3c3c;
  }

  &:before {
    position: absolute;
    font-size: ${props => props.fontSize};
    font-weight: 500;
    line-height: 28px;
    color: ${props => (props.active ? "#50aff0" : "#7b7b7b")};
    content: "#";
    left: 0px;
    top: 6px;
  }
`;

ChannelText.defaultProps = {
  uppercase: false,
  fontSize: "20px",
  active: false
};

export default ChannelText;
