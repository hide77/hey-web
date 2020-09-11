import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Menu } from "semantic-ui-react";
import { STYLE_CONFIG } from "hey-config";
import {
  FlexInline,
  InputBox,
  TouchableOpacity,
  HeaderExtra,
  Header2,
  Header4
} from "hey-components";

export const Title = styled.div`
  & {
    font-family: "MuseoSansRounded-900";
    font-size: ${props => props.fontSize}px;
    line-height: ${props => `calc(${props.fontSize}px / 1.2 * 1.3)`};
    font-weight: 400;
    color: ${props => props.color};
    padding: 5px 0px;
    word-break: break-word;
  }

  @media only screen and (max-width: 648px) {
    & {
      font-size: ${props => `calc(${props.fontSize} / 1.2)`}px;
      line-height: ${props => `calc(${props.fontSize}px / 1.2 * 1.3)`};
    }
  }

  @media only screen and (max-width: 476px) {
    & {
      font-size: ${props => `calc(${props.fontSize} / 1.5)`}px;
      line-height: ${props => `calc(${props.fontSize}px / 1.2 * 1.3)`};
    }
  }
`;

Title.propTypes = {
  fontSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export const Content = styled.div`
  & {
    font-family: "SourceSansPro-Semibold";
    font-size: ${props => props.fontSize}px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: ${props => props.color};
  }
`;
Content.propTypes = {
  fontSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};
export const ImageConainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: 175px;
`;

export const LandingButton = styled(TouchableOpacity)`
  & {
    text-transform: none;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    font-family: "MuseoSansRounded-900";
  }
`;

export const StepText = styled.div`
  border: 2px solid;
  border-radius: 19px;
  border-color: ${props => props.borderColor};
  color: white;
  text-transform: uppercase;
  font-family: "MuseoSansRounded-900";
  width: max-content;
  padding: 10px 20px 5px;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
`;

export const LandingMenuText = styled(Title)`
  text-transform: uppercase;
`;

export const LandingMenuBtn = styled.button`
  border: 3px solid rgba(12, 178, 255, 0.98);
  border-radius: 27px;
  color: #0cb2ff;
  font-family: "MuseoSansRounded-900";
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  text-transform: uppercase;
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
  background-color: transparent;
  padding: 0 20px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const LandingMenuItem = styled(Menu.Item)`
  & {
    cursor: pointer;
  }
  .ui.menu &.item:before {
    width: 0px;
  }
  &:hover {
    opacity: 0.8;
    background: transparent;
  }
  &.user-icon:hover,
  .ui.secondary.menu &.item.user-icon:hover {
    opacity: 1;
    background: unset;
  }
  .ui.secondary.menu &.item:hover {
    opacity: 0.8;
    background: transparent;
  }
`;
