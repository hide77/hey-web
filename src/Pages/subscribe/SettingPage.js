import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  Text,
  Header1,
  Header3,
  HeyIcon,
  PageContainer,
  TouchableOpacity,
  FlexInline
} from "hey-components";
import { unSubscribeToPage } from "hey-actions/page";

const Content = styled(Text)`
  line-height: 29px;
  padding-bottom: 22px;
`;

const Section = styled.div`
  padding-top: 45px;
  padding-bottom: 25px;
`;
const CheckBox = styled.div`
  display: flex;
  width: max-content;
  align-items: center;
  padding-top: 5px;
  cursor: pointer;
`;
const BtnContainer = styled.div`
  & {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  & button {
    width: 148px;
  }
  & button:last-child {
    margin-left: 20px;
  }
  @media (max-width: 420px) {
    & {
      display: block;
    }
    & button {
      display: block;
    }
    & button:last-child {
      margin-left: 0px;
      margin-top: 20px;
    }
  }
`;
class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "mention"
    };
  }
  handleItemClick = name => {
    this.setState({ activeItem: name });
  };
  onUnsubscribe = () => {
    const { pageInfo, dispatch, history } = this.props;
    dispatch(unSubscribeToPage(pageInfo.id));
    history.push("/");
  };
  render() {
    const { activeItem } = this.state;
    return (
      <PageContainer>
        <Section>
          <Header1 color="#3c3c3c">Notifications</Header1>
          <Content>You can configure how you want to be notified.</Content>
          <CheckBox onClick={() => this.handleItemClick("mention")}>
            <HeyIcon name="checkbox_circle" active={activeItem === "mention"} />
            <Header3
              color="#3c3c3c"
              style={{
                textTransform: "unset",
                padding: 0,
                paddingLeft: "10px"
              }}
            >
              @ Mentions
            </Header3>
          </CheckBox>
          <CheckBox onClick={() => this.handleItemClick("post")}>
            <HeyIcon name="checkbox_circle" active={activeItem === "post"} />
            <Header3
              color="#3c3c3c"
              style={{
                textTransform: "unset",
                padding: 0,
                paddingLeft: "10px"
              }}
            >
              Creator's posts
            </Header3>
          </CheckBox>
          <CheckBox onClick={() => this.handleItemClick("every")}>
            <HeyIcon name="checkbox_circle" active={activeItem === "every"} />
            <Header3
              color="#3c3c3c"
              style={{
                textTransform: "unset",
                padding: 0,
                paddingLeft: "10px"
              }}
            >
              Everything
            </Header3>
          </CheckBox>
          <BtnContainer>
            <TouchableOpacity customStyle={"focus"}>Save</TouchableOpacity>
            <TouchableOpacity customStyle={"danger"}>Mute All</TouchableOpacity>
          </BtnContainer>
        </Section>
        <Section>
          <Header1 color="#3c3c3c">DANGER ZONE</Header1>
          <Content>Manage your subscription here</Content>
          <FlexInline style={{ marginTop: "20px" }}>
            <TouchableOpacity
              customStyle={"danger"}
              style={{ width: 148 }}
              onClick={this.onUnsubscribe}
            >
              Unsubscribe
            </TouchableOpacity>
          </FlexInline>
        </Section>
      </PageContainer>
    );
  }
}

SettingPage.propTypes = {
  pageInfo: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect()(SettingPage);
