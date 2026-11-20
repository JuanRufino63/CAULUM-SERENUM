type IconProps = {readonly color?: string; readonly size?: number};

export const ThermometerIcon: React.FC<IconProps> = ({color = '#ff6b70', size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none"><path d="M30 14a8 8 0 0 1 16 0v27.5a15 15 0 1 1-16 0V14Z" stroke={color} strokeWidth="5"/><path d="M38 26v23" stroke={color} strokeWidth="6" strokeLinecap="round"/><circle cx="38" cy="54" r="7" fill={color}/></svg>
);

export const DropletIcon: React.FC<IconProps> = ({color = '#28d7ff', size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none"><path d="M36 8C29 20 18 31 18 44a18 18 0 0 0 36 0C54 31 43 20 36 8Z" stroke={color} strokeWidth="5"/><path d="M27 46c1 6 5 9 11 10" stroke={color} strokeWidth="4" strokeLinecap="round" opacity=".65"/></svg>
);

export const ChipIcon: React.FC<IconProps> = ({color = '#9b86ff', size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none"><rect x="17" y="17" width="38" height="38" rx="7" stroke={color} strokeWidth="5"/><rect x="27" y="27" width="18" height="18" rx="3" fill={color} opacity=".25"/><path d="M25 8v9M36 8v9M47 8v9M25 55v9M36 55v9M47 55v9M8 25h9M8 36h9M8 47h9M55 25h9M55 36h9M55 47h9" stroke={color} strokeWidth="4" strokeLinecap="round"/></svg>
);

export const DisplayIcon: React.FC<IconProps> = ({color = '#61f7ac', size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none"><rect x="9" y="15" width="54" height="38" rx="6" stroke={color} strokeWidth="5"/><path d="M24 62h24M31 53v9M41 53v9" stroke={color} strokeWidth="5" strokeLinecap="round"/><path d="M18 28h20M18 39h34" stroke={color} strokeWidth="4" strokeLinecap="round" opacity=".7"/></svg>
);

export const AlertIcon: React.FC<IconProps> = ({color = '#ffd84d', size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none"><path d="M36 9 65 61H7L36 9Z" stroke={color} strokeWidth="5" strokeLinejoin="round"/><path d="M36 28v14" stroke={color} strokeWidth="6" strokeLinecap="round"/><circle cx="36" cy="51" r="3.5" fill={color}/></svg>
);
