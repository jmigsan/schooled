import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="p-4">
        <SignIn />
      </div>
    </div>
  );
};
export default SignInPage;
