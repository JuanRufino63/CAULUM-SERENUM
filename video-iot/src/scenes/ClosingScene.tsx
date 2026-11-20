import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneShell} from '../components/SceneShell';

const metrics = [
  ['2 s', 'Monitoramento contínuo', '#28d7ff'],
  ['3', 'Níveis de alerta', '#9b86ff'],
  ['A/V', 'Alerta visual e sonoro', '#ffd34d'],
  ['✓', 'Protótipo funcional', '#51e59d'],
] as const;

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneShell eyebrow="Resultados e encerramento">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, marginTop: 30}}>{metrics.map(([value, label, color], index) => <div key={label} style={{height: 200, borderRadius: 26, border: `1px solid ${color}35`, background: 'linear-gradient(150deg, rgba(20,28,58,.9), rgba(8,12,28,.8))', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', scale: spring({frame: frame - index * 12, fps, config: {damping: 17}}), boxShadow: `0 20px 55px ${color}12`}}><div style={{fontSize: 58, fontWeight: 800, color}}>{value}</div><div style={{fontSize: 21, color: '#b2bdd8', marginTop: 14}}>{label}</div></div>)}</div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 50, textAlign: 'center', opacity: interpolate(frame, [70, 105], [0, 1], {extrapolateRight: 'clamp'}), translate: `0 ${interpolate(frame, [70, 105], [30, 0], {extrapolateRight: 'clamp'})}px`}}>
        <div style={{fontSize: 88, fontWeight: 800, letterSpacing: -3}}>CAULUM <span style={{color: '#37dcff'}}>SERENUM</span></div>
        <div style={{fontSize: 34, color: '#c0cae4', marginTop: 24}}>Tecnologia para monitorar. Informação para prevenir.</div>
        <div style={{width: 280, height: 3, background: 'linear-gradient(90deg, #745cff, #28d7ff)', margin: '38px auto', boxShadow: '0 0 18px #28d7ff'}} />
        <div style={{fontSize: 22, color: '#7785aa', letterSpacing: 4}}>FIAP · GLOBAL SOLUTION 2026.2</div>
      </div>
    </SceneShell>
  );
};
