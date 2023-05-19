import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="p-4">
        <SignUp />{" "}
      </div>
    </div>
  );
}
