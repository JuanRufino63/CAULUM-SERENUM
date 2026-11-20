import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneShell} from '../components/SceneShell';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 16, stiffness: 90}});
  return (
    <SceneShell eyebrow="Global Solution · FIAP 2026.2">
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center'}}>
        <div style={{position: 'relative', width: 180, height: 180, marginBottom: 42, scale: reveal}}>
          {[0, 1, 2].map((ring) => <div key={ring} style={{position: 'absolute', inset: ring * 22, borderRadius: 999, border: `2px solid ${ring === 1 ? '#8e72ff' : '#28d7ff'}`, opacity: 0.38 + ring * 0.15, rotate: `${frame * (ring % 2 === 0 ? 0.25 : -0.32)}deg`, boxShadow: '0 0 30px rgba(40,215,255,0.18)'}} />)}
          <div style={{position: 'absolute', inset: 58, borderRadius: 999, background: 'linear-gradient(135deg, #7c5cff, #28d7ff)', boxShadow: '0 0 50px rgba(40,215,255,.55)'}} />
        </div>
        <h1 style={{fontSize: 112, lineHeight: 0.95, margin: 0, letterSpacing: -4, fontWeight: 800, opacity: interpolate(frame, [8, 28], [0, 1], {extrapolateRight: 'clamp'}), translate: `0 ${interpolate(frame, [8, 28], [40, 0], {extrapolateRight: 'clamp'})}px`}}>CAULUM <span style={{color: '#37dcff'}}>SERENUM</span></h1>
        <div style={{fontSize: 38, marginTop: 30, color: '#c9d2f1', letterSpacing: 3, opacity: interpolate(frame, [22, 46], [0, 1], {extrapolateRight: 'clamp'})}}>MONITORAMENTO INTELIGENTE DE CALOR</div>
        <div style={{marginTop: 48, padding: '14px 28px', borderRadius: 99, border: '1px solid rgba(55,220,255,.28)', backgroundColor: 'rgba(55,220,255,.07)', color: '#9deeff', fontSize: 22, letterSpacing: 2}}>IoT · ESP32 · SENSORIAMENTO AMBIENTAL</div>
      </div>
    </SceneShell>
  );
};
