import color from './color.ts';

export const formatDuration = (duration: number) => {
  if (!duration && duration !== 0) {
    return '';
  }
  if (duration >= 3600 || duration <= -3600) {
    const h = duration > 0
      ? Math.floor(duration / 3600)
      : Math.ceil(duration / 3600);
    const m = Math.floor(Math.abs(duration) % 3600 / 60);
    const s = Math.abs(Math.round(duration % 60));
    return color.red(`${h}h ${m}m ${s}s`);
  }
  if (duration >= 60 || duration <= -60) {
    const m = duration > 0
      ? Math.floor(duration / 60)
      : Math.ceil(duration / 60);
    const s = Math.abs(Math.round(duration % 60));
    return color.yellow(`${m}m ${s}s`);
  }
  const s = Math.round(duration);
  return color.green(`${s}s`);
};
