import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Icon, Modal, Divider, Grid, Image } from "semantic-ui-react";
import { loginUser, resetPassword } from "hey-actions/authentication";

import { FlexInline, Text, Header2 } from "hey-components";
import {
  LoginInput,
  Dialog,
  TextButton,
  Submit,
  SocialButton,
  FullContainer,
  BottomText,
  ErrorMessage
} from "hey-components/loginComponents";
import google from "hey-assets/images/icons8-google-100.png";

class LoginPage extends Component {
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
  onSubmit = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return;
    }
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (this.validate()) {
      dispatch(loginUser({ email, password }));
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
  render() {
    const { isLoading, isAuthenticated, error } = this.props;
    const { email_valid, password_valid } = this.state;
    return isAuthenticated ? (
      <Redirect to={{ pathname: "/main/", state: {} }} />
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
              Log in
            </Header2>
            {!isLoading && error && <ErrorMessage>*Login failed</ErrorMessage>}
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
            <TextButton>Forgot Password ?</TextButton>
            <Submit customStyle="focus" onClick={this.onSubmit}>
              Log In
            </Submit>
          </Modal.Content>
          <Divider />
          <Modal.Content>
            <Grid container stackable>
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
            </Grid>
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
                By signing in to Hey, you agree to our <strong>Terms</strong>{" "}
                and <strong>Privacy Policy</strong>.
              </Text>
              <FlexInline style={{ justifyContent: "center" }}>
                <BottomText>{`Don't have an account?`}</BottomText>
                <Link to="/register">
                  <TextButton style={{ paddingLeft: "18px" }}>
                    Sign up
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

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
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

export default connect(mapStateToProps)(LoginPage);
