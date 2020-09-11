import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import { Content, Title, StepText } from "./components";
import { TouchableOpacity } from "hey-components";
import { setLoginModalVisible } from "hey-actions/global";
import BackImg from "hey-assets/images/landing/fifth_back.png";
import fifth_top from "hey-assets/images/landing/fifth_top.jpg";
import fifth_block_back from "hey-assets/images/landing/fifth_block_back.png";
const SectionContainer = styled.div`
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 0 63px 131px rgba(254, 237, 45, 0.15);
  padding: 200px 0 100px 0;
  margin: -150px 0;
`;
const TextBlock = styled.div`
  text-align: center;
  width: 830px;
  max-width: 80%;
  margin: 50px auto;
  background-image: url(${fifth_top});
  background-position-x: center;
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: 0 44px 90px rgba(193, 195, 199, 0.98);
  border-radius: 24px;
  background-color: #ffffff;
  padding: 50px 10% 100px 10%;
  position: relative;
`;
const InnerBlock = styled.div`
  background-image: url(${fifth_block_back});
  background-position-x: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const StartBtn = styled(TouchableOpacity)`
  font-family: "MuseoSansRounded-900";
  font-size: 22px;
  width: 240px;
  position: absolute;
  bottom: -25px;
  left: calc(50% - 120px);
  line-height: 85px;
  height: 80px;
  padding: 0;
  border-radius: 40px;
`;
class LandingSection extends Component {
  constructor(props) {
    super(props);
  }
  onStart = () => {
    const { history, activePageID, isAuthenticated, dispatch } = this.props;
    if (!isAuthenticated) {
      dispatch(setLoginModalVisible());
      return;
    }
    if (activePageID && activePageID !== "undefined") {
      history.push(`/subscribe/pages/${activePageID}/create`);
    } else {
      history.push(`/subscribe/create/create-page`);
    }
  };
  render() {
    return (
      <SectionContainer>
        <TextBlock>
          <InnerBlock>
            <Title color="#34469d" fontSize={38}>
              You Have a Talent, You Deserve Recognition
            </Title>
            <Content color="#7e89c0" fontSize={21} style={{ marginTop: 20 }}>
              Create your own community, monetise your talent and develop your
              potential
            </Content>
          </InnerBlock>
          <StartBtn customStyle={"landingStart"} onClick={this.onStart}>
            Start Now ->
          </StartBtn>
        </TextBlock>
      </SectionContainer>
    );
  }
}
LandingSection.propTypes = {
  t: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  activePageID: PropTypes.string,
  history: PropTypes.object
};
function mapStateToProps(state) {
  const { isAuthenticated } = state.authentication;
  const { activePageID } = state.page;
  return {
    isAuthenticated,
    activePageID
  };
}
export default connect(mapStateToProps)(
  withNamespaces()(withRouter(LandingSection))
);
