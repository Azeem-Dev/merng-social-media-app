import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Row, Col } from "antd";
import PostCard from "../components/PostCard/PostCard";
import { getUserDataFromMemory } from "../utils/getUserData";
const Home = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let userInfo = getUserDataFromMemory();
    if (userInfo) {
      setUser(userInfo);
      console.log(userInfo);
    }
  }, []);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let Posts = [];
  if (!loading) {
    Posts = data.getPosts;
  }
  return (
    <div>
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
