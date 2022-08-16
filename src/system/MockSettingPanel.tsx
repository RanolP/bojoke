import { useAtom } from 'jotai';
import { lockAtom } from '../atoms/lock';
import { styled } from '../stitches.config';

const Wrap = styled('div', {
  padding: '1em 2em',
  marginTop: '1em',
  marginBottom: '2em',
  borderRadius: '0.5em',
  boxShadow: '4px 4px 10px 0px #a2a2a2aa',
  fontSize: '1.5rem',
});

const Heading = styled('h2', {
  textAlign: 'center',
  margin: 0,
  fontSize: '3rem',
});

export function MockSettingPanel(): JSX.Element {
  const [isLocked, setLocked] = useAtom(lockAtom);

  function onLockInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    setLocked(e.currentTarget.checked);
  }

  return (
    <Wrap>
      <Heading>BOJoke</Heading>
      환영합니다! BOJoke는 백준 문제를 WYSIWIG 형식으로 만들 수 있는 도구입니다.
      <hr />
      <Heading>설정</Heading>
      <form>
        <div>
          <label>로그인함</label>
          <div>
            <label>문제 해결함</label>
          </div>
        </div>
        <div>
          <input
            id="lock"
            type="checkbox"
            checked={isLocked}
            onInput={onLockInput}
          />
          <label for="lock">잠금</label>
        </div>
      </form>
    </Wrap>
  );
}
