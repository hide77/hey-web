import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import {
  Text,
  Header1,
  HeyIcon,
  PageContainer,
  TouchableOpacity,
  FlexInline
} from "hey-components";
import {
  LoginInput,
  LoginTextarea,
  ErrorMessage
} from "hey-components/loginComponents";
import * as FileUpload from "hey-services/FileUpload";
import { updatePost, getOnePost, deletePost } from "hey-actions/post";
import { LoadingPage } from "hey-pages";
import { withNamespaces } from "react-i18next";

const Content = styled(Text)`
  line-height: 29px;
  padding-bottom: 22px;
  color: #7b7b7b;
`;

const Section = styled.div`
  padding-top: 35px;
  padding-bottom: 15px;
`;

const EditInput = styled(LoginInput)`
  & {
    margin: 0;
    margin-top: 10px;
    max-width: 600px;
    width: 100%;
  }
`;
const EditTextareaInput = styled(LoginTextarea)`
  & {
    margin: 0;
    margin-top: 10px;
    max-width: 600px;
    width: 100%;
  }
`;
const UploadButton = styled.div`
  & {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &:hover {
    cursor: pointer;
  }

  & p {
    font-family: Dosis;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 29px;
    padding-top: 5px;
    padding-left: 5px;
    text-transform: uppercase;
    color: #50aff0;
  }
`;
const AbsolutedFlexInline = styled(FlexInline)`
  position: absolute;
  right: 20px;
  z-index: 20;
  & button:not(:first-child) {
    margin-left: 10px;
  }
`;
class PostEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      content: "",
      pictures: {},
      keywords: "",
      isPrivate: false,
      title_valid: false,
      subtitle_valid: false,
      content_valid: false,
      keywords_valid: false,
      isLoading: false,
      isPostGetted: false
    };
  }

  async componentDidMount() {
    this.fileSelector = FileUpload.buildFileSelector(e => {
      FileUpload.post({
        token: this.props.token,
        file: e.target.files[0],
        cb: imagePath => {
          console.log("image uploaded: ", imagePath);
          this.setState({
            pictures: {
              default:
                imagePath.indexOf("http") === 0
                  ? imagePath
                  : `https://${imagePath}`
            }
          });
        }
      });
    });
    const { dispatch, match, history, myInfo } = this.props;
    const postID = match.params.postID;
    const post = await dispatch(getOnePost(postID));
    if (post.owner !== myInfo.id) {
      history.push("/subscribe/pages/post/list");
    }
    this.setState({
      isPostGetted: true,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      keywords: post.keywords.join(","),
      pictures: post.pictures ? post.pictures : {}
    });
  }

  handleFileSelect = e => {
    e && e.preventDefault();
    this.fileSelector.click();
  };
  validate = () => {
    const { title, subtitle, content, keywords } = this.state;
    var valid = true;
    if (title === "") {
      this.setState({ title_valid: true });
      valid = false;
    }
    if (subtitle === "") {
      this.setState({ subtitle_valid: true });
      valid = false;
    }
    if (content === "") {
      this.setState({ content_valid: true });
      valid = false;
    }
    let keywords_array = keywords.split(",").map(function(item) {
      return item.trim();
    });
    if (keywords_array.length === 1 && keywords_array[0] === "") {
      this.setState({ keywords_valid: true });
      valid = false;
    }
    return valid;
  };
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({
      [e.target.name + "_valid"]: false
    });
  };
  onSelectChange = (e, data) => {
    this.setState({ currency: data.value });
  };
  onSave = () => {
    const {
      title,
      subtitle,
      keywords,
      content,
      pictures,
      isPrivate
    } = this.state;
    const { dispatch, history, currentPage, match } = this.props;
    const postID = match.params.postID;
    if (this.validate()) {
      let keywords_array = keywords.split(",").map(function(item) {
        return item.trim();
      });
      this.setState({ isLoading: true });
      dispatch(
        updatePost(postID, {
          page: currentPage.id,
          title,
          subtitle,
          content,
          keywords: keywords_array,
          pictures,
          icon: "icon-url",
          private: isPrivate
        })
      )
        .then(() => {
          this.setState({ isLoading: false });
          history.push(`/subscribe/pages/post/content/${postID}`);
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    }
  };
  onCancel = () => {
    const { history, match } = this.props;
    const postID = match.params.postID;
    history.push(`/subscribe/pages/post/content/${postID}`);
  };
  onDelete = async () => {
    const { dispatch, history, match } = this.props;
    const postID = match.params.postID;
    this.setState({ isLoading: true });
    await dispatch(deletePost(postID));
    this.setState({ isLoading: false });
    history.push(`/subscribe/pages/post/list`);
  };
  render() {
    const {
      title,
      subtitle,
      keywords,
      content,
      pictures,
      title_valid,
      subtitle_valid,
      keywords_valid,
      content_valid,
      isLoading,
      isPostGetted
    } = this.state;
    const { t } = this.props;
    if (!isPostGetted) {
      return <LoadingPage />;
    }
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        {isLoading && <LoadingPage />}
        <AbsolutedFlexInline>
          <TouchableOpacity customStyle={"focus"} onClick={this.onSave}>
            {t("editSpacePage.save_btn")}
          </TouchableOpacity>
          <TouchableOpacity customStyle={"cancel"} onClick={this.onCancel}>
            {t("editSpacePage.cancel_btn")}
          </TouchableOpacity>
          <TouchableOpacity customStyle={"danger"} onClick={this.onDelete}>
            Delete
          </TouchableOpacity>
        </AbsolutedFlexInline>
        <Section>
          <Header1 color="#3c3c3c">Edit your post</Header1>
          <Content>Please edit your post.</Content>
          <div style={{ paddingTop: 20 }}>
            {Object.keys(pictures).length > 0 && (
              <Image src={pictures.default} />
            )}
            <UploadButton onClick={this.handleFileSelect}>
              <HeyIcon name="upload" />
              <p>Upload an Image</p>
            </UploadButton>
            <EditInput
              placeholder={"title"}
              name="title"
              value={title}
              onChange={this.onChangeInput}
              inValid={title_valid}
            />
            <EditInput
              placeholder={"sub title"}
              name="subtitle"
              value={subtitle}
              onChange={this.onChangeInput}
              inValid={subtitle_valid}
            />
            <EditInput
              placeholder={"Keywords,separated,by,commas"}
              name="keywords"
              value={keywords}
              onChange={this.onChangeInput}
              inValid={keywords_valid}
            />
            <EditTextareaInput
              placeholder={"content"}
              name="content"
              value={content}
              onChange={this.onChangeInput}
              inValid={content_valid}
            />
          </div>
        </Section>
      </PageContainer>
    );
  }
}

PostEditPage.propTypes = {
  token: PropTypes.string,
  currentPage: PropTypes.object,
  match: PropTypes.object,
  myInfo: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  t: PropTypes.func
};
function mapStateToProps(state) {
  const { currentPage } = state.page;
  const { me } = state.user;
  const { token } = state.authentication;
  return {
    token,
    myInfo: me,
    currentPage
  };
}
export default connect(mapStateToProps)(withNamespaces()(PostEditPage));
