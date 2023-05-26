import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import superjson from "superjson";
import Link from "next/link";
import Sidebar from "~/components/Sidebar";
import PostView from "~/components/PostView";

const Profile: NextPage<{ slug: string }> = ({ slug }) => {
  const user = api.profile.getUserById.useQuery({
    id: slug,
  });

  const userPosts = api.posts.getUserPosts.useQuery({ userId: slug });

  return (
    <>
      <Head>
        <title>Schooled - {user.data?.username}</title>
      </Head>
      <Sidebar>
        <section>
          <div className="pb-2">
            <Link href={"/"}>⬅ Go Back</Link>
          </div>
          <div className="grid place-items-center">
            <div className="flex items-center gap-5 p-3 text-3xl">
              <img
                src={user.data?.profileImageUrl}
                className="w-xl rounded-full"
              />
              <div className="pb-4">{user.data?.username}</div>
            </div>
            <div>
              <div className="pb-4 pl-2">Posts from {user.data?.username}</div>
              <div className="flex max-w-3xl flex-col gap-4 ">
                {userPosts.data?.map((post) => (
                  <PostView {...post} key={post.post.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Sidebar>
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

  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  await ssg.profile.getUserById.prefetch({ id: slug });
  await ssg.posts.getUserPosts.prefetch({ userId: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Profile;
