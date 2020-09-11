import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Container, Grid, Image } from "semantic-ui-react";
import { Content, Title, ImageConainer, LandingButton } from "./components";
import { default as NavMenu } from "./navMenu";
import { setLoginModalVisible } from "hey-actions/global";

import img_gold from "hey-assets/images/landing/icon_gold.png";
import img_heart from "hey-assets/images/landing/icon_heart.png";
import img_star from "hey-assets/images/landing/icon_star.png";
import BackImg from "hey-assets/images/landing/first_back.png";
import img_window from "hey-assets/images/landing/window.png";
import valued_back from "hey-assets/images/landing/valued_back.png";

const SectionContainer = styled.div`
  background-color: white;
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px 0 50px 0;
  padding-bottom: 250px;
`;
const ValueBackImg = styled.img`
  position: absolute;
  right: -10px;
  bottom: 0px;
  width: 3.3em;
`;
class FirstSection extends Component {
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
    const { t } = this.props;
    return (
      <SectionContainer>
        <NavMenu />
        <Grid container style={{ marginTop: 40 }}>
          <Grid.Row style={{ padding: 0 }}>
            <Grid.Column computer={7} tablet={16}>
              <div style={{ margin: "50px auto 50px auto", maxWidth: 400 }}>
                <div style={{ position: "relative", width: "max-content" }}>
                  <Title color="#34469d" fontSize={46}>
                    {t("LandingPage.header_you_have")}
                  </Title>
                  <Title color="#34469d" fontSize={46}>
                    {t("LandingPage.header_should_be")}
                    <p style={{ display: "inline", color: "#fc9a21" }}>
                      {t("LandingPage.header_highlgiht_word")}
                    </p>
                    <ValueBackImg src={valued_back} />
                  </Title>
                </div>
                <Content
                  color="#7e89c0"
                  fontSize={21}
                  style={{ marginTop: 20 }}
                >
                  {t("LandingPage.header_description")}
                </Content>
                <LandingButton
                  customStyle={"landingfocus"}
                  style={{
                    marginTop: 20
                  }}
                  onClick={this.onStart}
                >
                  {t("LandingPage.header_btn")}
                </LandingButton>
              </div>
            </Grid.Column>
            <Grid.Column computer={9} tablet={16} textAlign="center">
              <Image src={img_window} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container>
          <Container textAlign="center">
            <Title color="#34469d" fontSize={46}>
              {t("LandingPage.why_now")}
            </Title>
            <Content
              color="#7e89c0"
              fontSize={21}
              style={{ maxWidth: 750, margin: "40px auto" }}
            >
              {t("LandingPage.why_description")}
            </Content>
          </Container>
          <Grid container style={{ marginTop: 40 }}>
            <Grid.Row style={{ padding: 0 }}>
              <Grid.Column computer={5} tablet={16} textAlign="center">
                <ImageConainer>
                  <Image src={img_gold} width={150} />
                </ImageConainer>
                <Title color="#34469d" fontSize={30}>
                  Recurring revenue
                </Title>
                <Content color="#7e89c0" fontSize={17}>
                  Generate predictable, recurring revenue from your work through
                  your community who pays you monthly
                </Content>
              </Grid.Column>
              <Grid.Column computer={5} tablet={16} textAlign="center">
                <ImageConainer>
                  <Image src={img_heart} width={150} />
                </ImageConainer>
                <Title color="#34469d" fontSize={30}>
                  True Connection
                </Title>
                <Content color="#7e89c0" fontSize={17}>
                  Connect with your community directly, free from the ads and
                  algorithms that drive social media
                </Content>
              </Grid.Column>
              <Grid.Column computer={5} tablet={16} textAlign="center">
                <ImageConainer>
                  <Image src={img_star} width={150} />
                </ImageConainer>
                <Title color="#34469d" fontSize={30}>
                  Exclusive Benefits
                </Title>
                <Content color="#7e89c0" fontSize={17}>
                  Give your community members what they need: a peek behind the
                  scenes, extras they can’t get elsewhere, and the pride of
                  fueling what you do
                </Content>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </SectionContainer>
    );
  }
}

FirstSection.propTypes = {
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
  withNamespaces()(withRouter(FirstSection))
);
