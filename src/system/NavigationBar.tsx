import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'preact/hooks';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { infoAtom } from '../atoms/info';
import { debugAtom, loginAtom, solvedAtom } from '../atoms/problem-meta';
import { styled } from '../stitches.config';
import { NumericInput } from './NumericInput';

const NavList = styled('ul', {
  paddingLeft: 0,
  margin: 0,
  listStyle: 'none',
  display: 'table',
  '& li': {
    float: 'left',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '13px',
    lineHeight: 1.6,
  },
  '& li.active': {
    color: '#fff',
    backgroundColor: '#428bca',
  },
  '& li:not(.active):hover': {
    color: '#0076C0',
    backgroundColor: '#eee',
  },
  '& li + li': {
    marginLeft: '2px',
  },
});

const ExternalLinkIcon = styled(FaExternalLinkAlt, {
  verticalAlign: 'sub',
});

const Caret = styled('b', {
  display: 'inline-block',
  width: 0,
  height: 0,
  marginLeft: '2px',
  verticalAlign: 'middle',
  borderTop: '4px solid',
  borderRight: '4px solid transparent',
  borderLeft: '4px solid transparent',
});

export function NavigationBar(): JSX.Element {
  const [info, dispatch] = useAtom(infoAtom);

  const hasLogined = useAtomValue(loginAtom);
  const hasSolved = useAtomValue(solvedAtom);
  const isDebugSupported = useAtomValue(debugAtom);

  return (
    <nav>
      <NavList>
        <li className="active">
          <NumericInput
            id="problem-id"
            value={info.problemId}
            setValue={(value) =>
              dispatch({ type: 'SET_PROBLEM_ID', value })
            }
            placeholder="1000"
            context="problem-id"
            pattern="(0|[1-9][0-9]*)"
          />
          번
        </li>
        <li>제출</li>
        <li>맞힌 사람</li>
        <li>숏코딩</li>
        <li>재채점 결과</li>
        {isDebugSupported && <li>디버그</li>}
        <li>채점 현황</li>
        {hasLogined && <li>내 제출</li>}
        {hasSolved && (
          <li>
            {' '}
            <ExternalLinkIcon /> 난이도 기여
          </li>
        )}
        <li>
          강의
          <Caret />
        </li>
        {hasLogined && <li>질문 검색</li>}
      </NavList>
    </nav>
  );
}
