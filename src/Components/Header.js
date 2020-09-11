import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";

export const HeaderExtra = ({ children, ...other }) => (
  <Text
    fontSize="41px"
    style={{
      fontWeight: "bold",
      lineHeight: 1.12
    }}
    {...other}
  >
    {children}
  </Text>
);

HeaderExtra.propTypes = {
  children: PropTypes.node
};

export const Header1 = ({ children, style, ...other }) => (
  <Text
    fontSize="28px"
    style={{
      fontWeight: "600",
      textTransform: "uppercase",
      lineHeight: "35px",
      letterSpacing: "0.93px",
      ...style
    }}
    {...other}
  >
    {children}
  </Text>
);

Header1.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export const Header2 = ({ children, style, ...other }) => (
  <Header1
    fontSize="25.2px"
    style={{
      lineHeight: "normal",
      ...style
    }}
    {...other}
  >
    {children}
  </Header1>
);

Header2.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export const Header3 = ({ children, ...other }) => (
  <Header2 fontSize="22.3px" {...other}>
    {children}
  </Header2>
);

Header3.propTypes = {
  children: PropTypes.node
};

export const Header4 = ({ children, ...other }) => (
  <Header2
    fontSize="18px"
    style={{
      letterSpacing: "0.93px"
    }}
    {...other}
  >
    {children}
  </Header2>
);

Header4.propTypes = {
  children: PropTypes.node
};

export const Header5 = ({ children, ...other }) => (
  <Header2
    fontSize="15px"
    style={{
      letterSpacing: 0,
      fontWeight: 700,
      fontSize: "15px",
      lineHeight: "29px"
    }}
    {...other}
  >
    {children}
  </Header2>
);

Header5.propTypes = {
  children: PropTypes.node
};
