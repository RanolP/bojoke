
import { FaPlus } from 'react-icons/fa';
import { styled } from '../stitches.config';

const StyledButton = styled('button', {
  border: 'none',
  borderRadius: '0.25rem',
  background: '#e2e2f2',

  padding: '0.3rem 1.5rem',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',

  '&:hover': {
    background: '#d2d2f2',
  },
  '&:active': {
    background: '#a2a2f2',
  },
});
const StyledFaPlus = styled(FaPlus, {
  marginRight: '0.3rem',
});

export function AddSampleButton(): JSX.Element {
  return (
    <StyledButton>
      <StyledFaPlus />
      예제 추가
    </StyledButton>
  );
}
