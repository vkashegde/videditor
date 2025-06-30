import { Sequence, Video, AbsoluteFill } from "remotion";
import { useMemo } from "react";
import PropTypes from "prop-types";

export default function MyVideo({ clips, template, filter, trimSettings, cropSettings }) {
  // Validate clips object is not empty
  const hasClips = Object.keys(clips).length > 0;
  let currentStart = 0;

  // 👇 Memoize object URLs to avoid flickering
  const videoUrls = useMemo(() => {
    const result = {};
    Object.keys(clips).forEach((id) => {
      result[id] = URL.createObjectURL(clips[id]);
    });
    return result;
  }, [clips]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', width: '100%' }}>
      {!hasClips && (
        <div className="w-full h-full flex items-center justify-center text-white text-xl">
          Please upload video clips to begin
        </div>
      )}
      {template.scenes.map((scene) => {
        const startFrame = currentStart;
        const durationFrames = scene.duration * 30;
        currentStart += durationFrames;

        if (scene.type === "text") {
          return (
            <Sequence
              key={scene.id}
              from={startFrame}
              durationInFrames={durationFrames}
            >
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-6xl font-bold">
                {scene.content}
              </div>
            </Sequence>
          );
        }

        if (scene.type === "video" && videoUrls[scene.id]) {
          return (
            <Sequence
              key={scene.id}
              from={startFrame}
              durationInFrames={durationFrames}
            >
              <div 
                style={{
                  ...filter,
                  transform: `scale(${cropSettings.scale}) translate(${cropSettings.x}px, ${cropSettings.y}px)`,
                  transformOrigin: 'center',
                  overflow: 'hidden'
                }}
              >
                <Video 
                  src={videoUrls[scene.id]}
                  startFrom={Math.floor(trimSettings.start * 30)}
                  endAt={Math.floor(trimSettings.end * 30)}
                />
              </div>
            </Sequence>
          );
        }

        return null;
      })}
    </AbsoluteFill>
  );
}

MyVideo.propTypes = {
  clips: PropTypes.objectOf(PropTypes.instanceOf(File)).isRequired,
  template: PropTypes.shape({
    scenes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'video']).isRequired,
        duration: PropTypes.number.isRequired,
        content: PropTypes.string,
        transition: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  filter: PropTypes.object,
  trimSettings: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  }).isRequired,
  cropSettings: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
