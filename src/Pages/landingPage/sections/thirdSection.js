import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Image } from "semantic-ui-react";
import { Content, Title, StepText } from "./components";
import { FlexInline } from "hey-components";

import img_community from "hey-assets/images/landing/third_window.png";
import BackImg from "hey-assets/images/landing/thrid_back.png";
import launch_btn from "hey-assets/images/landing/launch.png";
const SectionContainer = styled.div`
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 0 63px 131px rgba(254, 237, 45, 0.15);
  background-color: #f8a92a;
  padding: 200px 0;
  margin: -150px 0;
`;
class LandingSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SectionContainer>
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16} verticalAlign="middle">
              <div style={{ maxWidth: 400 }}>
                <StepText borderColor="rgba(226, 112, 0, 0.98)">
                  Step 2
                </StepText>
                <Title color="#ffffff" fontSize={30} style={{ marginTop: 20 }}>
                  Set Up Your Page, and Launch!
                </Title>
                <Content fontSize={17} color="#fefbab">
                  List out the benefits of joining and your pricing. When you're
                  ready, launch your memebership and tell your current
                  community.
                </Content>
                <FlexInline>
                  <Image src={launch_btn} width={100} />
                </FlexInline>
              </div>
            </Grid.Column>
            <Grid.Column computer={8} tablet={16}>
              <Image
                src={img_community}
                style={{ margin: "auto auto", maxWidth: "90%" }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SectionContainer>
    );
  }
}
export default LandingSection;
