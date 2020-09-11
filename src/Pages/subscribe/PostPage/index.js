import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { default as PostListPage } from "./PostListPage";
import { default as CreatePostPage } from "./CreatePostPage";
import { default as PostContentPage } from "./PostContentPage";
import { default as PostEditPage } from "./PostEditPage";
import { PrivateRoute } from "hey-components";
class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          path="/subscribe/pages/post/list"
          exact
          Component={PostListPage}
        />
        <PrivateRoute
          path="/subscribe/pages/post/content/:postID"
          exact
          Component={PostContentPage}
        />
        <PrivateRoute
          path="/subscribe/pages/post/edit/:postID"
          exact
          Component={PostEditPage}
        />
        <PrivateRoute
          path="/subscribe/pages/post/create"
          exact
          Component={CreatePostPage}
        />
        <Redirect to={{ pathname: `/subscribe/pages/post/list` }} />
      </Switch>
    );
  }
}

PostPage.propTypes = {};

export default PostPage;
