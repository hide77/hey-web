import React, { Component } from "react";
import hljs from "highlight.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import { idx } from "hey-mocks";
import { STYLE_CONFIG } from "hey-config";
import { Markdown, TouchableOpacity, PageContainer } from "hey-components";
import { LoadingPage } from "hey-pages";
import { editFile, deleteFile } from "hey-actions/page";
import BlueHamburger from "hey-assets/images/blue-hamburger.png";

import UIfx from "uifx";
import snd_delete from "hey-snd/trash.mp3";

const $_delete = new UIfx(snd_delete, {
  volume: 1,
  throttleMs: 0
});

const Section = styled.div`
  padding-top: 17px;
  padding-bottom: 17px;
  position: relative;
`;
const MarkdownHeader = styled.div`
  & {
    padding: 17px 30px;
    border-bottom: 2px solid #e3e9f5;
    height: 70px;
    display: flex;
    align-items: center;
  }
  & p {
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    word-break: break-word;
    color: #6b727f;
    margin: 0;
  }
`;
const EditHeader = styled(MarkdownHeader)`
  & {
    border-bottom: 2px solid #2b313c;
    background: #333943;
  }
  & p {
    margin-left: 10px;
  }
`;
const ContentEditor = styled.textarea`
  & {
    font-family: Inconsolata;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 29px;
    color: #c5cddc;
    border: none;
    background: #333943;
    padding: 17px 30px;
    resize: none;
    width: 100%;
    height: calc(100% - 70px);
    word-break: break-word;
  }
  &:focus {
    outline: none;
  }
`;
const MainContainer = styled.div`
  & {
    height: 100%;
    background: white;
    display: flex;
  }
  @media (max-width: 1260px) {
    & {
      display: block;
    }
  }
`;
const EditButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
`;

const ContentContainer = styled.div`
  padding: 17px 30px;
  height: calc(100% - 70px);
  overflow: auto;
`;
const TotalContainer = styled.div`
  width: 50%;
  @media (max-width: 1260px) {
    width: 100%;
    height: 50%;
  }
`;
class SubscribeContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEdit: false,
      isSaving: false
    };
  }
  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };
  handleChange = e => {
    this.setState({ editorContent: e.target.value });
  };
  findModule = () => {
    const { currentPage, match } = this.props;
    const { moduleID: m_id } = match.params;
    for (let i = 0; i < currentPage.modules.length; i++) {
      let item = currentPage.modules[i];
      if (m_id === item.id) return item;
      for (let j = 0; j < item.modules.length; j++) {
        let sub_item = item.modules[j];
        if (m_id === sub_item.id) return sub_item;
      }
    }
    return null;
  };
  onEdit = () => {
    const curModule = this.findModule();
    this.setState({ editorContent: curModule.content, visibleEdit: true });
  };
  onSave = () => {
    const { editorContent } = this.state;
    const { dispatch, match } = this.props;
    const { moduleID } = match.params;
    this.setState({ isSavingOrDeleting: true });
    dispatch(editFile(moduleID, { type: "md", content: editorContent }))
      .then(r => {
        console.log(r);
        this.setState({ isSavingOrDeleting: false, visibleEdit: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isSavingOrDeleting: false });
      });
  };
  onCancel = () => {
    this.setState({ visibleEdit: false });
  };
  onDelete = () => {
    const { dispatch, match, history } = this.props;
    const { moduleID } = match.params;
    this.setState({ isSavingOrDeleting: true });
    dispatch(deleteFile(moduleID))
      .then(() => {
        $_delete.play();
        setTimeout(function() {
          history.push(`/subscribe/pages/about`);
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        this.setState({ isSavingOrDeleting: false });
      });
  };
  render() {
    const { currentPage, myInfo, isUserLoading } = this.props;
    const { editorContent, visibleEdit, isSavingOrDeleting } = this.state;
    const curModule = this.findModule();
    if (isUserLoading) {
      return <LoadingPage />;
    }
    if (!curModule) {
      return <Redirect to={{ pathname: `/subscribe/pages/about` }} />;
    }
    return (
      <React.Fragment>
        {isSavingOrDeleting && <LoadingPage />}
        {!visibleEdit && (
          <PageContainer>
            {currentPage.owner.id === myInfo.id && (
              <EditButton customStyle={"focus"} onClick={this.onEdit}>
                Edit
              </EditButton>
            )}
            <Section style={{ paddingTop: 70 }}>
              <Markdown source={curModule.content} linkTarget="_blank" />
            </Section>
          </PageContainer>
        )}

        {visibleEdit && (
          <MainContainer>
            <TotalContainer>
              <EditHeader>
                <Image src={BlueHamburger} />
                <p>Editor</p>
                <TouchableOpacity
                  customStyle={"focus"}
                  style={{ marginLeft: "auto" }}
                  onClick={this.onSave}
                >
                  Save
                </TouchableOpacity>
                <TouchableOpacity
                  customStyle={"cancel"}
                  style={{ marginLeft: 10 }}
                  onClick={this.onCancel}
                >
                  Cancel
                </TouchableOpacity>
                <TouchableOpacity
                  customStyle={"danger"}
                  style={{ marginLeft: 10 }}
                  onClick={this.onDelete}
                >
                  Delete
                </TouchableOpacity>
              </EditHeader>
              <ContentEditor
                value={editorContent}
                onChange={this.handleChange}
              />
            </TotalContainer>

            <TotalContainer>
              <MarkdownHeader>
                <p>Preview</p>
              </MarkdownHeader>
              <ContentContainer>
                <Markdown source={editorContent} linkTarget="_blank" />
              </ContentContainer>
            </TotalContainer>
          </MainContainer>
        )}
      </React.Fragment>
    );
  }
}
SubscribeContentPage.propTypes = {
  currentPage: PropTypes.object,
  history: PropTypes.object,
  myInfo: PropTypes.object,
  moduleID: PropTypes.string,
  isUserLoading: PropTypes.bool,
  dispatch: PropTypes.func,
  match: PropTypes.object
};
function mapStateToProps(state) {
  const { me, isLoading } = state.user;
  const { currentPage } = state.page;
  return {
    isUserLoading: isLoading,
    myInfo: me,
    currentPage
  };
}
export default connect(mapStateToProps)(SubscribeContentPage);
