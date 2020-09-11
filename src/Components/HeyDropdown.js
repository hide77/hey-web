import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import { Dropdown } from "semantic-ui-react";

export const HeyDropdownItem = styled(Dropdown.Item)`
  .ui.menu .ui.dropdown .menu > &.item {
    text-transform: uppercase !important;
    cursor: pointer;
    font-family: Dosis;
    font-style: normal;
    font-weight: bold !important;
    font-size: 12px !important;
    line-height: 15px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #afafaf !important;
  }
  .ui.menu .ui.dropdown .menu > &.item.user-menu {
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
  .ui.menu .ui.dropdown .menu > &.item.red-color {
    color: #d8274d !important;
  }
  .ui.menu .ui.dropdown .menu > &.item.no-border {
    border-bottom: none;
  }
`;
