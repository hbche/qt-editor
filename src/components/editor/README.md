#### 基本使用

Write markdown here.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './index';

ReactDOM.render(
  <div>
    <Editor editable={true} />
  </div>,
  mountNode,
);
```

```tsx
import React from 'react';
import Text from './index';

function App() {
  return (
    <div>
      <Editor editable={true} />
    </div>
  );
}
export default App;
```
