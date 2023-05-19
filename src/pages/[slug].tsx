import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  type NextPage,
} from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import superjson from "superjson";

const Profile: NextPage<{ slug: string }> = ({ slug }) => {
  const user = api.profile.getUserById.useQuery({
    id: slug,
  });

  console.log(slug);

  return (
    <>
      <Head>
        <title>Schooled - {slug}</title>
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
          <div>{user.data?.id}</div>
          <div>{user.data?.profileImageUrl}</div>
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
