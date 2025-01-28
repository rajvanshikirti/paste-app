import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function View() {
  const paste = useSelector((state) => state.paste.pastes);
  const { id } = useParams();

  // Find the post using ID
  const post = paste.find((item) => item._id === id);

  const copy = () => {
    if (post) {
      navigator.clipboard.writeText(post.content);
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Post not found!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center py-12 px-6">
        {post ? (
          <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
            {/* Title Input */}
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="w-full p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={post.title}
                readOnly
              />
              <Button text="Copy" onClick={copy} />
            </div>

            {/* Content Area */}
            <textarea
              className="w-full h-64 mt-4 p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={post.content}
              readOnly
            ></textarea>
          </div>
        ) : (
          <div className="text-white text-xl mt-10">Post not found!</div>
        )}
      </div>
    </>
  );
}

export default View;
