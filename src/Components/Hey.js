import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import UIfx from "uifx";
import snd_tic from "hey-snd/tic.mp3";

const $_tic = new UIfx(snd_tic, {
  volume: 0.15,
  throttleMs: 0
});

// ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗███████╗
// ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝
// ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║███████╗
// ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║╚════██║
// ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║███████║
// ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝

const BUTTON_STYLES = {
  default: {
    color: "#AFAFAF",
    background: "#FFF",
    border: "rgba(0,0,0,0.15)",
    borderBottom: "rgba(0, 0, 0, 0.15)"
  },
  focus: {
    color: "#FFF",
    background: "#4eb1f8",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.25)"
  },
  landingfocus: {
    color: "#FFF",
    background: "#0cb2ff",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.25)"
  },
  landingStart: {
    color: "#FFF",
    background: "#fc9a21",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.25)"
  },
  landingSignup: {
    color: "#FFF",
    background: "#427ae3",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.25)"
  },
  login: {
    color: "#50AFF0",
    background: "#FFF",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(80,100,150,0.4)"
  },
  cancel: {
    color: "#3C3C3C",
    background: "#F3F8FB",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.15)"
  },
  success: {
    color: "#FFF",
    background: "#8BC43C",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.15)"
  },
  danger: {
    color: "#FFF",
    background: "#EC5F5F",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.15)"
  },
  gold: {
    color: "#CD7900",
    background: "#FFDE02",
    border: "rgba(0,0,0,0)",
    borderBottom: "rgba(0, 0, 0, 0.15)"
  }
};

const BUTTON_CONFIG = {
  borderWidth: 3,
  borderLine: 0,
  height: 46
};

const ButtonBase = styled.button`
  color: ${props => BUTTON_STYLES[props.customStyle].color};
  background-color: ${props => BUTTON_STYLES[props.customStyle].background};
  border: ${BUTTON_CONFIG.borderLine}px solid
    ${props => BUTTON_STYLES[props.customStyle].border};
  font-family: "Dosis", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
  font-weight: 600;
  padding: 0px 30px;
  height: ${BUTTON_CONFIG.height}px;
  box-sizing: border-box;
  outline: none;
  border-radius: ${BUTTON_CONFIG.height / 2}px;
  border-left: ${BUTTON_CONFIG.borderLine}px solid rgb(0, 0, 0, 0.15);
  border-right: ${BUTTON_CONFIG.borderLine}px solid rgb(0, 0, 0, 0.15);
  border-bottom: ${BUTTON_CONFIG.borderWidth}px solid rgba(0, 0, 0, 0.15);
  border-bottom: ${BUTTON_CONFIG.borderWidth}px solid
    ${props => BUTTON_STYLES[props.customStyle].borderBottom};
  box-shadow: 0px 1px 10px 0px rgba(107, 115, 219, 0.09);
  &:active {
    border-top: ${BUTTON_CONFIG.borderWidth}px solid rgba(0, 0, 0, 0.15);
    border-bottom: ${BUTTON_CONFIG.borderLine}px solid
      ${props => BUTTON_STYLES[props.customStyle].border};
  }
`;

// TouchableWithoutFeedback
export const TouchableWithoutFeedback = styled(ButtonBase);
TouchableWithoutFeedback.defaultProps = {
  customStyle: "default",
  onMouseEnter: () => {
    $_tic.play();
  }
};

// TouchableOpacity
export const TouchableOpacity = styled(ButtonBase)`
  &:hover {
    opacity: 0.9;
  }
`;
TouchableOpacity.defaultProps = {
  customStyle: "default",
  onMouseEnter: () => {
    $_tic.play();
  }
};
