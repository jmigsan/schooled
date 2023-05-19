import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const clickSignOut = () => {
    signOut();
  };

  return <button onClick={clickSignOut}>Sign out</button>;
};

export default SignOutButton;
