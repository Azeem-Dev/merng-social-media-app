import React, { useEffect, useState } from "react";
import moment from "moment";
import { Skeleton, Card, Avatar, Tooltip, Divider, Input, Button } from "antd";
import {
  CommentOutlined,
  LikeOutlined,
  CodeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import InputEmoji from "react-input-emoji";
import { gql, useMutation } from "@apollo/client";
import { getUserDataFromMemory } from "../../utils/getUserData";
import { OpenErrorNotification } from "../Notification/Notification";
import CommentComponent from "../CommentComponent/CommentComponent";

const { Meta } = Card;
const PostCard = ({ post }) => {
  const [currentPostAllComments, setCurrentPostAllComments] = useState(
    post.comments
  );
  const [commentsControlLength, setCommentsControlLength] = useState(1);
  const [comment, setComment] = useState("");
  const [showComment, setshowComment] = useState(false);
  const [AddComment, setAddComment] = useState(false);
  const [user, setUser] = useState(undefined);
  const [allComments, setAllComments] = useState(undefined);
  const [PostComment, response] = useMutation(POST_COMMENT);

  const handleOnEnter = (text) => {
    if (text == "") {
      OpenErrorNotification("Can't save an Empty Comment", "Empty Comment");
      return;
    }
    if (user.id == null && user.token == null) {
      OpenErrorNotification("You are Not Logged In", "Please Login");
      return;
    }
    PostComment({
      variables: {
        postId: post.id,
        body: text,
      },
    });
    setComment("");
  };
  useEffect(() => {
    setAllComments(currentPostAllComments?.slice(0, 3 * commentsControlLength));
  }, [commentsControlLength]);
  useEffect(() => {
    const userFromMemory = getUserDataFromMemory();
    setUser(userFromMemory);
    let userComments = [];
    setAllComments(currentPostAllComments?.slice(0, 3));
  }, []);

  useEffect(() => {
    if (
      response.called == true &&
      response.loading == false &&
      response.error == undefined
    ) {
      setCurrentPostAllComments(response.data.createComment.comments);
      setAllComments(response.data.createComment.comments?.slice(0, 3));
    }
  }, [response.data]);

  useEffect(() => {
    if (!showComment) {
      setAllComments(currentPostAllComments?.slice(0, 3));
    }
  }, [showComment]);
  const AddCommentFunction = () => {
    if (comment == "") {
      OpenErrorNotification("Can't save an Empty Comment", "Empty Comment");
      return;
    }
    if (user.id == null && user.token == null) {
      OpenErrorNotification("You are Not Logged In", "Please Login");
      return;
    }
    PostComment({
      variables: {
        postId: post.id,
        body: comment,
      },
    });
    setComment("");
  };
  return (
    <Card
      hoverable
      style={{ minWidth: 300, marginTop: 16, cursor: "text" }}
      actions={[
        <LikeIcon post={post} />,
        <Tooltip
          placement="bottom"
          title={showComment ? "Hide Comments" : "Show Comments"}
          color="#2db7f5"
          style={{
            fontWeight: "800",
          }}
        >
          <CommentOutlined
            key="comment"
            style={{
              color: `${showComment ? "#1890ff" : "rgba(0, 0, 0, 0.45)"}`,
            }}
            onClick={() => setshowComment((prev) => !prev)}
          />
        </Tooltip>,
        <Tooltip
          placement="bottom"
          title="Add Comment"
          color="#2db7f5"
          style={{
            fontWeight: "800",
          }}
        >
          <CodeOutlined
            key="add-comment"
            style={{
              color: `${AddComment ? "#1890ff" : "rgba(0, 0, 0, 0.45)"}`,
            }}
            onClick={() => setAddComment((prev) => !prev)}
          />
        </Tooltip>,
      ]}
    >
      <Skeleton avatar active loading={false}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={post.body.slice(0, 20) + "..."}
          description={post.body}
        />
        <p
          style={{
            marginTop: "20px",
            color: "#CBD4C2",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {moment(post.createdAt).fromNow()}
        </p>
        {showComment && (
          <>
            <Divider
              style={{
                fontSize: "16px",
                fontWeight: "200",
                color: "#1890ff",
              }}
            >
              Comments
            </Divider>
            {allComments?.map((comment) => {
              return (
                <CommentComponent
                  key={comment.id}
                  username={comment.username}
                  body={comment.body}
                  createdAt={comment.createdAt}
                />
              );
            })}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip
                placement="bottom"
                title="more comments..."
                color="#2db7f5"
                style={{
                  fontWeight: "800",
                }}
              >
                <CaretDownOutlined
                  style={{ color: "#2db7f5", fontSize: "20px" }}
                  onClick={() =>
                    setCommentsControlLength((oldLength) => oldLength + 1)
                  }
                />
              </Tooltip>
            </div>
          </>
        )}

        {AddComment && (
          <>
            <Divider
              style={{
                fontSize: "16px",
                fontWeight: "200",
                color: "#1890ff",
              }}
            >
              Add Comment
            </Divider>
            <InputEmoji
              style={{ width: "50%" }}
              value={comment}
              onChange={setComment}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Such an inspiring post"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="primary" onClick={AddCommentFunction}>
                Add
              </Button>
            </div>
          </>
        )}
      </Skeleton>
    </Card>
  );
};

const LikeIcon = ({ post }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getUserDataFromMemory());
  }, []);

  const [LikePost, response] = useMutation(LIKE_POST);
  // const [Post, setPost] = useState(post);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (
      user?.username != "" &&
      user?.username != undefined &&
      user?.username != null
    ) {
      post.likes.find((c) => c.username == user?.username) != undefined
        ? setLiked(true)
        : setLiked(false);
    }
  }, [user]);
  useEffect(() => {
    if (
      response.called == true &&
      response.loading == false &&
      response.error == undefined
    ) {
      if (
        response.data.likePost.likes.find((c) => c.username == user?.username)
      ) {
        setLiked(true);
      } else setLiked(false);
    }
  }, [response]);
  return (
    <Tooltip
      placement="bottom"
      title={liked ? "dislike" : "like"}
      color="#2db7f5"
      style={{
        fontWeight: "800",
      }}
    >
      <LikeOutlined
        key="like"
        onClick={() => {
          if (user?.id != null && user?.token != null) {
            LikePost({
              variables: {
                postId: post.id,
              },
            });
          } else {
            OpenErrorNotification("You are Not Logged In", "Please Login");
          }
        }}
        style={{
          color: `${liked ? "#1890ff" : "rgba(0, 0, 0, 0.45)"}`,
        }}
      />
    </Tooltip>
  );
};

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;
const POST_COMMENT = gql`
  mutation PostComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      comments {
        id
        body
        username
      }
    }
  }
`;
export default PostCard;
