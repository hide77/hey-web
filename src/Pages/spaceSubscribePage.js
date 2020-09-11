import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { LoadingPage } from "hey-pages";
import { idx, STRIPE_PUBLIC_KEY, FETCH } from "hey-mocks";
import { STYLE_CONFIG } from "hey-config";
import { withNamespaces } from "react-i18next";
import {
  HeyIcon,
  Header3,
  FlexInline,
  TouchableOpacity,
  PageContainer,
  UserPicture,
  StripeDialog
} from "hey-components";
import { Elements, StripeProvider } from "react-stripe-elements";
import { subscribeToPage, getPage } from "hey-actions/page";
import { setCreditWithStripe } from "hey-actions/user";
import { hasAccessToSpace, isSpaceFree } from "hey-services/Space";
const cardUIConfig = {
  headerHeight: 180,
  userPictureSize: 140
};
const CardContainer = styled.div`
  position: relative;
  max-width: 454px;
  margin: 0 auto;
  margin-top: 150px;
`;
const ImageContainer = styled.div`
  background: ${props => (props.img ? `url(${props.img})` : "#EFF2F3")};
  border-radius: 7px 7px 0px 0px;
  width: 100%;
  height: ${cardUIConfig.headerHeight}px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
  background-position-x: center;
`;
const Content = styled.div`
  background: #ffffff;
  box-shadow: 1px 2px 18px rgba(33, 30, 56, 0.0923913);
  width: 100%;
  border-radius: 0 0 7px 7px;
  padding: ${cardUIConfig.userPictureSize / 2 + 10}px 35px 30px 35px;
  word-break: break-word;
  text-align: center;
  & p {
    font-family: Dosis;
    font-style: normal;
    margin: 0;
  }
  & p.name {
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    color: #6b727f;
    margin-top: 15px;
  }
  & h1 {
    font-family: Dosis;
    font-style: normal;
    font-weight: 700;
    font-size: 23.9563px;
    line-height: 26px;
    text-align: center;
    color: #1d2128;
    margin: 0;
    margin-top: 5px;
  }
  & p.description {
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    color: #7b7b7b;
    text-align: left;
    margin-top: 30px;
  }
  & p.subscribe {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #969eac;
  }
  & p.price {
    font-weight: 700;
    font-size: 21px;
    line-height: 27px;
    text-align: center;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    color: #6b727f;
    margin-top: 30px;
  }
  & button {
    width: 150px;
    margin-top: 20px;
  }
`;

const currencyLetter = {
  EUR: "€",
  USD: "$",
  GBP: "£"
};

class SpaceSubscribePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripeModalVisible: false,
      refreshedCard: false,
      expiredCard: false
    };
  }
  onToken = token => {
    const { dispatch, match, history } = this.props;
    var pageID = match.params.pageID;
    dispatch(setCreditWithStripe(token))
      .then(() => {
        dispatch(subscribeToPage(pageID)).then(result => {
          if (result) {
            history.push(`/subscribe/pages`);
          }
        });
      })
      .catch(() => {
        console.log("onToken error");
      });
  };
  getCurrentPage() {
    const { all_pages, match } = this.props;
    var pageID = match.params.pageID;
    const curPage = all_pages.find(item => item.id === pageID);
    return curPage;
  }
  goTo(url) {
    const { history } = this.props;
    history.push(url);
  }
  onModalClose = () => {
    this.setState({ stripeModalVisible: false });
  };
  onStripeSubmit = () => {
    console.log("stripe submit");
    this.setState(
      { stripeModalVisible: false, refreshedCard: true, expiredCard: false },
      this.checkUserCreditCard
    );
  };
  onOpen = () => {
    const { dispatch, match, history, isPageSubscribing } = this.props;
    var pageID = match.params.pageID;
    if (isPageSubscribing) return;
    dispatch(subscribeToPage(pageID))
      .then(() => {
        history.push(`/subscribe/pages`);
      })
      .catch(error => {
        console.log("subscribe error:", error);
      });
  };
  checkUserCreditCard = () => {
    console.log("user info", this.props.userInfo);
    if (
      (this.props.userInfo.stripe_id || this.state.refreshedCard) &&
      !this.state.expiredCard
    ) {
      const { match } = this.props;
      var pageID = match.params.pageID;
      console.log("stripe id: ", this.props.userInfo.stripe_id);
      FETCH(`POST /v1/givers/pages/${pageID}/subscribe`, {
        token: this.props.authentication.token
      }).then(r => {
        console.log("----subscribe to paid space----", r);
        if (r.success) {
          this.onMember();
        } else {
          this.setState(
            { refreshedCard: false, expiredCard: true },
            this.checkUserCreditCard
          );
        }
      });
    } else {
      this.setState({ stripeModalVisible: true });
    }
  };
  onMember = () => {
    const { dispatch } = this.props;
    var pageID = this.props.match.params.pageID;
    dispatch(getPage(pageID));
    this.props.history.push(`/subscribe/pages`);
  };
  render() {
    const {
      userInfo,
      authentication,
      all_pages,
      match,
      t,
      onLogin,
      isPageSubscribing
    } = this.props;
    const { stripeModalVisible } = this.state;
    if (all_pages.length === 0) {
      return <LoadingPage />;
    }
    let curPage = this.getCurrentPage();
    let stripe_picture = idx(
      ["owner", "pictures", "default"],
      curPage,
      idx(["pictures", "default"], curPage, null)
    );
    stripe_picture =
      stripe_picture && stripe_picture.indexOf("http") === 0
        ? stripe_picture
        : `https://${stripe_picture}`;
    if (curPage == null) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <PageContainer>
        {isPageSubscribing && <LoadingPage />}
        <CardContainer>
          <ImageContainer img={idx(["pictures", "default"], curPage)} />
          <UserPicture
            user={curPage.owner}
            size={cardUIConfig.userPictureSize}
            superStyle={{
              borderRadius: "50%",
              boxShadow: "0px 2px 15px rgba(33, 30, 56, 0.0923913)",
              position: "absolute",
              top: cardUIConfig.headerHeight - cardUIConfig.userPictureSize / 2,
              left: `calc(50% - ${cardUIConfig.userPictureSize / 2}px)`
            }}
          />
          <Content>
            <p className="name">{curPage.owner.name}</p>
            <h1>{curPage.name}</h1>
            <p className="description">{curPage.description}</p>
            <FlexInline style={{ justifyContent: "center", marginTop: 15 }}>
              <HeyIcon name="subscrib_filled_red" />
              <Header3 color="#E95751" style={{ paddingLeft: 6 }}>
                {curPage.nb_hearts}
              </Header3>
            </FlexInline>
            <p className="subscribe">
              {t("space.subscribers", { count: curPage.nb_users })}
            </p>
            <p className="price">
              {isSpaceFree(curPage)
                ? t("stripe.open")
                : t("stripe.monthly", {
                    amount: curPage.levels[0].amount / 100,
                    currency: currencyLetter[curPage.levels[0].currency]
                  })}
            </p>
            {authentication.isAuthenticated ? (
              hasAccessToSpace(curPage) ? (
                <TouchableOpacity customStyle={"focus"} onClick={this.onMember}>
                  {t("space.open")}
                </TouchableOpacity>
              ) : isSpaceFree(curPage) ? (
                <TouchableOpacity customStyle={"focus"} onClick={this.onOpen}>
                  {t("stripe.subscribe_btn")}
                </TouchableOpacity>
              ) : (
                // <Stripe
                //   name={curPage.name}
                //   authToken={authentication.token}
                //   currency={"EUR"}
                //   onToken={this.onToken}
                //   email={userInfo && userInfo.email}
                //   label={t("stripe.subscribe_btn")}
                //   description={t("stripe.subscribe_description")}
                //   panelLabel={t("stripe.subscribe_modal_btn")}
                //   amount={curPage.levels[0].amount}
                //   image={stripe_picture}
                // />
                <div>
                  <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                    <Elements>
                      <StripeDialog
                        visibleModal={stripeModalVisible}
                        modalClose={this.onModalClose}
                        onComplete={this.onStripeSubmit}
                        pageInfo={curPage}
                      />
                    </Elements>
                  </StripeProvider>
                  <TouchableOpacity
                    customStyle={"danger"}
                    onClick={this.checkUserCreditCard}
                  >
                    {t("stripe.subscribe_btn")}
                  </TouchableOpacity>
                </div>
              )
            ) : (
              <TouchableOpacity customStyle={"danger"} onClick={onLogin}>
                {t("stripe.connect_subscribe")}
              </TouchableOpacity>
            )}
          </Content>
        </CardContainer>
      </PageContainer>
    );
  }
}

SpaceSubscribePage.propTypes = {
  all_pages: PropTypes.array,
  match: PropTypes.object,
  userInfo: PropTypes.object,
  history: PropTypes.object,
  authentication: PropTypes.object,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  onLogin: PropTypes.func,
  isPageSubscribing: PropTypes.bool
};
function mapStateToProps(state) {
  const { all_pages, isPageSubscribing } = state.page;
  const { me } = state.user;
  const authentication = state.authentication;
  return {
    all_pages,
    userInfo: me,
    authentication,
    isPageSubscribing
  };
}
export default connect(mapStateToProps)(withNamespaces()(SpaceSubscribePage));
