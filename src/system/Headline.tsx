import { styled } from '../stitches.config';

export const Headline = styled('h2', {
  borderBottom: '2px solid #0076C0',
  display: 'inline-block',
  fontWeight: 'normal',
  fontSize: '22px',
  paddingBottom: '5px',
  margin: '0 0 -5px 0',
  color: '#585f69',
  lineHeight: '33px',
  '&:first-of-type': {
    marginTop: '10px',
  },
});
