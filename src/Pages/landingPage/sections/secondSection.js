import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Image } from "semantic-ui-react";
import { Content, Title, StepText } from "./components";
import { FlexInline } from "hey-components";

import img_charactor from "hey-assets/images/landing/charactor2.png";
import img_chat from "hey-assets/images/landing/second_chat.png";
import BackImg from "hey-assets/images/landing/second_back.png";
import facebook_btn from "hey-assets/images/landing/facebook_btn.png";
import twitter_btn from "hey-assets/images/landing/twitter_btn.png";
const SectionContainer = styled.div`
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  margin-top: -10vw;
  padding-top: 10vw;
  padding-bottom: 15vw;
`;
class SecondSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SectionContainer>
        <Grid container stackable>
          <Grid.Row only="mobile tablet">
            <Grid.Column computer={7} tablet={16}>
              <Image
                src={img_charactor}
                style={{ margin: "auto auto", maxWidth: "80%" }}
              />
            </Grid.Column>
            <Grid.Column computer={9} tablet={16} verticalAlign="middle">
              <Title color="#ffffff" fontSize={46}>
                How does it work?
              </Title>
              <Content fontSize={21} color="#ffffff" style={{ marginTop: 20 }}>
                Membership is a relationship between you and your community —
                the ones that choose to go a level deeper than just following
                you on social media. They become paying members in exchange for
                exclusive benefits you offer and direct access.
              </Content>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="computer">
            <Grid.Column computer={9} tablet={16} verticalAlign="middle">
              <Title color="#ffffff" fontSize={46}>
                How does it work?
              </Title>
              <Content fontSize={21} color="#ffffff" style={{ marginTop: 20 }}>
                Membership is a relationship between you and your community —
                the ones that choose to go a level deeper than just following
                you on social media. They become paying members in exchange for
                exclusive benefits you offer and direct access.
              </Content>
            </Grid.Column>
            <Grid.Column computer={7} tablet={16}>
              <Image
                src={img_charactor}
                style={{ margin: "-20% 10% auto auto", maxWidth: "80%" }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16}>
              <Image
                src={img_chat}
                style={{ margin: "-10 10% auto auto", maxWidth: "90%" }}
              />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} verticalAlign="middle">
              <div style={{ maxWidth: 400 }}>
                <StepText borderColor="rgba(6, 134, 243, 0.98)">
                  Step 1
                </StepText>
                <Title color="#ffffff" fontSize={30} style={{ marginTop: 20 }}>
                  Tell Your Community You’re Launching on Hey
                </Title>
                <Content fontSize={17} color="#b6feff">
                  Share updates, deliver benefits, and build community. Keep up
                  the momentum by sharing on your social channels to bring more
                  subscribers to Hey.
                </Content>
                <FlexInline>
                  <Image src={facebook_btn} width={100} />
                  <Image src={twitter_btn} width={100} />
                </FlexInline>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SectionContainer>
    );
  }
}
export default SecondSection;
