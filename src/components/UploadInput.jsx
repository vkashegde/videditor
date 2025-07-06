import React from "react";

export default function UploadInput({ sceneId, onUpload, type }) {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      onUpload(sceneId, e.target.files[0]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700 capitalize">
        🎥 Upload for {sceneId}
      </label>
      <input
        type="file"
        accept={type === 'video' ? 'video/*' : type === 'image' ? 'image/*' : ''}
        onChange={handleChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
      />
    </div>
  );
}
