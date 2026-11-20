import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {TechBackground} from './TechBackground';

export const SceneShell: React.FC<{
  readonly eyebrow: string;
  readonly accent?: string;
  readonly children: React.ReactNode;
}> = ({eyebrow, accent = '#28d7ff', children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 12, durationInFrames - 12, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, Segoe UI, Arial, sans-serif', color: '#f6f8ff', opacity}}>
      <TechBackground accent={accent} />
      <div style={{position: 'absolute', left: 92, top: 68, display: 'flex', alignItems: 'center', gap: 16, color: accent, fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase'}}>
        <span style={{width: 42, height: 3, borderRadius: 2, backgroundColor: accent, boxShadow: `0 0 16px ${accent}`}} />
        {eyebrow}
      </div>
      <div style={{position: 'absolute', left: 92, right: 92, top: 132, bottom: 92}}>{children}</div>
      <div style={{position: 'absolute', left: 92, right: 92, bottom: 46, height: 2, backgroundColor: 'rgba(255,255,255,0.09)'}}>
        <div style={{width: `${interpolate(frame, [0, durationInFrames], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, height: '100%', background: `linear-gradient(90deg, #745cff, ${accent})`, boxShadow: `0 0 12px ${accent}`}} />
      </div>
    </AbsoluteFill>
  );
};

export const GlassCard: React.FC<{readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: 'linear-gradient(145deg, rgba(18,24,52,0.9), rgba(8,12,30,0.78))', border: '1px solid rgba(154,178,255,0.18)', boxShadow: '0 28px 80px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)', borderRadius: 30, ...style}}>{children}</div>
);
