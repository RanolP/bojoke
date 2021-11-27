import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {},
    fonts: {
      sansSerif: [
        'Pretendard Variable',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        'Helvetica Neue',
        'Noto Sans CJK KR',
        'Segoe UI',
        'Apple SD Gothic Neo',
        'Noto Sans KR',
        'Malgun Gothic',
        'sans-serif',
      ]
        .map((s) => (s.includes(' ') ? `"${s}"` : s))
        .join(', '),
      default: '$sansSerif',
    },
    sizes: {},
  },
});
