import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {GlassCard, SceneShell} from '../components/SceneShell';
import {DropletIcon, ThermometerIcon} from '../components/icons';

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const temperature = interpolate(frame, [20, durationInFrames - 45], [24, 39], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fill = interpolate(temperature, [20, 40], [8, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const heatColor = temperature < 30 ? '#56f3af' : temperature < 35 ? '#ffd84d' : '#ff5d6f';
  return (
    <SceneShell eyebrow="O problema" accent={heatColor}>
      <div style={{height: '100%', display: 'grid', gridTemplateColumns: '0.86fr 1.4fr', gap: 80, alignItems: 'center'}}>
        <GlassCard style={{height: 720, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'relative', width: 122, height: 520, border: '7px solid rgba(255,255,255,.22)', borderRadius: 80, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,.04)'}}>
            <div style={{position: 'absolute', left: 12, right: 12, bottom: 12, height: `${fill}%`, maxHeight: 490, borderRadius: 60, background: `linear-gradient(0deg, #ff5468, ${heatColor})`, boxShadow: `0 0 44px ${heatColor}`}} />
          </div>
          <div style={{marginLeft: 56}}>
            <div style={{fontSize: 120, fontWeight: 800, lineHeight: 1, color: heatColor, fontVariantNumeric: 'tabular-nums'}}>{temperature.toFixed(1)}°</div>
            <div style={{fontSize: 25, color: '#9ba9cf', marginTop: 18, letterSpacing: 2}}>TEMPERATURA EM ELEVAÇÃO</div>
          </div>
        </GlassCard>
        <div>
          <h2 style={{fontSize: 78, lineHeight: 1.08, margin: 0, letterSpacing: -2}}>Condições de calor<br/><span style={{color: '#37dcff'}}>exigem atenção.</span></h2>
          <p style={{fontSize: 34, lineHeight: 1.5, color: '#b9c3df', margin: '42px 0 44px', maxWidth: 860}}>Acompanhar temperatura e umidade ajuda a identificar mudanças no ambiente antes que elas passem despercebidas.</p>
          <div style={{display: 'flex', gap: 22}}>
            <GlassCard style={{padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 20, flex: 1}}><ThermometerIcon size={56}/><div><strong style={{fontSize: 28}}>Temperatura</strong><div style={{color: '#8f9dc3', fontSize: 20, marginTop: 6}}>variação térmica</div></div></GlassCard>
            <GlassCard style={{padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 20, flex: 1}}><DropletIcon size={56}/><div><strong style={{fontSize: 28}}>Umidade</strong><div style={{color: '#8f9dc3', fontSize: 20, marginTop: 6}}>condição do ar</div></div></GlassCard>
          </div>
          <div style={{fontSize: 18, color: '#7482a7', marginTop: 30}}>Abordagem demonstrativa para um protótipo acadêmico.</div>
        </div>
      </div>
    </SceneShell>
  );
};
