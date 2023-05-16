import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <SignIn />
    </div>
  );
};
export default SignInPage;
