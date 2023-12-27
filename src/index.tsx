import { createRoot } from 'react-dom/client';

import App from 'app';
import Provider from 'provider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <Provider>
    <App />
  </Provider>,
);
