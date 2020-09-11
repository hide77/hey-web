import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";

const SelectBox = styled(Dropdown)`
  &.ui.dropdown {
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
    width: ${props => (props.width ? props.width : 100)}px;
  }

  &.ui.dropdown > .dropdown.icon:before {
    color: #bbb9b9;
  }

  &.ui.active.dropdown .menu,
  &.u.active.dropdown {
    /* border: 2px solid #50aff0; */
    width: ${props => (props.width ? props.width : 100)}px;
    margin-left: -2px;
    box-shadow: none;
  }
  &.ui.dropdown .menu > .item {
    font-family: Dosis;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #2f2f2f;
  }
  &::placeholder {
    text-transform: uppercase;
    color: #dfdfdf;
  }
`;

// SelectBox.defaultProps = {
//   color: "#7b7b7b",
//   fontSize: "22px",
//   fontWeight: "500",
//   active: false
// };

SelectBox.propTypes = {
  width: PropTypes.number
};

export default SelectBox;
