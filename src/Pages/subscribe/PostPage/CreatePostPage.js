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
  TouchableOpacity
} from "hey-components";
import {
  LoginInput,
  LoginTextarea,
  ErrorMessage
} from "hey-components/loginComponents";
import * as FileUpload from "hey-services/FileUpload";
import { addPost } from "hey-actions/post";
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
class CreatePostPage extends Component {
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
      isPostCreating: false
    };
  }

  componentDidMount() {
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
  onCreatePost = () => {
    const {
      title,
      subtitle,
      keywords,
      content,
      pictures,
      isPrivate
    } = this.state;
    const { dispatch, history, currentPage } = this.props;
    if (this.validate()) {
      let keywords_array = keywords.split(",").map(function(item) {
        return item.trim();
      });
      this.setState({ isPostCreating: true });
      dispatch(
        addPost({
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
          this.setState({ isPostCreating: false });
          history.push("/subscribe/pages/post");
        })
        .catch(() => {
          this.setState({ isPostCreating: false });
        });
    }
  };
  render() {
    const {
      title_valid,
      subtitle_valid,
      keywords_valid,
      content_valid,
      isPostCreating,
      pictures
    } = this.state;
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        {isPostCreating && <LoadingPage />}
        <Section>
          <Header1 color="#3c3c3c">Create a new post</Header1>
          <Content>Please create your own post.</Content>
          <div style={{ paddingTop: 20 }}>
            {/* <Header5 color="#1C1E23">
              </Header5> */}
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
              onChange={this.onChangeInput}
              inValid={title_valid}
            />
            <EditInput
              placeholder={"sub title"}
              name="subtitle"
              onChange={this.onChangeInput}
              inValid={subtitle_valid}
            />
            <EditInput
              placeholder={"Keywords,separated,by,commas"}
              name="keywords"
              onChange={this.onChangeInput}
              inValid={keywords_valid}
            />
            <EditTextareaInput
              placeholder={"content"}
              name="content"
              onChange={this.onChangeInput}
              inValid={content_valid}
            />
          </div>
        </Section>
        <TouchableOpacity onClick={this.onCreatePost} customStyle={"focus"}>
          Create a post
        </TouchableOpacity>
      </PageContainer>
    );
  }
}

CreatePostPage.propTypes = {
  token: PropTypes.string,
  currentPage: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  t: PropTypes.func
};
function mapStateToProps(state) {
  const { currentPage } = state.page;
  const { token } = state.authentication;
  return {
    token,
    currentPage
  };
}
export default connect(mapStateToProps)(withNamespaces()(CreatePostPage));
