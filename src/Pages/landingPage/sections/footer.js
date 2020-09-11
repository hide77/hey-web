import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import styled from "styled-components";
import { Container, Image } from "semantic-ui-react";
import {
  Content,
  LandingMenuText,
  LandingMenuBtn,
  LandingMenuItem
} from "./components";
import logo_header from "hey-assets/images/logo.png";
const SectionContainer = styled.div`
  background-color: transparent;
  padding: 100px 0 50px 0;
`;
const FooterContainer = styled(Container)`
  &.ui.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & .logo-img.ui.image {
    margin: 0 20px;
  }
  @media (max-width: 1000px) {
    & .logo-img.ui.image {
      display: none;
    }
  }
  & .footer-side {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 768px) {
    & .footer-side {
      display: block;
      text-align: center;
    }
    & .footer-side .item {
      margin-top: 20px;
    }
  }
`;
class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SectionContainer>
        <FooterContainer>
          <div className="footer-side">
            <LandingMenuItem>
              <LandingMenuText fontSize={14} color="#4179e2">
                Manifesto
              </LandingMenuText>
            </LandingMenuItem>
            <LandingMenuItem>
              <LandingMenuText fontSize={14} color="#4179e2">
                About
              </LandingMenuText>
            </LandingMenuItem>
            <LandingMenuItem>
              <LandingMenuText fontSize={14} color="#4179e2">
                Careers
              </LandingMenuText>
            </LandingMenuItem>
          </div>
          <Image src={logo_header} height={45} className="logo-img" />
          <div className="footer-side">
            <LandingMenuItem onClick={this.onLogin}>
              <LandingMenuText fontSize={14} color="#aab0cf">
                Help
              </LandingMenuText>
            </LandingMenuItem>
            <LandingMenuItem onClick={this.onLogin}>
              <LandingMenuText fontSize={14} color="#aab0cf">
                Terms of Use
              </LandingMenuText>
            </LandingMenuItem>
            <LandingMenuItem onClick={this.onLogin}>
              <LandingMenuText fontSize={14} color="#aab0cf">
                Privacy Policy
              </LandingMenuText>
            </LandingMenuItem>
          </div>
        </FooterContainer>

        <Container textAlign="center" style={{ marginTop: 30 }}>
          <Content color="#abb4e1" fontSize={14}>
            Copyright © Hey-Group S.A./N.V. 2019, 2017. All rights Reserved.
          </Content>
        </Container>
      </SectionContainer>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  const { isAuthenticated } = state.authentication;
  return {
    isAuthenticated
  };
}
export default connect(mapStateToProps)(withNamespaces()(Footer));
