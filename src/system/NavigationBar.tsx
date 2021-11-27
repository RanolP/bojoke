import { styled } from '../stitches.config';

const NavList = styled('ul', {
  paddingLeft: 0,
  margin: 0,
  listStyle: 'none',
  display: 'table',
  '& li': {
    float: 'left',
    padding: '10px 15px',
    cursor: 'pointer',
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

export interface NavigationBarProps {
  id: number;
  hasLogined: boolean;
  hasSolved: boolean;
  isDebugSupported: boolean;
}

export function NavigationBar({
  id,
  hasLogined,
  hasSolved,
  isDebugSupported,
}: NavigationBarProps): JSX.Element {
  return (
    <nav>
      <NavList>
        <li className="active">{id}번</li>
        <li>제출</li>
        <li>맞힌 사람</li>
        <li>숏코딩</li>
        <li>재채점 결과</li>
        {isDebugSupported && <li>디버그</li>}
        <li>채점 현황</li>
        {hasLogined && <li>내 제출</li>}
        {hasSolved && <li>난이도 기여</li>}
        <li>강의</li>
        {hasLogined && <li>질문 검색</li>}
      </NavList>
    </nav>
  );
}
