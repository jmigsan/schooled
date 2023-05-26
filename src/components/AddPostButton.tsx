const AddPostButton = () => {
  return (
    <div className="fixed bottom-5 right-5">
      <a href="/addpost">
        <button className="flex items-center gap-2 rounded-full bg-blue-200 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
          Add Post
        </button>
      </a>
    </div>
  );
};
export default AddPostButton;
