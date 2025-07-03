/* eslint-disable no-unused-vars */
import { useState } from "react";
import { templates } from "./template-config";
import { Player } from "@remotion/player";
import MyVideo from "./Video/MyVideo";
import VideoControls from "./components/VideoControls";

const videoFilters = [
  { id: "none", name: "None", style: {} },
  { id: "grayscale", name: "Grayscale", style: { filter: "grayscale(100%)" } },
  { id: "sepia", name: "Sepia", style: { filter: "sepia(100%)" } },
  { id: "blur", name: "Blur", style: { filter: "blur(2px)" } },
  { id: "brightness", name: "Bright", style: { filter: "brightness(150%)" } },
  {
    id: "contrast",
    name: "High Contrast",
    style: { filter: "contrast(150%)" },
  },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [clips, setClips] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(videoFilters[0]);
  const [trimSettings, setTrimSettings] = useState({
    start: 0,
    end: selectedTemplate.duration,
  });

  const [cropSettings, setCropSettings] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });



  const handleClipChange = (sceneId, file) => {
    const scene = selectedTemplate.scenes.find(s => s.id === sceneId);
    setClips((prev) => ({ 
      ...prev, 
      [sceneId]: {
        file,
        trim: {
          start: 0,
          end: scene.duration
        }
      }
    }));
  };



  const openFileDialog = (sceneId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      if (e.target.files[0]) {
        handleClipChange(sceneId, e.target.files[0]);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="container mx-auto max-w-[800px] flex flex-col gap-4">
        {/* Video preview */}

        <div className="w-full aspect-video flex items-center justify-center rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
          <Player
            component={MyVideo}
            inputProps={{
              clips,
              template: selectedTemplate,
              filter: selectedFilter.style,
              trimSettings,
              cropSettings,
            }}
            durationInFrames={selectedTemplate.duration * 30}
            fps={30}
            compositionHeight={720}
            compositionWidth={1280}
            controls
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>



        {/* Controls section */}
        <div className="rounded-xl px-4 py-3 space-y-4 bg-gray-900 border border-gray-700">
          <div className="space-y-4">
            {/* template selelction */}
            <div className="flex gap-4">
              <select
                className="bg-gray-800 text-white p-2 rounded"
                value={selectedTemplate.id}
                onChange={(e) => {
                  const template = templates.find(
                    (t) => t.id === e.target.value
                  );
                  setSelectedTemplate(template);
                  setClips({});
                  setTrimSettings({
                    start: 0,
                    end: template.duration,
                  });
                }}
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>

              {/* {selectedTemplate.scenes
                .filter((scene) => scene.type === "video")
                .map((scene) => (
                  <button
                    key={scene.id}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={() => openFileDialog(scene.id)}
                  >
                    {clips[scene.id] ? "Replace Video" : "Add Video"}
                  </button>
                ))} */}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {videoFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded ${
                    selectedFilter.id === filter.id
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  } text-sm`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            <VideoControls
              duration={selectedTemplate.duration}
              trimSettings={trimSettings}
              cropSettings={cropSettings}
              onTrimChange={setTrimSettings}
              onCropChange={setCropSettings}
            />

            {/* <div className="space-y-4">
              <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold">Upload your video clips to start editing</h2>
                <div className="flex flex-wrap gap-4">
                  {selectedTemplate.scenes
                    .filter(scene => scene.type === 'video')
                    .map(scene => (
                      <button 
                        key={scene.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => openFileDialog(scene.id)}
                      >
                        {clips[scene.id] ? `Replace ${scene.id}` : `Upload ${scene.id}`}
                      </button>
                    ))}
                </div>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedTemplate.scenes
              .filter((scene) => scene.type === "video")
              .map((scene) => (
                <div
                  key={scene.id}
                  className="flex flex-col items-center justify-center h-32 rounded-lg border-2 border-white bg-gray-800 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => openFileDialog(scene.id)}
                >
                  <span className="text-lg font-semibold">
                    {scene.duration.toFixed(1)}s
                  </span>
                  {clips[scene.id] ? (
                    <span className="text-sm text-green-400 mt-2">
                      Video Added ✔
                    </span>
                  ) : (
                    <span className="text-sm text-red-400 mt-2">
                      Add Video ✘
                    </span>
                  )}
                </div>
              ))}
          </div>

          {/* <div className="flex justify-between">
            <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
              Next
            </button>
          </div> */}

          <div>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={async () => {
                try {
                  const outputPath = await exportVideo({
                    clips: Object.fromEntries(
                      Object.entries(clips).map(([sceneId, clip]) => [
                        sceneId, 
                        clip.file
                      ])
                    ),
                    template: selectedTemplate,
                    filter: selectedFilter.style,
                    trimSettings: Object.fromEntries(
                      Object.entries(clips).map(([sceneId, clip]) => [
                        sceneId,
                        clip.trim
                      ])
                    ),
                    cropSettings,
                    onProgress: (progress) =>
                      console.log(`Exporting: ${progress}%`),
                  });
                  const a = document.createElement("a");
                  a.href = outputPath;
                  a.download = "edited-video.mp4";
                  a.click();
                } catch (error) {
                  console.error("Export failed:", error);
                }
              }}
            >
              Export Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
