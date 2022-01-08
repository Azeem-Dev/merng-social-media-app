import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Row, Col, Button, Tooltip, Modal, Input } from "antd";
import { RocketTwoTone } from "@ant-design/icons";
import PostCard from "../components/PostCard/PostCard";
import { getUserDataFromMemory } from "../utils/getUserData";
const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [PostBody, setPostBody] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setPostBody("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPostBody("");
  };

  const [user, setUser] = useState(undefined);
  let Posts = [];
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    let userInfo = getUserDataFromMemory();
    if (userInfo != {} || userInfo != undefined) {
      setUser(userInfo);
    }
  }, []);

  if (!loading) {
    Posts = data.getPosts;
  }

  const AddPost = () => {
    showModal();
  };
  return (
    <div>
      {user?.id != null && user?.token != null && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Tooltip title="Add Post" color={"#2db7f5"} key={"#2db7f5"}>
            <Button
              type="primary"
              shape="circle"
              icon={<RocketTwoTone style={{ fontSize: "32px" }} />}
              size={"large"}
              onClick={AddPost}
            />
          </Tooltip>
        </div>
      )}

      <Modal
        title="ADD POST"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.Group compact>
          <Input.TextArea
            style={{ width: "100%" }}
            placeholder="Some Beautiful Post..."
            autoSize
            value={PostBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </Input.Group>
      </Modal>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ flexWrap: "wrap" }}
      >
        {Posts?.map((post) => (
          <Col className="gutter-row" span={8} key={post.id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
