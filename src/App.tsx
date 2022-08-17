import { resetStyle } from './styles/reset';
import { typographyStyle } from './styles/typography';
import { ProblemTitleEditor } from './system/ProblemTitleEditor';
import { mathSelectStyle } from './lib/vendors/remirror/extension-math/style';
import { styled } from './stitches.config';
import { NavigationBar } from './system/NavigationBar';
import { MockSettingPanel } from './system/MockSettingPanel';
import { SolvedAcTierSelect } from './system/SolvedAcTierSelect';
import { ProblemInfoTable } from './system/ProblemInfoTable';
import { Headline } from './system/Headline';
import { MainTextEditor } from './system/MainTextEditor';
import { useState } from 'preact/hooks';
import { useLocked } from './hooks/useLocked';
import { AddSampleButton } from './system/AddSampleButton';
import { SampleEditor } from './system/SampleEditor';

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

const ProblemArea = styled('div', {
  padding: '40px 15px',
});

const TitleArea = styled('div', {
  borderBottom: '1px solid #eee',
});

const MainTextArea = styled('main', {});

export function App() {
  resetStyle();
  typographyStyle();
  mathSelectStyle();

  const readonly = useLocked();

  return (
    <TotalWrap>
      <MockSettingPanel />
      <ProblemArea>
        <NavigationBar />
        <TitleArea>
          <ProblemTitleEditor />
          <SolvedAcTierSelect />
        </TitleArea>
        <ProblemInfoTable />
        <MainTextArea>
          <Headline>문제</Headline>
          <MainTextEditor
            id="main-text/description"
            initialContent="두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오."
          />
          <Headline>입력</Headline>
          <MainTextEditor
            id="main-text/input"
            initialContent="첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)"
          />
          <Headline>출력</Headline>
          <MainTextEditor
            id="main-text/output"
            initialContent="첫째 줄에 A+B를 출력한다."
          />
          {!readonly && <AddSampleButton />}
          <SampleEditor sampleId={1} />
          <Headline>힌트/노트</Headline>
          <MainTextEditor
            id="main-text/example"
            initialContent="여기를 누르면 1000번 예제 소스를 볼 수 있습니다."
          />
          <Headline>출처</Headline>
          <p>이건 또 어떻게 넣냐</p>
          <Headline>비슷한 문제</Headline>
          <p>이건 또 어떻게 넣냐</p>
          <Headline>알고리즘 분류</Headline>
          <p>이건 또 어떻게 넣냐</p>
        </MainTextArea>
      </ProblemArea>
    </TotalWrap>
  );
}
