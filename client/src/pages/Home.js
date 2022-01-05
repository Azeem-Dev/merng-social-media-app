import { gql, useQuery } from "@apollo/client";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let Posts = [];
  if (!loading) {
    Posts = data.getPosts;
  }
  return (
    <div>
      {Posts?.map((post) => (
        <div key={post.id}>
          <h1>{post.body}</h1>
        </div>
      ))}
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
