import { useMemo } from "react";
import PropTypes from "prop-types";
import { Video, Sequence, AbsoluteFill, Audio } from "remotion";
import { useVideoConfig } from "remotion";

export default function MyVideo({ clips, template, filter, trimSettings, cropSettings, audio, textOverlay }) {
  // Validate clips object is not empty
  const hasClips = Object.keys(clips).length > 0;
  let currentStart = 0;
  const { fps } = useVideoConfig();

  // 👇 Memoize object URLs to avoid flickering
  const videoUrls = useMemo(() => {
    const result = {};
    Object.keys(clips).forEach((id) => {
      if (clips[id]?.file) {
        result[id] = URL.createObjectURL(clips[id].file);
      }
    });
    return result;
  }, [clips]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', width: '100%' }}>
      {audio && (
        <Audio
          src={audio.src}
          volume={audio.volume}
          startFrom={audio.startFrom}
          endAt={audio.endAt}
        />
      )}
      
      {textOverlay?.visible && textOverlay.content && (
        <div 
          style={{
            position: 'absolute',
            left: `${textOverlay.x}%`,
            top: `${textOverlay.y}%`,
            fontSize: `${textOverlay.fontSize}px`,
            color: textOverlay.color,
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          {textOverlay.content}
        </div>
      )}
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
                  startFrom={Math.floor((trimSettings[scene.id]?.start || 0) * 30)}
                  endAt={Math.floor((trimSettings[scene.id]?.end || scene.duration) * 30)}
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
  clips: PropTypes.objectOf(PropTypes.shape({
    file: PropTypes.instanceOf(File),
    trim: PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number
    })
  })).isRequired,
  audio: PropTypes.shape({
    src: PropTypes.string,
    volume: PropTypes.number,
    startFrom: PropTypes.number,
    endAt: PropTypes.number
  }),
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
  }).isRequired,
  textOverlay: PropTypes.shape({
    content: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    visible: PropTypes.bool
  })
};
