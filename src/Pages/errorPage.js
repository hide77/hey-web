import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Segment } from "semantic-ui-react";
import { Header1 } from "hey-components";

const Section = styled.div`
  padding-top: 17px;
  padding-bottom: 17px;
`;

const ErrorPage = () => (
  <Segment>
    <Section>
      <Header1>404 Not Found</Header1>
    </Section>
  </Segment>
);

ErrorPage.propTypes = {
  children: PropTypes.node
};

export default ErrorPage;
