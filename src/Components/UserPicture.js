import React from "react";
import PropTypes from "prop-types";
import getColorFromString from "hey-mocks/getColorFromString";
import { idx } from "hey-mocks";

const UserPicture = ({
  src,
  user,
  superStyle = {},
  size = 33,
  bubble,
  rounded
}) => {
  let usernameInitial = idx(["username", 0], user, "").toUpperCase();
  let userPicture = src ? src : idx(["pictures", "default"], user);
  return userPicture ? (
    <div style={superStyle ? superStyle : { position: "relative" }}>
      {bubble && (
        <div
          style={{
            width: size / 5,
            height: size / 5,
            backgroundColor: "#f15e67",
            borderRadius: size / 10,
            position: "absolute",
            zIndex: 2,
            top: size / 25,
            right: size / 25
          }}
        />
      )}
      <div
        style={{
          backgroundColor: "#C6CDDB",
          backgroundImage: `url(${
            userPicture.indexOf("http") === 0
              ? `${userPicture}`
              : `https://${userPicture}`
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: size,
          height: size,
          borderRadius: rounded ? 4 : size / 2
        }}
      />
    </div>
  ) : (
    <div style={superStyle}>
      {bubble && (
        <div
          style={{
            width: size / 5,
            height: size / 5,
            backgroundColor: "#f15e67",
            borderRadius: size / 10,
            position: "absolute",
            zIndex: 2,
            top: size / 25,
            right: size / 25
          }}
        />
      )}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: rounded ? 4 : size / 2,
          backgroundColor: getColorFromString(usernameInitial),
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: size / 2,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {usernameInitial}
        </div>
      </div>
    </div>
  );
};

UserPicture.propTypes = {
  src: PropTypes.string,
  user: PropTypes.object,
  superStyle: PropTypes.object,
  size: PropTypes.number,
  bubble: PropTypes.bool,
  rounded: PropTypes.bool
};

export default UserPicture;
