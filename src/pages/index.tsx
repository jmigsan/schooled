import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";
import LoadingSpinner from "~/components/loading/LoadingSpinner";

import { RouterOutputs, api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  if (!user.isLoaded) {
    return <LoadingSpinner />;
  }

  const CreatePost = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="Write here..."
          className="p-2 text-black"
        />
      </div>
    );
  };

  type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];
  dayjs.extend(relativeTime);

  const PostView = (props: PostWithAuthor) => {
    const { author, post } = props;

    return (
      <div className="border-2 border-solid border-white p-2">
        <img
          src={author.profileImageUrl}
          alt={`Profile pic of ${author.id}`}
          className="float-right w-12"
        />
        <p>
          {post.authorId} - {dayjs(post.createdAt).fromNow()}
        </p>
        <p>{post.content}</p>
      </div>
    );
  };

  const Feed = () => {
    const posts = api.posts.getAll.useQuery();

    if (posts.isLoading) {
      return (
        <div className="p-4">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {posts.data?.map((post) => (
          <PostView {...post} key={post.post.id} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-4 p-4">
        <header>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </header>
        <section>
          <CreatePost />
        </section>
        <section>
          <Feed />
        </section>
      </main>
    </>
  );
};

export default Home;
