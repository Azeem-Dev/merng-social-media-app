import React from "react";
import { Skeleton, Card, Avatar } from "antd";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { convertDateToFormat } from "../../utils/dateFormatHelper";

const { Meta } = Card;
const PostCard = ({ post }) => {
  const dateOfPost = convertDateToFormat(post.createdAt);
  return (
    <Card
      hoverable
      style={{ minWidth: 300, marginTop: 16, cursor: "text" }}
      actions={[
        <LikeOutlined
          key="like"
          onClick={() =>
            console.log(
              "like clicked for post'" + post.body + "' with id:" + post.id
            )
          }
        />,
        <CommentOutlined key="comment" />,
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
          {dateOfPost}
        </p>
      </Skeleton>
    </Card>
  );
};

export default PostCard;
