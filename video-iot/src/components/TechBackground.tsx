import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const particles = [
  [8, 18, 4], [15, 72, 3], [24, 41, 5], [34, 84, 3], [42, 12, 4], [51, 64, 3],
  [59, 28, 5], [68, 77, 4], [76, 45, 3], [84, 16, 4], [91, 69, 5], [96, 34, 3],
] as const;

export const TechBackground: React.FC<{accent?: string}> = ({accent = '#28d7ff'}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#060815', overflow: 'hidden'}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(91,116,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(91,116,255,0.055) 1px, transparent 1px)', backgroundSize: '72px 72px', opacity: 0.7}} />
      <div style={{position: 'absolute', width: 900, height: 900, left: -280, top: -360, borderRadius: 999, background: 'radial-gradient(circle, rgba(91,75,255,0.24), transparent 68%)'}} />
      <div style={{position: 'absolute', width: 1000, height: 1000, right: -360, bottom: -520, borderRadius: 999, background: `radial-gradient(circle, ${accent}2b, transparent 66%)`}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 12%, rgba(255,255,255,0.018) 50%, transparent 82%)', translate: `${interpolate(frame, [0, 450], [-500, 500], {extrapolateRight: 'extend'})}px 0px`}} />
      {particles.map(([x, y, size], index) => (
        <div key={`${x}-${y}`} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: 99, backgroundColor: index % 3 === 0 ? '#8f79ff' : accent, opacity: 0.22 + 0.25 * Math.sin((frame + index * 17) / 24), boxShadow: `0 0 16px ${accent}`}} />
      ))}
    </AbsoluteFill>
  );
};
