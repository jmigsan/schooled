import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
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
        void ctx.posts.invalidate();
        toast.success("Post added");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          toast.error(`Error: ${errorMessage[0]}`);
        } else {
          toast.error("Failed to post");
        }
      },
    });
    const [input, setInput] = useState("");

    const SubmitPost = () => {
      createPostMutation.mutate({ content: input });
    };

    return (
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Write here..."
          className="p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={createPostMutation.isLoading}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              SubmitPost();
            }
            console.log("hey");
          }}
        />
        <button onClick={SubmitPost} disabled={createPostMutation.isLoading}>
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
      <div className="border-2 border-solid border-white p-2">
        <div className="flex items-center gap-2">
          <Link href={`/${author.id}`}>
            <img
              src={author.profileImageUrl}
              alt={`Profile pic of ${author.id}`}
              className="w-10"
            />
          </Link>
          <Link href={`/${author.id}`}>
            <p>
              {post.authorId} - {dayjs(post.createdAt).fromNow()}
            </p>
          </Link>
        </div>
        <Link href={`/post/${post.id}`}>
          <p>{post.content}</p>
        </Link>
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
