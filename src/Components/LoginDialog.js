import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { FETCH } from "hey-mocks";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Divider, Grid, Image } from "semantic-ui-react";
import { loginUser, resetErrors } from "hey-actions/authentication";
import { resetPassword } from "hey-actions/user";
import { getAllPages, getSubscribedPages } from "hey-actions/page";
import {
  setLoginModalInVisible,
  setRegisterModalVisible
} from "hey-actions/global";
import { LoadingPage } from "hey-pages";
import { FlexInline, Text, Header2, HeyIcon } from "hey-components";
import {
  LoginInput,
  Dialog,
  TextButton,
  Submit,
  SocialButton,
  BottomText,
  ErrorMessage,
  Close
} from "hey-components/loginComponents";
import google from "hey-assets/images/icons8-google-100.png";

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email_valid: false,
      password_valid: false
    };
  }
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "_valid"]: false
    });
  };
  onForgotPassword = () => {
    const { email } = this.state;
    var value = prompt(
      "It's all good, don't worry! We'll send you an email to reset your password.",
      email
    );
    if (value === null || value.trim() === "") return;

    FETCH("POST /v1/password/reset", {
      json: true,
      body: JSON.stringify({ email: value })
    });
    alert(
      `We just sent you an email (If you don't receive it, check your spam folder. That happens sometimes..)`
    );
  };
  onSubmit = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return;
    }
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (this.validate()) {
      dispatch(loginUser({ email, password }))
        .then(() => {
          window.location.reload();
          // dispatch(getAllPages());
          // dispatch(getSubscribedPages());
          this.onClose();
        })
        .catch(() => {});
    }
  };
  validate = () => {
    const { email, password } = this.state;
    var valid = true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,99}$/i.test(email)) {
      this.setState({ email_valid: true });
      valid = false;
    }
    if (password === "") {
      this.setState({ password_valid: true });
      valid = false;
    }
    return valid;
  };
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onSubmit();
    }
  };
  onClose = () => {
    const { dispatch } = this.props;
    this.setState({ email_valid: false, password_valid: false });
    dispatch(resetErrors());
    dispatch(setLoginModalInVisible());
  };
  onLink = () => {
    const { dispatch } = this.props;
    dispatch(setRegisterModalVisible());
  };
  render() {
    const { isLoading, error, visibleModal, t } = this.props;
    const { email_valid, password_valid } = this.state;
    return (
      <React.Fragment>
        {isLoading && <LoadingPage />}
        <Dialog
          size={"tiny"}
          open={visibleModal}
          style={{
            cursor: isLoading ? "progress" : ""
          }}
          onKeyDown={this.keyPress}
          onClose={this.onClose}
        >
          <Modal.Content>
            <Close className="circle" onClick={this.onClose}>
              <HeyIcon name="close_sub" />
            </Close>

            <Header2 color="#3c3c3c" style={{ fontSize: "22px" }}>
              {t("authPage.login_title")}
            </Header2>
            {!isLoading && error && <ErrorMessage>*Login failed</ErrorMessage>}
            <LoginInput
              placeholder={t("authPage.email")}
              name="email"
              onChange={this.onChangeInput}
              inValid={email_valid}
            />
            <LoginInput
              placeholder={t("authPage.password")}
              type="password"
              name="password"
              onChange={this.onChangeInput}
              inValid={password_valid}
            />
            <TextButton onClick={this.onForgotPassword}>
              {t("authPage.forgot")}
            </TextButton>
            <Submit customStyle="focus" onClick={this.onSubmit}>
              {t("authPage.login_button")}
            </Submit>
          </Modal.Content>
          {/*<Divider />*/}
          <Modal.Content>
            {/*<Grid container stackable>
              <Grid.Row>
                <Grid.Column width={8} stretched>
                  <SocialButton>
                    <Icon
                      name="facebook f"
                      size="large"
                      style={{ color: "#3b5a98" }}
                    />
                    <span>facebook</span>
                  </SocialButton>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <SocialButton>
                    <Image
                      src={google}
                      style={{
                        marginRight: 8,
                        height: "29px",
                        width: "auto"
                      }}
                    />
                    <span>google</span>
                  </SocialButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>*/}
            <Modal.Content>
              <Text
                color="#AFAFAF"
                fontSize="14px"
                fontWeight="500"
                style={{
                  letterSpacing: 0.9337,
                  textAlign: "center",
                  marginTop: "30px"
                }}
              >
                {t("authPage.terms")}
              </Text>
              <FlexInline style={{ justifyContent: "center" }}>
                <BottomText>{t("authPage.no_account")}</BottomText>
                <TextButton
                  style={{ paddingLeft: "18px" }}
                  onClick={this.onLink}
                >
                  {t("authPage.register")}
                </TextButton>
              </FlexInline>
            </Modal.Content>
          </Modal.Content>
        </Dialog>
      </React.Fragment>
    );
  }
}

LoginDialog.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string
};

function mapStateToProps(state) {
  const { isLoading, isAuthenticated, error } = state.authentication;
  const { loginVisible } = state.global;
  return {
    isLoading,
    isAuthenticated,
    error,
    visibleModal: loginVisible
  };
}

export default connect(mapStateToProps)(withNamespaces()(LoginDialog));
