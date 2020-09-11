import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import { Segment } from "semantic-ui-react";

import { Text, Header1, PageContainer } from "hey-components";
import {
  LoginInput,
  Submit,
  ErrorMessage
} from "hey-components/loginComponents";

import { createPage } from "hey-actions/page";

const Content = styled(Text)`
  line-height: 29px;
  padding-bottom: 22px;
`;

const Section = styled.div`
  padding-top: 17px;
  padding-bottom: 17px;
`;

const Form = styled.div`
  & {
    width: 100%;
  }
`;

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      small_description: "",
      name_valid: false,
      description_valid: false,
      small_description_valid: false
    };
  }
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "_valid"]: false
    });
  };
  onSubmit = () => {
    const { name, description, small_description } = this.state;
    const { dispatch } = this.props;
    if (this.validate()) {
      dispatch(
        createPage({
          name,
          description,
          small_description
        })
      ).then(() => {
        this.setState({ name: "", description: "", small_description: "" });
      });
    }
  };
  validate = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return false;
    }
    const { name, description, small_description } = this.state;
    var valid = true;
    if (name === "") {
      this.setState({ name_valid: true });
      valid = false;
    }
    if (description === "") {
      this.setState({ description_valid: true });
      valid = false;
    }
    if (small_description === "") {
      this.setState({ small_description_valid: true });
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
    const {
      name_valid,
      description_valid,
      small_description_valid,
      name,
      description,
      small_description
    } = this.state;
    const { isLoading, isCreated, error } = this.props;
    return (
      <PageContainer
        style={{
          cursor: isLoading ? "progress" : ""
        }}
      >
        <Section>
          <Header1 color="#3c3c3c">You have a talent,</Header1>
          <Header1 color="#3c3c3c">You deserve to get paid.</Header1>
          <Content>Create your page</Content>
        </Section>
        <Form onKeyDown={this.keyPress}>
          {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginInput
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.onChangeInput}
            inValid={name_valid}
          />
          <LoginInput
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.onChangeInput}
            inValid={description_valid}
          />
          <LoginInput
            placeholder="Small Description"
            name="small_description"
            value={small_description}
            onChange={this.onChangeInput}
            inValid={small_description_valid}
          />
          <Submit customStyle="focus" onClick={this.onSubmit}>
            Create your Page
          </Submit>
        </Form>
      </PageContainer>
    );
  }
}

CreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  error: PropTypes.string
};

function mapStateToProps(state) {
  const { isPageCreating, isPageCreated, error } = state.page;
  return {
    isLoading,
    isCreated,
    error
  };
}

export default connect(mapStateToProps)(CreatePage);
