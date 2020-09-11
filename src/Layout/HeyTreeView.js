import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HeyIcon } from "hey-components";
import { NavItem, MenuText } from "hey-components/navComponents";
import { withNamespaces } from "react-i18next";
class HeyTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }
  onCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };
  render() {
    const { collapse } = this.state;
    const {
      activeID,
      link,
      isLibraryEditing,
      onAddArticle,
      dataSource,
      onItem,
      t
    } = this.props;
    return (
      <React.Fragment>
        {dataSource.type === "folder" && (
          <React.Fragment>
            <NavItem onClick={this.onCollapse}>
              <HeyIcon
                name={
                  isLibraryEditing
                    ? "dot-dark"
                    : collapse
                    ? "arrow_down"
                    : "arrow_right"
                }
                style={{ position: "absolute", left: -1 }}
              />
              <HeyIcon name="folder" />
              <MenuText>{dataSource.title}</MenuText>
            </NavItem>
            <div
              style={{
                paddingLeft: 18,
                display: collapse ? "block" : "none"
              }}
            >
              {isLibraryEditing && (
                <NavItem
                  onClick={() => {
                    onAddArticle(dataSource.id);
                  }}
                >
                  <HeyIcon name={"rect_cross"} />
                  <MenuText active={true}>
                    {t("editorPage.add_article")}
                  </MenuText>
                </NavItem>
              )}
              {dataSource.modules.map((node, index) => (
                <HeyTreeView
                  dataSource={node}
                  activeID={activeID}
                  key={index}
                  link={link}
                  isLibraryEditing={isLibraryEditing}
                  onAddArticle={onAddArticle}
                  onItem={onItem}
                />
              ))}
            </div>
          </React.Fragment>
        )}
        {dataSource.type === "md" && (
          <NavItem onClick={() => onItem(`${link}/${dataSource.id}`)}>
            {isLibraryEditing && (
              <HeyIcon
                name="dot-dark"
                style={{ position: "absolute", left: -1 }}
              />
            )}
            <HeyIcon
              name="checkbox_hamburger"
              active={activeID === `library/${dataSource.id}`}
            />
            <MenuText>{dataSource.title}</MenuText>
          </NavItem>
        )}
      </React.Fragment>
    );
  }
}

HeyTreeView.propTypes = {
  dataSource: PropTypes.object,
  activeID: PropTypes.string,
  link: PropTypes.string,
  isLibraryEditing: PropTypes.bool,
  onAddArticle: PropTypes.func,
  onItem: PropTypes.func
};

export default withNamespaces()(HeyTreeView);
