import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import { Text, FlexInline, TouchableOpacity } from "hey-components";

const ResultContainer = styled.div`
  background: #f1f6fa;
  border: 1px solid #a2d6fa;
  box-sizing: border-box;
  border-radius: 6px;
  max-width: 880px;
  margin: 0 auto;
  padding: 30px 35px;
  & button:first-child {
    width: 190px;
    margin-right: 10px;
    margin-top: 20px;
  }
  & button:last-child {
    width: 125px;
    margin-top: 20px;
  }
`;
class NoResultComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isAuthenticated, handleBtn1, handleBtn2, t } = this.props;
    return (
      <React.Fragment>
        <ResultContainer>
          <Text fontSize="25px" fontWeight="700" active={true}>
            {t("homePage.no_result_title")}
          </Text>
          <Text
            fontSize="23px"
            fontWeight="normal"
            color="#6B727F"
            style={{ marginTop: 22 }}
          >
            {t("homePage.no_result_content")}
          </Text>
          {!isAuthenticated && (
            <React.Fragment>
              <Text
                fontSize="23px"
                fontWeight="normal"
                color="#6B727F"
                style={{ marginTop: 22 }}
              >
                {t("homePage.no_result_content_visitor")}
              </Text>
              <FlexInline style={{ justifyContent: "center" }}>
                <TouchableOpacity customStyle="focus" onClick={handleBtn1}>
                  {t("homePage.no_result_register")}
                </TouchableOpacity>
                <TouchableOpacity customStyle="login" onClick={handleBtn2}>
                  {t("homePage.no_result_login")}
                </TouchableOpacity>
              </FlexInline>
            </React.Fragment>
          )}
        </ResultContainer>
      </React.Fragment>
    );
  }
}

NoResultComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleBtn1: PropTypes.func.isRequired,
  handleBtn2: PropTypes.func.isRequired
};

export default withNamespaces()(NoResultComponent);
