import { useState } from 'react';
import './App.css';
import Editor from './components/editor';

function App() {
  const [editable, setEditable] = useState<boolean>(true);
  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={editable}
          onChange={() => setEditable(!editable)}
        />
        Editable
      </label>
      <Editor editable={editable} />
    </div>
  );
}

export default App;
