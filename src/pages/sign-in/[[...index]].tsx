import { SignIn } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";

const SignInPage = () => {
  return (
    <>
      <Navbar>
        <div className="grid place-items-center">
          <SignIn />
        </div>
      </Navbar>
    </>
  );
};
export default SignInPage;
