import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {GlassCard, SceneShell} from '../components/SceneShell';

const scenarios = [
  {temperature: 26.5, humidity: 52, status: 'NORMAL', color: '#51e59d'},
  {temperature: 31.2, humidity: 60, status: 'ATENÇÃO', color: '#ffd34d'},
  {temperature: 36.4, humidity: 78, status: 'CRÍTICO', color: '#ff5c70'},
] as const;

export const AppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const segment = durationInFrames / 3;
  const index = Math.min(2, Math.floor(frame / segment));
  const current = scenarios[index];
  const local = frame - index * segment;
  const opacity = interpolate(local, [0, 12, segment - 12, segment], [0.3, 1, 1, 0.3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chartProgress = interpolate(local, [10, segment - 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell eyebrow="Interface simulada" accent={current.color}>
      <div style={{height: '100%', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 90, alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 23, color: current.color, fontWeight: 700, letterSpacing: 3}}>CENÁRIO {index + 1} DE 3</div>
          <h2 style={{fontSize: 68, lineHeight: 1.08, margin: '20px 0 30px'}}>Informação clara<br/>em <span style={{color: current.color}}>cada estado.</span></h2>
          <p style={{fontSize: 30, lineHeight: 1.5, color: '#aeb9d7', maxWidth: 700}}>Uma proposta visual de como temperatura, umidade e alertas poderiam ser apresentados ao usuário.</p>
          <div style={{display: 'flex', gap: 14, marginTop: 46}}>{scenarios.map((item, itemIndex) => <div key={item.status} style={{height: 12, flex: 1, maxWidth: 150, borderRadius: 99, backgroundColor: item.color, opacity: itemIndex === index ? 1 : 0.18, boxShadow: itemIndex === index ? `0 0 20px ${item.color}` : 'none'}} />)}</div>
        </div>
        <div style={{height: 820, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity}}>
          <div style={{width: 500, height: 790, borderRadius: 66, border: '10px solid #232945', background: 'linear-gradient(180deg, #10162e, #080c1d)', boxShadow: `0 42px 100px rgba(0,0,0,.5), 0 0 70px ${current.color}18`, padding: '58px 34px 34px', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 17, left: 175, width: 150, height: 28, borderRadius: 99, backgroundColor: '#242943'}} />
            <div style={{fontSize: 18, color: '#8491b5', letterSpacing: 2}}>CAULUM SERENUM</div>
            <div style={{fontSize: 31, fontWeight: 800, marginTop: 8}}>Painel de Monitoramento</div>
            <GlassCard style={{padding: 26, marginTop: 30, borderColor: `${current.color}42`}}>
              <div style={{fontSize: 17, color: '#8190b4'}}>TEMPERATURA</div><div style={{fontSize: 72, fontWeight: 800, color: current.color, marginTop: 8, fontVariantNumeric: 'tabular-nums'}}>{current.temperature.toFixed(1).replace('.', ',')}°C</div>
              <div style={{height: 1, backgroundColor: 'rgba(255,255,255,.08)', margin: '20px 0'}} />
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}><div><div style={{fontSize: 16, color: '#8190b4'}}>UMIDADE</div><div style={{fontSize: 38, fontWeight: 700, marginTop: 5}}>{current.humidity}%</div></div><div style={{padding: '10px 16px', borderRadius: 99, backgroundColor: `${current.color}20`, color: current.color, fontSize: 18, fontWeight: 800}}>{current.status}</div></div>
            </GlassCard>
            <div style={{marginTop: 25, fontSize: 16, color: '#8190b4'}}>EVOLUÇÃO DA TEMPERATURA</div>
            <svg viewBox="0 0 420 130" width="100%" height="150" style={{marginTop: 8, overflow: 'visible'}}><path d="M5 105 C45 98, 65 82, 105 88 S170 52, 220 67 S285 28, 335 42 S390 15, 415 23" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="18" strokeLinecap="round"/><path d="M5 105 C45 98, 65 82, 105 88 S170 52, 220 67 S285 28, 335 42 S390 15, 415 23" fill="none" stroke={current.color} strokeWidth="7" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - chartProgress} style={{filter: `drop-shadow(0 0 8px ${current.color})`}}/></svg>
            <div style={{position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center', fontSize: 14, color: '#7f8bad'}}>Interface conceitual — dados simulados</div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
