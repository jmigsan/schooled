import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import superjson from "superjson";
import Link from "next/link";

const Post: NextPage<{ id: string }> = ({ id }) => {
  const post = api.posts.getPost.useQuery({ postId: id });

  return (
    <>
      <Head>
        <title>Schooled - View Post</title>
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
          <div className="pb-2">
            <Link href={"/"}>⬅ Go Back</Link>
          </div>
          <div className="border-2 border-solid border-white p-2">
            {post.data?.content}
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      userId: null,
    },
    transformer: superjson, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  await ssg.posts.getPost.prefetch({ postId: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Post;
