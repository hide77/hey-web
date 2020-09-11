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
import { validate } from "@babel/types";
const PanelContainer = styled.div`
  background: white;
  width: 100%;
  padding: 6px 15px;
  height: 128px;
`;
const EditFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
class LibraryEditPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isfolder: false,
      name: "",
      name_Invalid: false
    };
  }
  onCheck = () => {
    this.setState(prev => ({ isfolder: !prev.isfolder }));
  };
  onAddClick = () => {
    const { onAdd, isOnlyArticle } = this.props;
    const { isfolder, name } = this.state;
    if (!this.validate()) return;
    console.log("adding");
    onAdd(name, isOnlyArticle ? false : isfolder);
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
    const { isfolder, name, name_Invalid } = this.state;
    const { isOnlyArticle, t } = this.props;
    console.log(name_Invalid);
    return (
      <PanelContainer style={{ paddingTop: isOnlyArticle ? 20 : 6 }}>
        {!isOnlyArticle && (
          <FlexInline onClick={this.onCheck} style={{ cursor: "pointer" }}>
            <HeyIcon name="checkbox_rect" active={isfolder} />
            <Text
              fontColor="#1C1E23"
              fontSize="15px"
              fontWeight="bold"
              style={{ marginLeft: 8 }}
            >
              {t("editorPage.is_folder")}
            </Text>
          </FlexInline>
        )}
        <Text fontColor="#1C1E23" fontSize="15px" fontWeight="bold">
          {isfolder && !isOnlyArticle
            ? t("editorPage.type_folder_name")
            : t("editorPage.type_article_name")}
        </Text>
        <EditFlex>
          <div>
            <HeyIcon
              name={isfolder & !isOnlyArticle ? "folder" : "checkbox_hamburger"}
            />
          </div>
          <InputBox
            placeholder={
              isfolder & !isOnlyArticle
                ? t("editorPage.folder_name")
                : t("editorPage.article_name")
            }
            style={{
              width: "100%",
              marginLeft: 10,
              marginRight: 10,
              height: 43
            }}
            value={name}
            inValid={name_Invalid}
            onChange={e => this.editChange(e)}
          />
          <TouchableOpacity customStyle={"focus"} onClick={this.onAddClick}>
            {t("btn.ok")}
          </TouchableOpacity>
        </EditFlex>
      </PanelContainer>
    );
  }
}

LibraryEditPanel.propTypes = {
  onAdd: PropTypes.func,
  isOnlyArticle: PropTypes.bool
};

export default withNamespaces()(LibraryEditPanel);
