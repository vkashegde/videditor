import { Composition } from 'remotion';
import MyVideo from './MyVideo';

export const RemotionVideo = ({ clips, template }) => {
  return (
    <Composition
      id="MyComp"
      component={MyVideo}
      durationInFrames={template.duration * 30}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ clips, template }}
    />
  );
};
