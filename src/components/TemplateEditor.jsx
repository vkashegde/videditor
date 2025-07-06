import React, { useState } from 'react';
import UploadInput from './UploadInput';

export default function TemplateEditor({ template, onClipsChange }) {
  const [clips, setClips] = useState({});

  const handleClipUpload = (sceneId, file) => {
    const updated = { ...clips, [sceneId]: file };
    setClips(updated);
    onClipsChange(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{template.name}</h2>
      {template.scenes.map((scene) => {
        if (scene.type === "video" || scene.type === "image") {
          return (
            <UploadInput
              key={scene.id}
              sceneId={scene.id}
              onUpload={handleClipUpload}
              type={scene.type}
            />
          );
        }
        return (
          <div key={scene.id} className="text-gray-700 my-2">
            <strong>{scene.content}</strong>
          </div>
        );
      })}
    </div>
  );
}
