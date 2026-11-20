import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {GlassCard, SceneShell} from '../components/SceneShell';
import {AlertIcon, ChipIcon, DisplayIcon, DropletIcon} from '../components/icons';

const nodes = [
  {label: 'DHT22', detail: 'temperatura + umidade', color: '#28d7ff', icon: DropletIcon},
  {label: 'ESP32', detail: 'leitura e processamento', color: '#9b86ff', icon: ChipIcon},
  {label: 'Classificação', detail: 'regras locais', color: '#ffd84d', icon: AlertIcon},
  {label: 'Alertas', detail: 'LCD · LEDs · buzzer', color: '#61f7ac', icon: DisplayIcon},
] as const;

export const IotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneShell eyebrow="Como funciona o IoT">
      <h2 style={{fontSize: 66, margin: '14px 0 54px', letterSpacing: -2}}>Do ambiente ao alerta, <span style={{color: '#37dcff'}}>tudo acontece localmente.</span></h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, position: 'relative'}}>
        <div style={{position: 'absolute', left: 190, right: 190, top: 94, height: 3, background: 'linear-gradient(90deg, #28d7ff, #9b86ff, #ffd84d, #61f7ac)', opacity: interpolate(frame, [18, 78], [0, 1], {extrapolateRight: 'clamp'}), scale: `${interpolate(frame, [18, 78], [0, 1], {extrapolateRight: 'clamp'})} 1`, transformOrigin: 'left'}} />
        {nodes.map(({label, detail, color, icon: Icon}, index) => {
          const scale = spring({frame: frame - 12 - index * 16, fps, config: {damping: 18}});
          return <GlassCard key={label} style={{height: 250, padding: 30, textAlign: 'center', position: 'relative', scale, borderColor: `${color}36`}}><div style={{width: 94, height: 94, margin: '-4px auto 22px', borderRadius: 99, backgroundColor: `${color}16`, display: 'grid', placeItems: 'center', boxShadow: `0 0 30px ${color}20`}}><Icon color={color} size={62}/></div><div style={{fontSize: 31, fontWeight: 800}}>{label}</div><div style={{fontSize: 19, color: '#93a0c5', marginTop: 9}}>{detail}</div></GlassCard>;
        })}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 54}}>
        {[['2 s', 'entre leituras'], ['2', 'variáveis'], ['3', 'níveis de alerta'], ['1', 'botão para silenciar']].map(([value, label], index) => <div key={label} style={{padding: '24px 28px', borderLeft: `3px solid ${nodes[index].color}`, backgroundColor: 'rgba(255,255,255,.035)', borderRadius: '0 18px 18px 0'}}><div style={{fontSize: 48, fontWeight: 800, color: nodes[index].color}}>{value}</div><div style={{fontSize: 20, color: '#aeb9d7', marginTop: 5}}>{label}</div></div>)}
      </div>
      <div style={{position: 'absolute', bottom: 2, right: 0, fontSize: 18, color: '#6f7da2'}}>Processamento 100% local no ESP32</div>
    </SceneShell>
  );
};
