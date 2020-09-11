import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, resetErrors } from "hey-actions/authentication";
import {
  setLoginModalVisible,
  setRegisterModalInVisible
} from "hey-actions/global";
import { Modal, Divider } from "semantic-ui-react";
import { FlexInline, Text, Header2, HeyIcon } from "hey-components";
import { LoadingPage } from "hey-pages";
import {
  LoginInput,
  Dialog,
  TextButton,
  Submit,
  FullContainer,
  BottomText,
  ErrorMessage,
  Close
} from "hey-components/loginComponents";

class RegisterDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      referral: "",
      first_name_valid: false,
      last_name_valid: false,
      username_valid: false,
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
  onSubmit = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return;
    }
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      referral
    } = this.state;
    const { dispatch } = this.props;
    if (this.validate()) {
      dispatch(
        registerUser({
          first_name,
          last_name,
          email,
          username,
          password,
          referral
        })
      ).then(() => {
        this.onClose();
      });
    }
  };
  validate = () => {
    const { first_name, last_name, email, username, password } = this.state;
    var valid = true;
    if (first_name === "") {
      this.setState({ first_name_valid: true });
      valid = false;
    }
    if (last_name === "") {
      this.setState({ last_name_valid: true });
      valid = false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,99}$/i.test(email)) {
      this.setState({ email_valid: true });
      valid = false;
    }
    if (username === "") {
      this.setState({ username_valid: true });
      valid = false;
    }
    if (password === "") {
      this.setState({ password_valid: true });
      valid = false;
    }
    return valid;
  };
  keyPress = e => {
    if (e.key == "Enter") {
      this.onSubmit();
    }
  };
  onClose = () => {
    const { dispatch } = this.props;
    this.setState({
      first_name_valid: false,
      last_name_valid: false,
      username_valid: false,
      email_valid: false,
      password_valid: false
    });
    dispatch(resetErrors());
    dispatch(setRegisterModalInVisible());
  };
  onLink = () => {
    const { dispatch } = this.props;
    dispatch(setLoginModalVisible());
  };
  render() {
    const { isLoading, error, visibleModal, t } = this.props;
    const {
      first_name_valid,
      last_name_valid,
      username_valid,
      email_valid,
      password_valid
    } = this.state;
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
              {t("authPage.register_title")}
            </Header2>
            {!isLoading && error && <ErrorMessage>*{error}</ErrorMessage>}
            <LoginInput
              placeholder={t("authPage.firstname")}
              name="first_name"
              onChange={this.onChangeInput}
              inValid={first_name_valid}
            />
            <LoginInput
              placeholder={t("authPage.lastname")}
              name="last_name"
              onChange={this.onChangeInput}
              inValid={last_name_valid}
            />
            <LoginInput
              placeholder={t("authPage.username")}
              name="username"
              onChange={this.onChangeInput}
              inValid={username_valid}
            />
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
            {/*<LoginInput
              placeholder="Invitation Code (optional)"
              name="referral"
              onChange={this.onChangeInput}
            />*/}
            <Submit customStyle="focus" onClick={this.onSubmit}>
              {t("authPage.register_button")}
            </Submit>
          </Modal.Content>
          <Divider />
          <Modal.Content>
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
                <BottomText>{t("authPage.got_account")}</BottomText>
                <TextButton
                  style={{ paddingLeft: "18px" }}
                  onClick={this.onLink}
                >
                  {t("authPage.login")}
                </TextButton>
              </FlexInline>
            </Modal.Content>
          </Modal.Content>
        </Dialog>
      </React.Fragment>
    );
  }
}

RegisterDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  visibleModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { isLoading, isAuthenticated, error } = state.authentication;
  const { registerVisible } = state.global;
  return {
    isLoading,
    isAuthenticated,
    error,
    visibleModal: registerVisible
  };
}

export default connect(mapStateToProps)(withNamespaces()(RegisterDialog));
