import { styled } from '../stitches.config';

const Wrap = styled('blockquote', {
  fontSize: '17.5px',
  padding: '0 15px 5px 15px',
  borderLeft: '2px solid #eee',
  margin: '-16px 0 30px',
  '&:hover': {
    borderLeftColor: '#0076C0',
    transition: 'all 0.4s ease-in-out',
  },
});
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
    range: {
      gold: {
        color: '#ec9a00',
      },
    },
  },
});

export function SolvedAcTierSelect(): JSX.Element {
  return (
    <Wrap>
      <TierImage src="https://static.solved.ac/tier_small/15.svg" />{' '}
      <TierText range="gold">골드 I</TierText>
    </Wrap>
  );
}
