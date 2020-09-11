import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { registerUser } from "hey-actions/authentication";
import { Modal, Divider } from "semantic-ui-react";
import { FlexInline, Text, Header2 } from "hey-components";
import { withNamespaces } from "react-i18next";
import {
  LoginInput,
  Dialog,
  TextButton,
  Submit,
  FullContainer,
  BottomText,
  ErrorMessage
} from "hey-components/loginComponents";

class RegisterPage extends Component {
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
      );
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
  render() {
    const { isLoading, isAuthenticated, error } = this.props;
    const {
      first_name_valid,
      last_name_valid,
      username_valid,
      email_valid,
      password_valid
    } = this.state;
    console.log("--error---", error);
    return isAuthenticated ? (
      <Redirect to={{ pathname: "/subscribe", state: {} }} />
    ) : (
      <FullContainer>
        <Dialog
          size={"tiny"}
          open={true}
          style={{
            cursor: isLoading ? "progress" : ""
          }}
          onKeyDown={this.keyPress}
        >
          <Modal.Content>
            <Header2 color="#3c3c3c" style={{ fontSize: "22px" }}>
              Sign up
            </Header2>
            {!isLoading && error && <ErrorMessage>*{error}</ErrorMessage>}
            <LoginInput
              placeholder="First Name"
              name="first_name"
              onChange={this.onChangeInput}
              inValid={first_name_valid}
            />
            <LoginInput
              placeholder="Last Name"
              name="last_name"
              onChange={this.onChangeInput}
              inValid={last_name_valid}
            />
            <LoginInput
              placeholder="Username"
              name="username"
              onChange={this.onChangeInput}
              inValid={username_valid}
            />
            <LoginInput
              placeholder="Email"
              name="email"
              onChange={this.onChangeInput}
              inValid={email_valid}
            />
            <LoginInput
              placeholder="Password"
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
              {t("Sign up")}
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
                By signing up to Hey, you agree to our <strong>Terms</strong>{" "}
                and <strong>Privacy Policy</strong>.
              </Text>
              <FlexInline style={{ justifyContent: "center" }}>
                <BottomText>{`Already have an account?`}</BottomText>
                <Link to="/login">
                  <TextButton style={{ paddingLeft: "18px" }}>
                    {t("Log in")}Log in
                  </TextButton>
                </Link>
              </FlexInline>
            </Modal.Content>
          </Modal.Content>
        </Dialog>
      </FullContainer>
    );
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
  // error: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { isLoading, isAuthenticated, error } = state.authentication;
  return {
    isLoading,
    isAuthenticated,
    error
  };
}

export default connect(mapStateToProps)(withNamespaces()(RegisterPage));

// export default connect(
//   state => state,
//   { loginUser, registerUser, resetPassword }
// )(LoginPage);
