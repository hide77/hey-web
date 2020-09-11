import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export const HeyContextMenu = styled(ContextMenu)`
  box-shadow: rgba(43, 53, 124, 0.243) 0px 1px 11px;
  background: white;
  border-radius: 4px;
  border: none;
  z-index: 100;
`;

export const HeyContextMenuItem = styled(MenuItem)`
  &.react-contextmenu-item {
    padding: 0.78571429em 1.14285714em !important;
    cursor: pointer;
    border: none;
    border-bottom: 1px solid #f1efef;
    width: 157px;
    font-family: Dosis;
    font-style: normal;
    text-transform: none !important;
    font-weight: bold !important;
    font-size: 14.2px !important;
    line-height: 18px !important;
    /* identical to box height */
    letter-spacing: ${STYLE_CONFIG.letterSpace}px !important;
    color: #3c3c3c !important;
  }
  &.react-contextmenu-item:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &.react-contextmenu-item:focus {
    outline: none;
  }
  &.react-contextmenu-item.red-color {
    color: #d8274d !important;
  }
  &.react-contextmenu-item.no-border {
    border-bottom: none;
  }
`;

export const HeyContextMenuTrigger = styled(ContextMenuTrigger)`
  .react-contextmenu-wrapper {
    width: max-content;
  }
`;
