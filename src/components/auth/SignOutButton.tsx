import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const { signOut } = useClerk();
  return <button onClick={() => signOut()}>Sign out</button>;
};

export default SignOutButton;
