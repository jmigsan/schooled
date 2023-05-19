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

const Profile: NextPage<{ slug: string }> = ({ slug }) => {
  const user = api.profile.getUserById.useQuery({
    id: slug,
  });

  return (
    <>
      <Head>
        <title>Schooled - {user.data?.username}</title>
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
          <img src={user.data?.profileImageUrl} className="w-10" />
          <div>{user.data?.username}</div>
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
