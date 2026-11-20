import {Video} from '@remotion/media';
import {Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';

const source = 'gravações/2026-11-19 19-53-41.mp4';

const ClipLabel: React.FC<{readonly label: string; readonly color: string}> = ({label, color}) => (
  <div style={{position: 'absolute', top: 26, right: 28, padding: '12px 22px', borderRadius: 99, color, backgroundColor: 'rgba(5,8,20,.88)', border: `1px solid ${color}66`, fontSize: 21, fontWeight: 800, letterSpacing: 1, boxShadow: `0 0 24px ${color}25`}}>{label}</div>
);

export const WokwiScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="Demonstração real — Simulação Wokwi" accent={frame < 170 ? '#51e59d' : frame < 350 ? '#ffd34d' : '#ff5c70'}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 10, fontSize: 48, fontWeight: 800}}>Protótipo em funcionamento</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 90, height: 690, borderRadius: 34, overflow: 'hidden', border: '1px solid rgba(151,174,255,.28)', boxShadow: '0 36px 100px rgba(0,0,0,.48)', backgroundColor: '#0c1024'}}>
        <div style={{position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0, height: 50, backgroundColor: 'rgba(7,10,24,.92)', display: 'flex', alignItems: 'center', paddingLeft: 22, gap: 10}}>{['#ff6475', '#ffd34d', '#51e59d'].map((color) => <span key={color} style={{width: 13, height: 13, borderRadius: 99, backgroundColor: color}} />)}<span style={{marginLeft: 16, color: '#7f8bad', fontSize: 17}}>wokwi.com · circuito ESP32</span></div>
        <Sequence durationInFrames={170}><Video src={staticFile(source)} trimBefore={30} volume={0.08} objectFit="cover" style={{width: '100%', height: '100%', paddingTop: 50, boxSizing: 'border-box'}}/><ClipLabel label="NORMAL · LED VERDE" color="#51e59d"/></Sequence>
        <Sequence from={170} durationInFrames={180}><Video src={staticFile(source)} trimBefore={1050} volume={0.08} objectFit="cover" style={{width: '100%', height: '100%', paddingTop: 50, boxSizing: 'border-box'}}/><ClipLabel label="ATENÇÃO · LED AMARELO" color="#ffd34d"/></Sequence>
        <Sequence from={350} durationInFrames={260}><Video src={staticFile(source)} trimBefore={1350} volume={0.1} objectFit="cover" style={{width: '100%', height: '100%', paddingTop: 50, boxSizing: 'border-box'}}/><ClipLabel label="CRÍTICO · LED VERMELHO + BUZZER" color="#ff5c70"/></Sequence>
      </div>
      <div style={{position: 'absolute', bottom: 4, left: 0, fontSize: 18, color: '#7986aa'}}>Captura real fornecida · trechos editados da mesma simulação</div>
      <div style={{position: 'absolute', bottom: 4, right: 0, fontSize: 18, color: '#7986aa'}}>Limiares demonstrativos · não são parâmetros clínicos oficiais</div>
    </SceneShell>
  );
};
