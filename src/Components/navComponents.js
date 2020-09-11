import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import { Menu, Dropdown } from "semantic-ui-react";
import { HeyIcon, Text } from "hey-components";

export const NavItem = styled(Menu.Item)`
  .ui.menu &.item {
    border-left: none !important;
  }
  .ui.menu &.item:hover {
    cursor: pointer;
    background: none;
  }
  .ui.secondary.menu &.item:hover {
    background: none;
  }
  .ui.menu.vertical &.item {
    display: flex;
    align-items: center;
  }
  .ui.menu.vertical &.item.title-item {
    align-items: unset;
  }
  .ui.menu.vertical.sidebar_grey &.item {
    padding-bottom: 0;
    padding-top: 0;
  }
  .ui.menu.vertical.sidebar_grey &.item.title:hover {
    cursor: unset;
  }
  .ui.menu &.item.mx-auto {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .ui.menu &.item:before {
    width: 0px;
  }
`;

export const NavIcon = styled(HeyIcon)`
  width: 40px;
  height: 40px;
  padding: 12px;
  border-radius: 0.3125em;
`;

export const DropDownMenu = styled(Dropdown)`
  /* .ui .dropdown & .dropdown.icon {
    display: none;
  } */

  &.ui.dropdown {
    display: block;
  }
  &.ui.dropdown > .dropdown.icon {
    display: none;
    z-index: 2;
  }
  &.ui.dropdown .menu {
    top: 70px;
    border-radius: 0px;
    width: 300px;
  }
  &.ui.dropdown .menu .item {
    width: 100%;
    padding: 15px 15px !important;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f1efef;
    height: 60px;
  }
  &.ui.dropdown .menu .item > .image {
    max-height: unset;
    height: 40px;
    width: 40px;
  }
  &.ui.dropdown .menu .item > svg {
    overflow: unset;
  }
  &.ui.dropdown .menu .item > svg:last-child {
    margin-left: auto;
  }

  &.ui.dropdown .menu .item:hover {
    cursor: pointer !important;
    transition: 1s !important;
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
`;
export const NavBar = styled(Menu)`
  box-shadow: unset !important;
  border-bottom: solid 3px #e5e5e5;
  height: ${props => (props.mobile ? "60px" : "70px")};
  &.no-border {
    border: none;
  }
  &.ui.menu {
    margin: 0;
  }
`;
export const NavText = styled(Text)`
  & {
    font-size: 23.1px;
    font-weight: 500;
    padding-left: 12px;
    color: #717375;
  }
`;
export const NavMenuText = styled(Text)`
  & {
    font-size: 12px;
    font-weight: bold;
    padding-left: 8px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #afafaf;
  }
`;
export const MenuSubHead = styled(Text)`
  & {
    font-size: 12.4px;
    font-weight: bold;
    color: #3c3c3c;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
  }
`;

export const MenuText = styled(Text)`
  & {
    font-size: 20px;
    font-weight: bold;
    padding-left: 12px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #3c3c3c;
  }
`;
