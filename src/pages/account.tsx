import { SignInButton, SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";

import { api } from "~/utils/api";

const Account: NextPage = () => {
  const posts = api.posts.getAll.useQuery();
  console.log(posts.data);

  return (
    <>
      <Head>
        <title>Schooled - Account</title>
      </Head>
      <main className="flex flex-col gap-4 p-4">
        <section>
          <SignedIn>
            <UserProfile />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </section>
      </main>
    </>
  );
};

export default Account;
