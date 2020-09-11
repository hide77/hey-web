import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  Text,
  PageContainer,
  TouchableOpacity,
  FlexInline,
  HeyIcon
} from "hey-components";

import { getPostsOfPage } from "hey-actions/post";
import { LoadingPage } from "hey-pages";
import { withNamespaces } from "react-i18next";

const ListItem = styled.div`
  box-shadow: 0px 2px 8px rgba(31, 46, 116, 0.180565);
  cursor: pointer;
  border-radius: 15px;
  padding: 5px 20px;
  margin: 15px 0;
`;

const ListItemText = styled(Text)`
  padding-bottom: 5px;
  color: #3c3c3c;
`;

const Section = styled.div`
  padding-top: 35px;
  padding-bottom: 15px;
`;
const AddButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  z-index: 20;
  right: 20px;
`;
class PostListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, currentPage } = this.props;
    dispatch(getPostsOfPage(currentPage.id));
  }
  onAddPost = () => {
    const { history } = this.props;
    history.push("/subscribe/pages/post/create");
  };
  onItem = postID => {
    console.log(postID);
    const { history } = this.props;
    history.push(`/subscribe/pages/post/content/${postID}`);
  };
  showListItem = item => {
    var postTime = dayjs(item.created_at);
    return (
      <ListItem onClick={() => this.onItem(item.id)}>
        <ListItemText fontSize="30px" fontWeight="600">
          {item.title}
        </ListItemText>
        <FlexInline style={{ marginTop: 10 }}>
          <Text color="#5f686b" fontSize="16px">
            {postTime.format("MMMM D YYYY")}
          </Text>
          <HeyIcon
            name={"chat_like"}
            width={17}
            height={13}
            active={item.liked}
            viewBox="0 0 21 17"
            style={{ marginLeft: 30 }}
          />
          <Text
            fontSize="15.4px"
            fontWeight="bold"
            color="#E95751"
            style={{ paddingLeft: 6 }}
          >
            {item.nb_likes}
          </Text>
          <Text
            fontSize="17px"
            fontWeight="600"
            color="#3c3c3c"
            style={{ marginLeft: 30 }}
          >
            {item.nb_comments} comments
          </Text>
        </FlexInline>
      </ListItem>
    );
  };
  render() {
    const {
      isAllPostGetting,
      posts,
      myInfo,
      isUserLoading,
      currentPage
    } = this.props;
    if (isUserLoading || isAllPostGetting) {
      return <LoadingPage />;
    }
    return (
      <PageContainer style={{ paddingTop: 40 }}>
        {currentPage.owner.id === myInfo.id && (
          <AddButton onClick={this.onAddPost} customStyle={"focus"}>
            Add a Post
          </AddButton>
        )}
        <Section>
          {posts.map((item, key) => (
            <React.Fragment key={key}>{this.showListItem(item)}</React.Fragment>
          ))}
        </Section>
      </PageContainer>
    );
  }
}

PostListPage.propTypes = {
  currentPage: PropTypes.object,
  isAllPostGetting: PropTypes.bool,
  myInfo: PropTypes.object,
  isUserLoading: PropTypes.bool,
  posts: PropTypes.array,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  t: PropTypes.func
};
function mapStateToProps(state) {
  const { me, isLoading } = state.user;
  const { currentPage } = state.page;
  const { isAllPostGetting, posts } = state.post;
  return {
    isUserLoading: isLoading,
    myInfo: me,
    currentPage,
    isAllPostGetting,
    posts
  };
}
export default connect(mapStateToProps)(withNamespaces()(PostListPage));
