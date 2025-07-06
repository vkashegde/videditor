import { renderMedia, selectComposition } from '@remotion/renderer';
import MyVideo from '../Video/MyVideo';

export async function exportVideo({
  clips,
  template,
  filter,
  trimSettings,
  cropSettings,
  audio,
  audioVolume,
  onProgress
}) {
  try {
    const composition = await selectComposition({
      component: MyVideo,
      durationInFrames: template.duration * 30,
      fps: 30,
      height: 1280,
      width: 720,
      props: {
        clips,
        template,
        filter,
        trimSettings,
        cropSettings,
        audio,
        audioVolume
      }
    });

    const outputPath = 'output.mp4';
    await renderMedia({
      composition,
      outputPath,
      codec: 'h264',
      onProgress: ({ progress }) => {
        onProgress(Math.floor(progress * 100));
      }
    });

    return outputPath;
  } catch (error) {
    console.error('Error exporting video:', error);
    throw error;
  }
}