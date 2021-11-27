import { render } from 'preact';
import { App } from './App';

import '@benrbray/prosemirror-math/style/math.css';
import 'katex/dist/katex.min.css';
import 'remirror/styles/all.css';

render(<App />, document.getElementById('app')!);
