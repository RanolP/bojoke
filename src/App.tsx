import { resetStyle } from './styles/reset';
import { typographyStyle } from './styles/typography';
import { ProblemTitleEditor } from './system/ProblemTitleEditor';
import { mathSelectStyle } from './lib/vendors/remirror/extension-math/style';
import { styled } from './stitches.config';
import { NavigationBar } from './system/NavigationBar';

const Wrap = styled('main', {
  padding: '40px 15px',
  margin: '0 auto',
  '@media (min-width: 768px)': {
    width: '750px',
  },
  '@media (min-width: 992px)': {
    width: '970px',
  },
  '@media (min-width: 1200px)': {
    width: '1170px',
  },
});

export function App() {
  resetStyle();
  typographyStyle();
  mathSelectStyle();

  return (
    <Wrap>
      <NavigationBar
        id={10386}
        hasLogined={true}
        hasSolved={true}
        isDebugSupported={true}
      />
      <ProblemTitleEditor />
    </Wrap>
  );
}
