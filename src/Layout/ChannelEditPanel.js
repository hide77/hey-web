import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import {
  HeyIcon,
  FlexInline,
  Text,
  InputBox,
  TouchableOpacity
} from "hey-components";
const PanelContainer = styled.div`
  background: white;
  width: 100%;
  padding: 6px 6px;
  height: 80px;
`;
const EditFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  margin-bottom: 10px;
`;
class ChannelEditPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      name_Invalid: false
    };
  }
  onAddClick = () => {
    const { onAdd } = this.props;
    const { name } = this.state;
    if (!this.validate()) return;
    onAdd(name);
    this.setState({ name: "" });
  };
  validate = () => {
    var valid = true;
    const { name } = this.state;
    if (name.trim() === "") {
      this.setState({ name_Invalid: true });
      valid = false;
    }
    return valid;
  };
  editChange = e => {
    this.setState({ name: e.target.value, name_Invalid: false });
  };
  render() {
    const { name, name_Invalid } = this.state;
    const { t } = this.props;
    return (
      <PanelContainer>
        <EditFlex>
          <div>
            <HeyIcon name={"checkbox_hamburger"} />
          </div>
          <InputBox
            placeholder="Type Channel name"
            style={{
              width: "100%",
              marginLeft: 10,
              marginRight: 10,
              height: 43
            }}
            value={name}
            onChange={e => this.editChange(e)}
            inValid={name_Invalid}
          />
          <TouchableOpacity customStyle={"focus"} onClick={this.onAddClick}>
            {t("btn.ok")}
          </TouchableOpacity>
        </EditFlex>
      </PanelContainer>
    );
  }
}

ChannelEditPanel.propTypes = {
  onAdd: PropTypes.func
};

export default withNamespaces()(ChannelEditPanel);
