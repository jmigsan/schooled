import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";

const Post: NextPage = () => {
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
        <section></section>
      </main>
    </>
  );
};

export default Post;
