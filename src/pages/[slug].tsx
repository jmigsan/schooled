import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Schooled - View Profile</title>
        <meta name="description" content="📚" />
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
        <section></section>
      </main>
    </>
  );
};

export default Profile;
