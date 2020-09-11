import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Grid, Image, Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Text,
  FlexInline,
  InputBox,
  TouchableOpacity,
  HeaderExtra,
  Header2,
  Header4
} from "hey-components";

import conins from "hey-assets/images/icon-coins.png";
import heart from "hey-assets/images/icon-heart.png";
import chest from "hey-assets/images/icon-chest.png";
import step1 from "hey-assets/images/step-1.png";
import step2 from "hey-assets/images/step-2.png";
import step3 from "hey-assets/images/step-3.png";
import logo_footer from "hey-assets/images/hey-logo-footer.png";
import logo_header from "hey-assets/images/hey-logo-header.png";
const Content = styled(Text)`
  & {
    font-weight: 500;
    padding-bottom: 20px;
    padding-top: 20px;
  }
`;

const Description = styled(Text)`
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
`;

const ImageConainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: 175px;
`;

const HomepageHeading = () => (
  <Container style={{ padding: "10% 12% 10% 12%" }}>
    <HeaderExtra color="#1d2e4d">
      You have a talent.
      <br />
      It should be valued.
    </HeaderExtra>
    <Content fontSize="29px" style={{ maxWidth: 700 }}>
      Develop a direct relationship with your community and generate
      predictable, recurring revenues from your talent.
    </Content>
    <FlexInline>
      <Link to="/register" style={{ marginRight: 6 }}>
        <TouchableOpacity customStyle={"focus"}>
          CREATE YOUR PAGE
        </TouchableOpacity>
      </Link>
      <Link to="/login">
        <TouchableOpacity customStyle={"default"}>LOGIN</TouchableOpacity>
      </Link>
    </FlexInline>
  </Container>
);

const ResponsiveContainer = ({ children }) => (
  <React.Fragment>
    <Segment
      style={{
        backgroundImage: "linear-gradient(108deg, #e3f5ff 3%, #f3d6d8 99%)",
        borderBottom: "none",
        height: "100vh"
      }}
      vertical
    >
      <Menu secondary={true} size="large">
        <Container>
          <Menu.Item header>
            <Image src={logo_header} height={45} />
          </Menu.Item>
        </Container>
      </Menu>
      <HomepageHeading />
    </Segment>
    {children}
  </React.Fragment>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ResponsiveContainer>
        <Segment
          vertical
          style={{
            backgroundColor: "white",
            borderBottom: "none",
            paddingBottom: 80
          }}
        >
          <Container
            style={{
              padding: "50px 12% 120px 12%"
            }}
          >
            <Segment
              vertical
              floated="left"
              style={{
                borderBottom: "none",
                padding: "unset"
              }}
            >
              {/* <Icon name="logo_grey" /> */}
              <Image src={logo_footer} height={45} />
              <Text color="#AFAFAF" fontSize="14px" fontWeight="500">
                {`Copyright © Hey-Group S.A./N.V.`}
                <br />
                {`2019, 2017. All rights Reserved.`}
              </Text>
            </Segment>
            <Segment
              vertical
              floated="right"
              textAlign="right"
              style={{
                borderBottom: "none",
                padding: "unset"
              }}
            >
              <Text color="#AFAFAF" fontSize="18px" fontWeight="bold">
                {`Help • Terms of use • Privacy Policy`}
              </Text>
              <Text color="#50AFF0" fontSize="18px" fontWeight="bold">
                {`Manifesto • About • Careers `}
              </Text>
            </Segment>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}

export default LandingPage;
