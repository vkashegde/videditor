import React from "react";
import PropTypes from "prop-types";

export default function VideoControls({
  onTrimChange,
  onCropChange,
  duration,
  cropSettings,
  trimSettings,
  audioFile,
  onAudioChange,
  audioVolume,
  onVolumeChange,
  textOverlay,
  onTextChange,
}) {
  const inputClasses =
    "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer";
  // const labelClasses = "block mb-2 text-sm font-medium text-gray-400";
  const valueClasses = "text-xs text-gray-500 mt-1";
  return (
    <div className="space-y-4 w-full">
      {/* Trim Controls */}
      {/* <div className="space-y-2">
        <label className="text-sm text-gray-400">Trim Video</label>
        <div className="relative h-8">
          <div className="absolute top-1/2 w-full h-2 bg-gray-700 rounded-lg -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 h-2 bg-blue-500 rounded-lg -translate-y-1/2"
            style={{
              left: `${(trimSettings.start / duration) * 100}%`,
              right: `${100 - (trimSettings.end / duration) * 100}%`,
            }}
          ></div>
          <div
            className="absolute w-4 h-4 bg-white rounded-full border border-gray-400 -translate-y-1/2 z-30 cursor-pointer"
            style={{
              left: `${(trimSettings.start / duration) * 100}%`,
              top: "50%",
            }}
            onMouseDown={(e) => {
              const startDrag = (moveEvent) => {
                const rect = e.target.parentElement.getBoundingClientRect();
                const pos = (moveEvent.clientX - rect.left) / rect.width;
                const newStart = Math.min(
                  Math.max(0, pos * duration),
                  trimSettings.end - 1
                );
                onTrimChange({ ...trimSettings, start: newStart });
              };
              document.addEventListener("mousemove", startDrag);
              document.addEventListener(
                "mouseup",
                () => {
                  document.removeEventListener("mousemove", startDrag);
                },
                { once: true }
              );
            }}
          />
          <div
            className="absolute w-4 h-4 bg-white rounded-full border border-gray-400 -translate-y-1/2 z-30 cursor-pointer"
            style={{
              left: `${(trimSettings.end / duration) * 100}%`,
              top: "50%",
            }}
            onMouseDown={(e) => {
              const endDrag = (moveEvent) => {
                const rect = e.target.parentElement.getBoundingClientRect();
                const pos = (moveEvent.clientX - rect.left) / rect.width;
                const newEnd = Math.max(
                  Math.min(duration, pos * duration),
                  trimSettings.start + 1
                );
                onTrimChange({ ...trimSettings, end: newEnd });
              };
              document.addEventListener("mousemove", endDrag);
              document.addEventListener(
                "mouseup",
                () => {
                  document.removeEventListener("mousemove", endDrag);
                },
                { once: true }
              );
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Start: {trimSettings.start}s</span>
          <span>End: {trimSettings.end}s</span>
        </div>
      </div> */}

      {/* Audio Controls */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Audio</label>
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-1 bg-gray-700 rounded text-sm"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'audio/*';
              input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                // Validate audio file format
                const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
                if (!validTypes.includes(file.type)) {
                  alert('Please select a valid audio file (MP3, WAV, or OGG)');
                  return;
                }
                
                console.log('Selected audio file:', file.name, file.type);
                onAudioChange(file);
              };
              input.click();
            }}
          >
            {audioFile ? 'Change Audio' : 'Add Audio'}
          </button>
          {audioFile && (
            <span className="text-xs text-gray-500 truncate">
              {audioFile.name}
            </span>
          )}
        </div>
        {audioFile && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audioVolume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                console.log('Volume changed:', newVolume);
                onVolumeChange(newVolume);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className={valueClasses}>
              Volume: {Math.round(audioVolume * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Crop Controls */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Crop Video</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Scale</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={cropSettings.scale}
              onChange={(e) =>
                onCropChange({ ...cropSettings, scale: Number(e.target.value) })
              }
              className={inputClasses}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Position X</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={cropSettings.x}
              onChange={(e) =>
                onCropChange({ ...cropSettings, x: Number(e.target.value) })
              }
              className={inputClasses}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Position Y</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={cropSettings.y}
              onChange={(e) =>
                onCropChange({ ...cropSettings, y: Number(e.target.value) })
              }
              className={inputClasses}
            />
            <div className={valueClasses}>Value: {cropSettings.y}</div>
          </div>
        </div>
      </div>

      {/* Text Overlay Controls */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Text Overlay</label>
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-1 bg-gray-700 rounded text-sm"
            onClick={() => onTextChange({ ...textOverlay, visible: !textOverlay.visible })}
          >
            {textOverlay.visible ? 'Hide Text' : 'Add Text'}
          </button>
        </div>

        {textOverlay.visible && (
          <div className="space-y-2">
            <input
              type="text"
              value={textOverlay.content}
              onChange={(e) => onTextChange({ ...textOverlay, content: e.target.value })}
              placeholder="Enter overlay text"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Position X</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textOverlay.x}
                  onChange={(e) => onTextChange({ ...textOverlay, x: Number(e.target.value) })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Position Y</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textOverlay.y}
                  onChange={(e) => onTextChange({ ...textOverlay, y: Number(e.target.value) })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={textOverlay.fontSize}
                  onChange={(e) => onTextChange({ ...textOverlay, fontSize: Number(e.target.value) })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Color</label>
                <input
                  type="color"
                  value={textOverlay.color}
                  onChange={(e) => onTextChange({ ...textOverlay, color: e.target.value })}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

VideoControls.propTypes = {
  onTrimChange: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  cropSettings: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  trimSettings: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
};
