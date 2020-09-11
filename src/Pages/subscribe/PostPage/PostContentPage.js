import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  Text,
  PageContainer,
  TouchableOpacity,
  HeyIcon,
  FlexInline,
  UserPicture
} from "hey-components";
import { LoginTextarea } from "hey-components/loginComponents";
import {
  getOnePost,
  getComments,
  likeUnlikePost,
  commentToPost,
  deleteComment,
  likeUnlikeComment
} from "hey-actions/post";
import { LoadingPage } from "hey-pages";
import { withNamespaces } from "react-i18next";

const Section = styled.div`
  padding-top: 35px;
  padding-bottom: 15px;
  width: 600px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
const EditButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  z-index: 20;
  right: 20px;
`;
const PostImage = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
`;
const CommentInput = styled(LoginTextarea)`
  & {
    width: 100%;
    margin: 0;
  }
  &::placeholder {
    text-transform: unset;
  }
`;
const TextButton = styled(Text)`
  & {
    cursor: pointer;
    margin-left: 30px;
  }
  &:hover {
    opacity: 0.8;
  }
`;
class PostContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isPostGetted: false,
      comments: [],
      comment_text: ""
    };
  }

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const postID = match.params.postID;
    const post = await dispatch(getOnePost(postID));
    const comments = await dispatch(getComments(postID));
    this.setState({
      isPostGetted: true,
      post: { ...post, liked: post.liked ? true : false },
      comments: comments
    });
  }
  onEditPost = () => {
    const { history, match } = this.props;
    const postID = match.params.postID;
    history.push(`/subscribe/pages/post/edit/${postID}`);
  };
  onItem = postID => {
    console.log(postID);
  };
  onPostLike = () => {
    const { dispatch } = this.props;
    const { post } = this.state;
    const liked = post.liked;
    const nb_likes = post.nb_likes;
    this.setState({
      post: { ...post, liked: !liked, nb_likes: nb_likes + (liked ? -1 : 1) }
    });
    dispatch(likeUnlikePost(post.id));
  };
  onChangeInput = e => {
    this.setState({
      comment_text: e.target.value
    });
  };
  onAddComment = () => {
    const { dispatch, myInfo } = this.props;
    const { comment_text, post, comments } = this.state;
    if (comment_text.trim() === "") return;
    dispatch(commentToPost(post.id, { content: comment_text })).then(r => {
      this.setState({
        comments: [...comments, { ...r, user: myInfo }],
        post: { ...post, nb_comments: post.nb_comments + 1 },
        comment_text: ""
      });
    });
  };
  onCommentLike = commentID => {
    const { dispatch } = this.props;
    const { post, comments } = this.state;
    const updated_comments = comments.map(item => {
      if (item.id !== commentID) return item;
      const nb_likes = item.nb_likes;
      const liked = item.liked;
      return { ...item, liked: !liked, nb_likes: nb_likes + (liked ? -1 : 1) };
    });
    this.setState({
      comments: updated_comments
    });
    dispatch(likeUnlikeComment(post.id, commentID));
  };
  onDeleteComment = commentID => {
    const { dispatch } = this.props;
    const { post, comments } = this.state;
    const updated_comments = comments.filter(item => {
      return item.id !== commentID;
    });
    this.setState({
      comments: updated_comments
    });
    dispatch(deleteComment(post.id, commentID));
  };
  keyPress = e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.onAddComment();
    }
  };
  showComment = comment => {
    var commentTime = dayjs(comment.created_at);
    const { myInfo } = this.props;
    return (
      <FlexContainer style={{ marginBottom: 20 }}>
        <UserPicture user={comment.user} size={42} />
        <div style={{ marginLeft: 10 }}>
          <Text fontSize="15px" fontWeight="bold" color="#3c3c3c">
            {comment.user.username}
          </Text>
          <Text fontSize="23px" fontWeight="500" color="#5f686b">
            {comment.content}
          </Text>
          <FlexInline style={{ marginTop: 10 }}>
            <Text color="#5f686b" fontSize="16px">
              {commentTime.format("MMMM D YYYY")}
            </Text>
            <HeyIcon
              name={"chat_like"}
              width={17}
              height={13}
              active={comment.liked}
              viewBox="0 0 21 17"
              onClick={() => this.onCommentLike(comment.id)}
              style={{ marginLeft: 30, cursor: "pointer" }}
            />
            <Text
              fontSize="15.4px"
              fontWeight="bold"
              color="#E95751"
              style={{ paddingLeft: 6 }}
            >
              {comment.nb_likes}
            </Text>
            {comment.user.id === myInfo.id && (
              <TextButton
                fontSize="15.4px"
                fontWeight="bold"
                color="#5f686b"
                onClick={() => this.onDeleteComment(comment.id)}
              >
                Delete
              </TextButton>
            )}
          </FlexInline>
        </div>
      </FlexContainer>
    );
  };
  render() {
    const { myInfo } = this.props;
    const { post, isPostGetted, comments, comment_text } = this.state;
    if (!isPostGetted) {
      return <LoadingPage />;
    }
    if (isPostGetted && post === null) {
      return <Redirect to="/subscribe/pages/post" />;
    }
    var postTime = dayjs(post.created_at);
    console.log(comments);
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        {post.owner.id === myInfo.id && (
          <EditButton onClick={this.onEditPost} customStyle={"focus"}>
            Edit
          </EditButton>
        )}
        <Section>
          <Text color="#3c3c3c" fontSize="42px" fontWeight="600">
            {post.title}
          </Text>
          <FlexInline style={{ margin: "10px 0" }}>
            <UserPicture user={post.owner} size={42} />
            <div style={{ marginLeft: 5 }}>
              <Text color="#3c3c3c" fontSize="15px" style={{ padding: 0 }}>
                {post.owner.name}
              </Text>
              <Text color="#3c3c3c" fontSize="15px" style={{ padding: 0 }}>
                {postTime.format("MMMM D YYYY")}
              </Text>
            </div>

            <HeyIcon
              name={"chat_like"}
              width={17}
              height={13}
              active={post.liked}
              viewBox="0 0 21 17"
              onClick={this.onPostLike}
              style={{ marginLeft: 40, cursor: "pointer" }}
            />
            <Text
              fontSize="15.4px"
              fontWeight="bold"
              color="#E95751"
              style={{ paddingLeft: 6 }}
            >
              {post.nb_likes}
            </Text>
            <Text
              fontSize="17px"
              fontWeight="600"
              color="#3c3c3c"
              style={{ marginLeft: "auto" }}
            >
              {post.nb_comments} comments
            </Text>
          </FlexInline>
          {post.pictures && <PostImage src={post.pictures.default} />}
          <Text color="#3c3c3c" fontSize="35px" fontWeight="600">
            {post.subtitle}
          </Text>
          <Text color="#5f686b" fontSize="21px">
            {post.content}
          </Text>
        </Section>
        <Section>
          {comments.map((comment, key) => (
            <React.Fragment key={key}>
              {this.showComment(comment)}
            </React.Fragment>
          ))}
        </Section>
        <Section>
          <FlexContainer>
            <UserPicture user={myInfo} size={42} />
            <CommentInput
              placeholder="Write a comment"
              onKeyDown={this.keyPress}
              value={comment_text}
              onChange={this.onChangeInput}
              style={{ marginLeft: 10 }}
            />
          </FlexContainer>
          <FlexInline style={{ marginTop: 20 }}>
            <TouchableOpacity
              customStyle={"focus"}
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                margin: 0,
                marginLeft: "auto"
              }}
              onClick={this.onAddComment}
            >
              Add
            </TouchableOpacity>
          </FlexInline>
        </Section>
      </PageContainer>
    );
  }
}

PostContentPage.propTypes = {
  match: PropTypes.object.isRequired,
  myInfo: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  t: PropTypes.func
};
function mapStateToProps(state) {
  const { me } = state.user;
  return {
    myInfo: me
  };
}
export default connect(mapStateToProps)(withNamespaces()(PostContentPage));
