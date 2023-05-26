import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import PostView from "./PostView";

const Feed = () => {
  const posts = api.posts.getAll.useQuery();

  if (posts.isLoading) {
    return (
      <div className="grid place-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 ">
      {posts.data?.map((post) => (
        <PostView {...post} key={post.post.id} />
      ))}
    </div>
  );
};

export default Feed;
