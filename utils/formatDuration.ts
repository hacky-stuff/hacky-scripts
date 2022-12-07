import color from './color.ts';

export const formatDuration = (duration: number) => {
  if (duration > 3600) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.round(duration % 60);
    return color.red(`${h}h ${m}m ${s}s`);
  }
  if (duration > 60) {
    const m = Math.floor(duration / 60);
    const s = Math.round(duration % 60);
    return color.yellow(`${m}m ${s}s`);
  }
  const s = Math.round(duration);
  return color.green(`${s}s`);
};
