import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FETCH } from "hey-mocks";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import { Dialog, Close } from "hey-components/loginComponents";
import { CardElement, injectStripe } from "react-stripe-elements";
import { TouchableOpacity, HeyIcon, UserPicture } from "hey-components";

const currencyLetter = {
  EUR: "€",
  USD: "$",
  GBP: "£"
};
const TitleContainer = styled.div`
  padding-top: 50px;
  text-align: center;
  word-break: break-word;
  font-family: Dosis;
  font-style: normal;
  color: #000000;
  & h1 {
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 22px;
  }
  & p {
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    mix-blend-mode: normal;
    opacity: 0.35;
    display: inline;
  }
  & p.name {
    text-transform: uppercase;
  }
`;
const Footer = styled.div`
  margin-top: 20px;
  font-family: Dosis;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  color: #969eac;
  & a {
    color: #989fab;
    font-weight: bold;
  }
`;
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  & p {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 22px;
    color: #50aff0;
    margin: 0 20px;
  }
`;
const UserImage = styled.div`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  position: absolute;
  border-radius: 50%;
  left: ${props => `calc(50% - ${props.size / 2}px)`};
  top: ${props => `-${props.size / 2}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #cbc7c7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.0804178);
`;
const StripeDivider = styled.div`
  border: 1px solid #e8e8e8;
  height: 1px;
  width: 100%;
`;
class StripeDialog extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {};
  }

  async submit(ev) {
    this.props.stripe
      .createToken({
        name: this.props.userInfo._id
      })
      .then(_data => {
        console.log("_token", _data);
        if (_data && _data.token && _data.token.id) {
          FETCH("POST /v1/me/billing", {
            json: true,
            token: this.props.token,
            body: JSON.stringify({
              token: _data.token.id
            })
          }).then(r => {
            console.log("----add credit card----", r);
            this.props.onComplete();
          });
        } else {
          // display stripe error
        }
      });
  }

  onClose = () => {
    const { modalClose } = this.props;
    modalClose();
  };

  render() {
    const { visibleModal, t, pageInfo } = this.props;
    return (
      <React.Fragment>
        <Dialog
          size={"tiny"}
          open={visibleModal}
          onKeyDown={this.keyPress}
          onClose={this.onClose}
          style={{ maxWidth: 450 }}
        >
          <Modal.Content>
            <Close className="rect" onClick={this.onClose}>
              <HeyIcon name="close_sub" />
            </Close>
            <UserImage size={114}>
              <UserPicture user={pageInfo.owner} size={90} />
            </UserImage>

            <TitleContainer>
              <h1>{pageInfo.name}</h1>
              <p>by </p>
              <p className="name">{pageInfo.owner.name}</p>
            </TitleContainer>

            <PriceContainer>
              <StripeDivider />
              <p>
                {currencyLetter[pageInfo.levels[0].currency]}
                {pageInfo.levels[0].amount / 100}
              </p>
              <StripeDivider />
            </PriceContainer>
            <div className="checkout">
              <div
                style={{
                  border: "1px solid #50AFF0",
                  background: "#F3F8FC",
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 20
                }}
              >
                <CardElement
                  hidePostalCode={true}
                  style={{
                    base: {
                      color: "#303238",
                      fontSize: "16px",
                      fontFamily: "Dosis",
                      fontWeight: "bold",
                      fontSmoothing: "antialiased",
                      "::placeholder": {
                        color: "#CFD7DF"
                      }
                    },
                    invalid: {
                      color: "#e5424d",
                      ":focus": {
                        color: "#303238"
                      }
                    }
                  }}
                />
              </div>
              <TouchableOpacity
                onClick={this.submit}
                customStyle={"focus"}
                style={{ width: "100%" }}
              >
                Add card
              </TouchableOpacity>
            </div>
            <Footer>
              Powered by{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe
              </a>
            </Footer>
          </Modal.Content>
        </Dialog>
      </React.Fragment>
    );
  }
}

StripeDialog.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  pageInfo: PropTypes.object
};

function mapStateToProps(state) {
  const { isAuthenticated, token } = state.authentication;
  const { me } = state.user;
  return {
    isAuthenticated,
    token,
    userInfo: me
  };
}

export default injectStripe(
  connect(mapStateToProps)(withNamespaces()(StripeDialog))
);
