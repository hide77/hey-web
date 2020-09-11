import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Image } from "semantic-ui-react";
import { Content, Title, StepText } from "./components";
import { FlexInline } from "hey-components";

import img_comment from "hey-assets/images/landing/fourth_window.png";
import BackImg from "hey-assets/images/landing/fourth_back.png";
import comment_btn from "hey-assets/images/landing/comment.png";
import left_bubble from "hey-assets/images/landing/fourth_left.png";
import right_bubble from "hey-assets/images/landing/fourth_right.png";

const SectionContainer = styled.div`
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 10vw;
  padding-bottom: 10vw;
  position: relative;
  @media (max-width: 992px) {
    padding-bottom: 20vw;
  }
`;
const BubbleImage = styled(Image)`
  &.ui.image {
    position: absolute;
    top: 10%;
    width: 20vw;
    ${props => props.position === "left" && "left: -10vw"};
    ${props => props.position === "right" && "right: -10vw"};
  }
`;
class LandingSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SectionContainer>
        <BubbleImage src={left_bubble} position="left" />
        <BubbleImage src={right_bubble} position="right" />
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16}>
              <Image
                src={img_comment}
                style={{ margin: "auto auto", maxWidth: "90%" }}
              />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} verticalAlign="middle">
              <div style={{ maxWidth: 400 }}>
                <StepText borderColor="rgba(215, 32, 18, 0.98)">
                  Step 3
                </StepText>
                <Title color="#ffffff" fontSize={30} style={{ marginTop: 20 }}>
                  Develop Relationships By Taking Them Along On The Journey.
                </Title>
                <Content fontSize={17} color="#ffffff">
                  Share updates, deliver benefits, and build community. Keep up
                  the momentum by sharing on your social channels to bring more
                  subscribers to Hey.
                </Content>
                <FlexInline>
                  <Image src={comment_btn} width={100} />
                </FlexInline>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SectionContainer>
    );
  }
}
export default LandingSection;
