import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import SignOutButton from "~/components/auth/SignOutButton";
import LoadingSpinner from "~/components/loading/LoadingSpinner";

import { RouterOutputs, api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  if (!user.isLoaded) {
    return <LoadingSpinner />;
  }

  const CreatePost = () => {
    const ctx = api.useContext();

    const createPostMutation = api.posts.createPost.useMutation({
      onSuccess: () => {
        setInput("");
        ctx.posts.invalidate();
      },
    });
    const [input, setInput] = useState("");

    return (
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Write here..."
          className="p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={createPostMutation.isLoading}
        />
        <button
          onClick={() => createPostMutation.mutate({ content: input })}
          disabled={createPostMutation.isLoading}
        >
          Post
        </button>
      </div>
    );
  };

  type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];
  dayjs.extend(relativeTime);

  const PostView = (props: PostWithAuthor) => {
    const { author, post } = props;

    return (
      <Link href={`/post/${post.id}`}>
        <div className="border-2 border-solid border-white p-2">
          <img
            src={author.profileImageUrl}
            alt={`Profile pic of ${author.id}`}
            className="float-right w-12"
          />
          <Link href={`/${author.id}`}>
            <p>
              {post.authorId} - {dayjs(post.createdAt).fromNow()}
            </p>
          </Link>
          <p>{post.content}</p>
        </div>
      </Link>
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
