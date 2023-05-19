import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import SignOutButton from "~/components/auth/SignOutButton";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const user = api.profile.getUserById.useQuery({
    id: "user_2PtAoKFGrVtY0FvQMBfgICX5GJY",
  });

  return (
    <>
      <Head>
        <title>Schooled - View Profile</title>
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

export default Profile;
