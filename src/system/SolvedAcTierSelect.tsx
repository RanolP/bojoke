import { CSS } from '@stitches/react';
import { useState } from 'preact/hooks';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { useLocked } from '../hooks/useLocked';
import { styled } from '../stitches.config';

const Wrap = styled('blockquote', {
  fontSize: '17.5px',

  padding: '0 15px 5px 15px',
  borderLeft: '2px solid #eee',
  margin: '-16px 0 30px',

  position: 'relative',
  zIndex: 1,

  '&:hover': {
    borderLeftColor: '#0076C0',
    transition: 'all 0.4s ease-in-out',
  },
});

const Tier = Object.freeze({
  NoRate: 'no-rate',
  Bronze: 'bronze',
  Silver: 'silver',
  Gold: 'gold',
  Platinum: 'platinum',
  Diamond: 'diamond',
  Ruby: 'ruby',
} as const);
type Tier = typeof Tier[keyof typeof Tier];

const TiersLabel: Record<Tier, string> = {
  [Tier.NoRate]: '',
  [Tier.Bronze]: '브론즈',
  [Tier.Silver]: '실버',
  [Tier.Gold]: '골드',
  [Tier.Platinum]: '플래티넘',
  [Tier.Diamond]: '다이아몬드',
  [Tier.Ruby]: '루비',
};
const TiersLeveledList = [
  [Tier.NoRate, '난이도를 매길 수 없음'] as const,
  [Tier.NoRate, '난이도 정보 없음'] as const,
  ...Object.values(Tier)
    .slice(1)
    .flatMap((tier) =>
      ['V', 'IV', 'III', 'II', 'I'].map(
        (level) => [tier, `${TiersLabel[tier]} ${level}`] as const,
      ),
    ),
];
const TierColors: Record<Tier, CSS> = {
  [Tier.NoRate]: { color: '#000000' },
  [Tier.Bronze]: { color: '#ad5600' },
  [Tier.Silver]: { color: '#435f7a' },
  [Tier.Gold]: { color: '#ec9a00' },
  [Tier.Platinum]: { color: '#27e2a4' },
  [Tier.Diamond]: { color: '#00b4fc' },
  [Tier.Ruby]: { color: '#ff0062' },
};

const TierImage = styled('img', {
  width: '0.936em',
  height: '1.2em',
  verticalAlign: 'bottom',
});
const TierText = styled('span', {
  fontSize: '18px',
  margin: '0 0 8px',
  lineHeight: '24px',

  variants: {
    range: TierColors,
  },
});
const TierSelect = styled('select', {
  border: 'none',
  background: 'transparent',
  fontFamily: 'inherit',

  fontSize: '18px',
  margin: '1.3px 0 1.5px -4px',
  lineHeight: '24px',

  variants: {
    range: TierColors,
  },
  padding: 0,
});
const TierOption = styled('option', {
  variants: {
    range: TierColors,
  },
  '&:nth-of-type(2n)': {
    background: '#e2e2e2',
  },
  '&:nth-of-type(2n+1)': {
    background: '#f2f2f2',
  },
});

export function SolvedAcTierSelect(): JSX.Element {
  const readonly = useLocked();

  const [tierId, setTierId] = useState(15);

  const index = tierId + 1;
  const [tier, label] = TiersLeveledList[index];
  const tierImage = `https://static.solved.ac/tier_small/${Math.max(
    0,
    tierId,
  )}.svg`;

  const { onFocus } = useGlobalFocus('tier');

  function onInput(e: JSX.TargetedEvent<HTMLSelectElement>) {
    setTierId(Number(e.currentTarget.value));
  }

  return (
    <Wrap>
      <TierImage src={tierImage} />{' '}
      {readonly ? (
        <TierText range={tier}>{label}</TierText>
      ) : (
        <TierSelect
          range={tier}
          value={tierId}
          onInput={onInput}
          onFocus={onFocus}
        >
          {Array.from({ length: TiersLeveledList.length })
            .map((_, i) => TiersLeveledList[i])
            .map(([tier, label], i) => (
              <TierOption range={tier} value={i - 1}>
                {label}
              </TierOption>
            ))}
        </TierSelect>
      )}
    </Wrap>
  );
}
