import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const clickSignOut = () => {
    void signOut();
  };

  return <button onClick={clickSignOut}>Sign out</button>;
};

export default SignOutButton;
