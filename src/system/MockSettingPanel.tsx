import { SetStateAction, useAtom, WritableAtom } from 'jotai';
import { useState } from 'preact/hooks';
import { lockAtom } from '../atoms/lock';
import { debugAtom, loginAtom, solvedAtom } from '../atoms/problem-meta';
import { styled } from '../stitches.config';

const Wrap = styled('div', {
  padding: '1em 2em',
  marginTop: '1em',
  marginBottom: '2em',
  borderRadius: '0.5em',
  boxShadow: '4px 4px 10px 0px #a2a2a2aa',
  fontSize: '1.3rem',

  '& h2, & h3': {
    margin: 0,
  },
  '& h2': {
    textAlign: 'center',
    fontSize: '2.5rem',
  },
  '& h3': {
    fontSize: '1.5rem',
  },
});

const FieldGroup = styled('div', {
  background: '#e2e2e2',
  padding: '0.7rem 1rem',
  margin: '2rem 1rem',
});

const FieldWrap = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  margin: '4px',

  '& > input[type=checkbox]': {
    transform: 'scale(1.4)',
    verticalAlign: 'center',
    marginRight: '10px',
  },
});

export interface CheckboxProps
  extends Omit<
    JSX.HTMLAttributes<HTMLInputElement>,
    'type' | 'checked' | 'onInput'
  > {
  atom: WritableAtom<boolean, SetStateAction<boolean>>;
}
function Checkbox({ atom, ...props }: CheckboxProps) {
  const [isChecked, setChecked] = useAtom(atom);
  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.checked);
  }

  return (
    <input type="checkbox" checked={isChecked} onInput={onInput} {...props} />
  );
}

export function MockSettingPanel(): JSX.Element {
  return (
    <Wrap>
      <h2>BOJoke</h2>
      환영합니다! BOJoke는 Baekjoon Online Judge 같은 문제를 WYSIWIG 형식으로
      만들 수 있는 도구로, 다음과 같은 정보를 수정하실 수 있습니다.
      <ul>
        <li>문제 번호</li>
        <li> 문제 제목</li>
        <li> solved.ac 티어</li>
        <li>문제 제한 및 통계</li>
        <li>문제 본문 설명</li>
        <li>입출력 설명</li>
        <li>예제 (TODO)</li>
        <li>힌트/노트</li>
      </ul>
      <br />
      <small>
        *스타트링크의 인가를 받지 않은 프로젝트입니다. <br />
        *본 프로젝트를 사용해 만든 문제로 발생한 사건의 책임은 사용자에게
        있습니다. <br />
        *solved.ac는 shiftpsh.com의 상표입니다.
        <br />
        *Baekjoon Online Judge는 주식회사 스타트링크의 상표입니다.
      </small>
      <hr />
      <h2>설정</h2>
      <form>
        <FieldGroup>
          <h3>편집기</h3>
          <FieldWrap>
            <Checkbox id="lock" atom={lockAtom} />
            <label for="lock">편집기 잠금</label>
          </FieldWrap>
        </FieldGroup>

        <FieldGroup>
          <h3>사용자 상태</h3>
          <FieldWrap>
            <Checkbox id="solved" atom={solvedAtom} />
            <label for="solved">사용자가 문제를 해결함</label>
          </FieldWrap>
          <FieldWrap>
            <Checkbox id="login" atom={loginAtom} />
            <label for="login">사용자가 로그인을 함</label>
          </FieldWrap>
        </FieldGroup>

        <FieldGroup>
          <h3>문제 상태</h3>
          <FieldWrap>
            <Checkbox id="debug" atom={debugAtom} />
            <label for="debug">문제가 디버그를 지원함</label>
          </FieldWrap>
        </FieldGroup>
      </form>
    </Wrap>
  );
}
