import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Placeholder } from "semantic-ui-react";
import { STYLE_CONFIG } from "hey-config";
import UserPicture from "./UserPicture";

const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 15px rgba(33, 30, 56, 0.0923913);
  }
`;
const ImageContainer = styled.div`
  background: ${props => (props.img ? `url(${props.img})` : "#EFF2F3")};
  border-radius: 7px 7px 0px 0px;
  width: ${props => `${props.width}px`};
  width: ${props => (props.fixed ? `${props.width}px` : "100%")};
  height: ${props => `${(props.width * 8) / 18}px`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
  background-position-x: center;
`;
const UserImg = styled.div`
  box-shadow: 0px 2px 15px rgba(33, 30, 56, 0.0923913);
  border-radius: 50%;
  position: absolute;
  background: white;
  top: ${props => `${(props.width * 4) / 18}px`};
  left: ${props => `calc(50% - ${(props.width * 4) / 18}px)`};
  width: ${props => `${(props.width * 8) / 18}px`};
  height: ${props => `${(props.width * 8) / 18}px`};
`;
const Content = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 15px rgba(33, 30, 56, 0.0923913);
  height: ${props => `${(props.width * 16) / 18}px`};
  /* width: ${props => `${props.width}px`}; */
  width: ${props => (props.fixed ? `${props.width}px` : "100%")};
  border-radius: 0 0 7px 7px;
  padding: ${props => `${(props.width * 4) / 18 + 15}px`} 15px 15px 15px;
  word-break: break-word;
  & p {
    font-family: Dosis;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #6b727f;
    margin: 0;
  }
  & h1 {
    font-family: Dosis;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    margin: 0;
    color: #1d2128;
  }
`;
const UserCard = ({
  width = 180,
  backImage,
  userInfo,
  title,
  fixed,
  isLoading,
  editMode,
  editCover = () => {},
  ...other
}) => {
  if (title && title.length > 38) {
    title = title.slice(0, 35) + "...";
  }
  return (
    <CardContainer {...other}>
      <ImageContainer
        img={backImage}
        width={width}
        fixed={fixed}
        onClick={() => {
          editCover();
        }}
      >
        {editMode && (
          <div
            style={{
              margin: "auto",
              textAlign: "center"
            }}
          >
            <span
              style={{
                display: "inline-block",
                textAlign: "center",
                color: "#FFF",
                padding: "4px 8px",
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: "0 0 8px 8px"
              }}
            >
              Upload image
            </span>
          </div>
        )}
      </ImageContainer>
      <UserImg width={width}>
        {isLoading && <Placeholder.Image />}
        {!isLoading && <UserPicture user={userInfo} size={(width * 8) / 18} />}
      </UserImg>
      <Content width={width} fixed={fixed}>
        {isLoading && (
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        )}
        <p>{userInfo && userInfo.name}</p>
        <h1>{title}</h1>
      </Content>
    </CardContainer>
  );
};

UserCard.propTypes = {
  backImage: PropTypes.string,
  userInfo: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.number,
  fixed: PropTypes.bool,
  isLoading: PropTypes.bool,
  editMode: PropTypes.bool,
  editCover: PropTypes.func
};

export default UserCard;
