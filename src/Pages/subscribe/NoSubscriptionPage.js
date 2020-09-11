import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { idx } from "hey-mocks";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";

import { Text, Header1, PageContainer, TouchableOpacity } from "hey-components";

const Content = styled(Text)`
  line-height: 29px;
  padding-bottom: 22px;
  color: #7b7b7b;
`;

class NoSubscriptionPage extends Component {
  constructor(props) {
    super(props);
  }

  goHome = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { t } = this.props;
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        <Header1 color="#3c3c3c">{t("noSpacePage.title")}</Header1>
        <Content style={{ marginTop: 10 }}>{t("noSpacePage.subtitle")}</Content>
        <TouchableOpacity
          onClick={this.goHome}
          customStyle={"focus"}
          style={{ width: 500, maxWidth: "100%", marginTop: 30 }}
        >
          {t("noSpacePage.button")}
        </TouchableOpacity>
      </PageContainer>
    );
  }
}

NoSubscriptionPage.propTypes = {
  history: PropTypes.object
};

export default withNamespaces()(withRouter(NoSubscriptionPage));
