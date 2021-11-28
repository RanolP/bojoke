import { resetStyle } from './styles/reset';
import { typographyStyle } from './styles/typography';
import { ProblemTitleEditor } from './system/ProblemTitleEditor';
import { mathSelectStyle } from './lib/vendors/remirror/extension-math/style';
import { styled } from './stitches.config';
import { NavigationBar } from './system/NavigationBar';
import { MockSettingPanel } from './system/MockSettingPanel';
import { SolvedAcTierSelect } from './system/SolvedAcTierSelect';
import { ProblemInfoTable } from './system/ProblemInfoTable';

const TotalWrap = styled('div', {
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

const MainArea = styled('main', {
  padding: '40px 15px',
});

const TitleArea = styled('div', {
  borderBottom: '1px solid #eee',
});

export function App() {
  resetStyle();
  typographyStyle();
  mathSelectStyle();

  return (
    <TotalWrap>
      <MockSettingPanel />
      <MainArea>
        <NavigationBar
          id={10386}
          hasLogined={true}
          hasSolved={true}
          isDebugSupported={true}
        />
        <TitleArea>
          <ProblemTitleEditor />
          <SolvedAcTierSelect />
        </TitleArea>
        <ProblemInfoTable />
      </MainArea>
    </TotalWrap>
  );
}
