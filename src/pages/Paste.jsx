import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePaste } from "../store/PasteSlice";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

function Pastes() {
  const paste = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredPastes = paste.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (id) => navigate(`/pastes/${id}`);
  const handleEdit = (id) => navigate(`/${id}`);
  const handleRemove = (id) => dispatch(removePaste(id));

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center py-12 px-6">
        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <input
            type="text"
            className="w-full p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search pastes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Pastes List */}
        <div className="w-full max-w-3xl mt-10 space-y-4">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-800 p-5 rounded-lg shadow-md"
              >
                <div className="text-white">
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <p className="mt-2 text-gray-300 line-clamp-2">
                    {item.content}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleView(item._id)}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-all duration-200"
                  >
                    Delete
                  </button>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg mt-10">No results found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Pastes;
