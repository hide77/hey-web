import React, { Component } from "react";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";

import _ from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";
import { STYLE_CONFIG } from "hey-config";
import { Container, Image, Input, Icon } from "semantic-ui-react";

import { searchPage } from "hey-actions/page";
import {
  setLoginModalVisible,
  setRegisterModalVisible,
  setSpaceSearched
} from "hey-actions/global";
import {
  UserCard,
  GreyButton,
  NoResultComponent,
  Text,
  FlexInline
} from "hey-components";
import Slack from "hey-services/Slack";
import { idx } from "hey-mocks";
import { LoadingPage } from "hey-pages";
import logo_header from "hey-assets/images/logo.png";
import { hasAccessToSpace, isSpaceFree } from "hey-services/Space";
import { setActivePageId } from "hey-actions/page";
import UIfx from "uifx";
import snd_tic from "hey-snd/tic.mp3";
import snd_click from "hey-snd/Klick.mp3";

const $_click = new UIfx(snd_click, {
  volume: 0.3,
  throttleMs: 0
});

const SearchBox = styled(Input)`
  &.ui.icon.input > i.icon {
    left: 10px;
    font-size: ${props => (props.searched ? "16px" : "20px")};
    color: #c5cddc;
    top: 1px;
  }
  &.ui.input {
    width: ${props => (props.searched ? "550px" : "760px")};
  }
  &.ui.input > input {
    border: none;
    border-radius: 40px;
    background: #ffffff;
    box-sizing: border-box;
    padding: 12px 14px;
    font-family: Dosis;
    font-weight: 500;
    font-size: ${props => (props.searched ? "19px" : "24px")};
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;

    color: #bdc3ce;
    margin: ${props => (props.searched ? "25px" : "20px")} 0;
    color: #2f2f2f;
    box-shadow: 0px 2px 8px rgba(31, 46, 116, 0.180565);
  }
  @media (max-width: 768px) {
    &.ui.input {
      width: 100%;
    }
  }
`;
const LandingPageContainer = styled.div`
  & {
    width: 100%;
    overflow: ${props => (props.hideOverflow ? "hidden" : "visible")};
    padding-top: ${props => (props.searched ? "0" : "100px")};
    padding-bottom: 50px;
  }
`;
const FlexCenter = styled.div`
  & {
    display: flex;
    justify-content: center;
  }
`;
const SearchedInputContnainer = styled.div`
  border-bottom: 1px solid #c5cddc;
`;
const MansoryFlexBox = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;

  @media only screen and (max-width: 497px) {
    display: block;
    & > div {
      width: 80%;
      margin-top: 12px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media only screen and (min-width: 498px) and (max-width: 779px) {
    & > div {
      width: calc(50% - 24px);
      margin: 12px;
    }
    & > div:nth-of-type(even) {
      margin-top: 48px;
    }
    & > div:nth-of-type(odd) {
      margin-bottom: 48px;
    }
  }

  @media only screen and (min-width: 780px) and (max-width: 991px) {
    & > div {
      width: calc(33.333% - 24px);
      margin: 12px;
    }
    & > div:nth-of-type(3n + 2) {
      margin-top: 48px;
    }
    & > div:nth-of-type(3n + 1),
    & > div:nth-of-type(3n + 3) {
      margin-bottom: 48px;
    }
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    & > div {
      width: calc(25% - 24px);
      margin: 12px;
    }
    & > div:nth-of-type(even) {
      margin-top: 48px;
    }
    & > div:nth-of-type(odd) {
      margin-bottom: 48px;
    }
  }

  @media only screen and (min-width: 1200px) and (max-width: 1439px) {
    & > div {
      width: calc(20% - 24px);
      margin: 12px;
    }
    & > div:nth-of-type(5n + 2),
    & > div:nth-of-type(5n + 4) {
      margin-top: 48px;
    }
    & > div:nth-of-type(5n + 5),
    & > div:nth-of-type(5n + 1),
    & > div:nth-of-type(5n + 3) {
      margin-bottom: 48px;
    }
  }

  @media only screen and (min-width: 1440px) {
    & > div {
      width: calc(16.666% - 24px);
      margin: 12px;
    }
    & > div:nth-of-type(even) {
      margin-top: 48px;
    }
    & > div:nth-of-type(odd) {
      margin-bottom: 48px;
    }
  }
`;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: ""
    };
    this.flexboxWidth = null;
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setSpaceSearched(false));
    dispatch(searchPage());
  }
  onLogin = () => {
    const { dispatch } = this.props;
    dispatch(setLoginModalVisible());
  };
  onRegister = () => {
    const { dispatch } = this.props;
    dispatch(setRegisterModalVisible());
  };
  onCardClick = space => {
    const { history, dispatch } = this.props;
    $_click.play();
    // setTimeout(function() {
    //   history.push(url);
    // }, 100);
    if (hasAccessToSpace(space)) {
      dispatch(setActivePageId(space.id));
      history.push(`/subscribe/pages`);
    } else {
      history.push("/space/" + space.id);
    }
  };
  onClickItem = url => {
    $_click.play();
    const { history } = this.props;
    setTimeout(function() {
      history.push(url);
    }, 500);
  };
  onSearch = () => {
    const {
      isPageGetting,
      dispatch,
      userInfo,
      token,
      isAuthenticated,
      searched
    } = this.props;
    const { searchKeyword } = this.state;
    if (!searched) dispatch(setSpaceSearched(true));
    if (isPageGetting) {
      return;
    }
    // this.searchInputRef.blur();
    dispatch(searchPage(searchKeyword));
    if (isAuthenticated) Slack({ data: searchKeyword, token, user: userInfo });
  };
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onSearch();
    }
  };
  render() {
    const {
      t,
      isAuthenticated,
      userInfo,
      pages,
      isPageGetting,
      history,
      searched
    } = this.props;
    const { searchKeyword } = this.state;
    if (isAuthenticated && !userInfo) {
      return <LoadingPage />;
    }
    return (
      <LandingPageContainer
        hideOverflow={pages.length === 0 && isPageGetting}
        searched={searched}
      >
        {!searched && (
          <Container>
            <FlexCenter>
              <Image src={logo_header} width="170" />
            </FlexCenter>
            <FlexCenter style={{ marginTop: 30 }}>
              <SearchBox icon iconPosition="left" onKeyDown={this.keyPress}>
                <Icon name="search" />
                <input
                  placeholder={t("homePage.search_placeholder")}
                  onChange={e =>
                    this.setState({ searchKeyword: e.target.value })
                  }
                  value={searchKeyword}
                  ref={e => (this.searchInputRef = e)}
                />
              </SearchBox>
            </FlexCenter>
            <FlexCenter>
              <GreyButton
                style={{ margin: "20px" }}
                onClick={this.onSearch}
                disabled={isPageGetting}
              >
                {t("homePage.search")}
              </GreyButton>
              <GreyButton style={{ margin: "20px" }}>
                {t("homePage.surprise")}
              </GreyButton>
            </FlexCenter>
            <FlexCenter style={{ textAlign: "center" }}>
              <Text
                active
                fontSize="18px"
                fontWeight="bold"
                style={{ maxWidth: 400, cursor: "pointer" }}
                onClick={() => history.push("/sensei")}
              >
                You have a talent? Share it with the world and start your
                community now.
              </Text>
            </FlexCenter>
          </Container>
        )}
        {searched && (
          <SearchedInputContnainer>
            <FlexInline
              style={{
                marginTop: 30,
                width: "80%",
                margin: "0 auto",
                flexWrap: "unset"
              }}
            >
              <SearchBox
                icon
                iconPosition="left"
                onKeyDown={this.keyPress}
                searched={searched.toString()}
              >
                <Icon name="search" />
                <input
                  placeholder={t("homePage.search_placeholder")}
                  value={searchKeyword}
                  onChange={e =>
                    this.setState({ searchKeyword: e.target.value })
                  }
                  ref={e => (this.searchInputRef = e)}
                />
              </SearchBox>
              <GreyButton
                style={{
                  margin: "25px",
                  borderRadius: 25,
                  height: 47,
                  minWidth: 150
                }}
                fontSize="20px"
                onClick={this.onSearch}
                disabled={isPageGetting}
              >
                {t("homePage.search")}
              </GreyButton>
            </FlexInline>
          </SearchedInputContnainer>
        )}

        {pages.length === 0 && !isPageGetting && (
          <Container style={{ marginTop: 40 }}>
            <NoResultComponent
              isAuthenticated={isAuthenticated}
              handleBtn1={this.onRegister}
              handleBtn2={this.onLogin}
            />
          </Container>
        )}
        <MansoryFlexBox
          ref={ref => {
            this.flexboxWidth = ref;
          }}
        >
          {pages.length > 0 &&
            pages.map((item, key) => (
              <UserCard
                key={key}
                title={item.name}
                userInfo={item.owner}
                backImage={idx(["pictures", "default"], item)}
                onClick={() => this.onCardClick(item)}
              />
            ))}
          {pages.length === 0 &&
            isPageGetting &&
            _.times(12, key => <UserCard key={key} isLoading />)}
        </MansoryFlexBox>
      </LandingPageContainer>
    );
  }
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,
  pages: PropTypes.array,
  subscribed_pages: PropTypes.array,
  dispatch: PropTypes.func,
  isPageGetting: PropTypes.bool,
  token: PropTypes.string,
  searched: PropTypes.bool
};
function mapStateToProps(state) {
  const { isAuthenticated, token } = state.authentication;
  const { me } = state.user;
  const { search_pages, subscribed_pages, isSearchPageGetting } = state.page;
  const { space_searched } = state.global;
  return {
    isAuthenticated,
    token,
    subscribed_pages,
    userInfo: me,
    pages: search_pages,
    isPageGetting: isSearchPageGetting,
    searched: space_searched
  };
}
export default connect(mapStateToProps)(withNamespaces()(LandingPage));
