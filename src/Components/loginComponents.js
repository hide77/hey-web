import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import { Button, Modal } from "semantic-ui-react";
import { TouchableOpacity, Text, InputBox, TextareaBox } from "hey-components";

export const Close = styled.div`
  &.circle {
    position: absolute;
    right: -20px;
    top: -20px;
    padding: 0px;
    width: 40px;
    height: 40px;
    margin: 0;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
  }
  &.rect {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0px;
    width: 30px;
    height: 30px;
    margin: 0;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Dialog = styled(Modal)`
  &.ui.modal {
    position: relative;
    border-radius: 15px;
  }

  &.ui.modal > :last-child {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &.ui.modal > :first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &.ui.modal > .content {
    margin: 30px !important;
    margin-bottom: 24px !important;
    padding: 0px !important;
    width: auto !important;
  }

  &.ui.modal > .ui.divider {
    border-top: 2px solid rgba(34, 36, 38, 0.15);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }
`;

export const TextButton = styled(Button)`
  &.ui.button {
    font-size: 17px;
    padding: 0;
    margin: 0;
    color: #1bb0f6;
    font-weight: bold;
    font-family: "Dosis";
    text-transform: uppercase;
    background: transparent !important;
    float: right;
  }

  &.ui.button:hover {
    color: #2186b6;
  }
`;

export const Submit = styled(TouchableOpacity)`
  width: 100%;
  margin-top: 24px;
`;

export const LoginInput = styled(InputBox)`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const LoginTextarea = styled(TextareaBox)`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const SocialButton = styled(TouchableOpacity)`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
`;

export const BottomText = styled(Text)`
  font-size: 18px;
  color: #4d4d4d !important;
  text-align: center;
  font-weight: 900;
  letter-spacing: ${STYLE_CONFIG.letterSpace}px;
`;
export const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #222;
`;
export const ErrorMessage = styled.p`
  & {
    font-size: 15px;
    color: red;
    margin: 0;
    padding: 0px;
    text-transform: uppercase;
    font-weight: bold;
    padding-top: 20px;
  }
`;
