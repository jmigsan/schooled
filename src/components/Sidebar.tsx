import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUser();

  return (
    <div>
      <div className="">
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center rounded-lg p-2 text-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <Link href="/" className="ml-2 flex md:mr-24">
                  <span className="self-center whitespace-nowrap rounded-xl bg-red-500 px-4 py-3 text-xl font-semibold text-white sm:text-2xl">
                    📚 Schooled
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <SignedIn>Hello {user.user?.username}</SignedIn>
                </div>
                <div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-24 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto px-3 pb-4 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/"
                  className="flex items-center rounded-lg p-2 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 text-green-500  transition duration-75 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/addpost"
                  className="flex items-center rounded-lg p-2 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 text-blue-500 transition duration-75 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Add Post
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-24 p-4 sm:ml-64 ">
        <main>{children}</main>
      </div>
    </div>
  );
};
export default Sidebar;
