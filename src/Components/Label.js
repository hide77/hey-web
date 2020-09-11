import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import Text from "./Text";

const Label = styled(Text)`
  & {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 3.5px 6.5px;
    background: #758ea3;
    border-radius: 5.52px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    line-height: 10px;
    text-align: center;
  }
`;

export default Label;
