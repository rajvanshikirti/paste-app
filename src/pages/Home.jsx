import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPaste, updatePaste } from "../store/PasteSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setvalue] = useState("");
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();

  const paste = useSelector((state) => state.paste.pastes);
  const p = id ? paste.filter((item) => item._id === Number(id)) : [];

  const CreatePost = () => {
    const ob = {
      title: value,
      content: content,
      _id: Date.now(),
    };
    const pastes = JSON.parse(localStorage.getItem("pastes")) || [];
    pastes.push(ob);
    localStorage.setItem("pastes", JSON.stringify(pastes));
    dispatch(addPaste(ob));
    setcontent("");
    setvalue("");
    toast.success("Post Created!");
  };

  const editPost = () => {
    const ob = {
      title: value,
      content: content,
      _id: Number(id),
    };
    dispatch(updatePaste(ob));
    navigate("/pastes");
    toast.success("Post Updated!");
  };

  useEffect(() => {
    if (id && p.length > 0 && value === "" && content === "") {
      setvalue(p[0].title);
      setcontent(p[0].content);
    }
  }, [id, p, value, content]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center py-12 px-6">
        <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-3xl">
          <h2 className="text-2xl text-white font-bold text-center mb-6">
            {id ? "Edit Your Post" : "Create a New Post"}
          </h2>

          {/* Title Input */}
          <input
            type="text"
            className="w-full p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title..."
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          />

          {/* Content Input */}
          <textarea
            className="w-full h-40 mt-4 p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your content here..."
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-center mt-6">
            {id ? (
              <button
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200"
                onClick={editPost}
              >
                Update Post
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-all duration-200"
                onClick={CreatePost}
              >
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
