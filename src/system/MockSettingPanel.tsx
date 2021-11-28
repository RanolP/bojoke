import { styled } from '../stitches.config';

const Wrap = styled('div', {
  padding: '1em 2em',
  marginTop: '1em',
  marginBottom: '2em',
  borderRadius: '0.5em',
  boxShadow: '4px 4px 10px 0px #a2a2a2aa',
});

const Heading = styled('h2', {
  textAlign: 'center',
  marginTop: 0,
});

export function MockSettingPanel(): JSX.Element {
  return (
    <Wrap>
      <Heading>설정</Heading>
      <form>
        <div>
          <label>로그인함</label>
          <div>
            <label>문제 해결함</label>
          </div>
        </div>
        <div>
          <label>디버그 기능 활성화함</label>
        </div>
      </form>
    </Wrap>
  );
}
