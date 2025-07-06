import { Composition, Audio } from 'remotion';
import MyVideo from './MyVideo';
import { Player } from '@remotion/player';
import { Audio } from 'remotion';

export const RemotionVideo = ({ clips, template, filter, trimSettings, cropSettings, audio, audioVolume }) => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyVideo}
        durationInFrames={template.duration * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ 
          clips, 
          template,
          filter: filter || {},
          trimSettings: trimSettings || {},
          cropSettings: cropSettings || { scale: 1, x: 0, y: 0 },
          audioVolume: audioVolume || 1
        }}
      />
      {audio && (
        <Player
          component={() => (
            <Audio
              src={URL.createObjectURL(audio)}
              volume={audioVolume || 1}
            />
          )}
          durationInFrames={Math.ceil(template.duration * 30)}
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          controls
          style={{ marginTop: '20px' }}
        />
      )}
    </>
  );
};
