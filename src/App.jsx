import { useState } from 'react'
import './App.css'
import Editor from './Editor';

function App() {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [isDrawing, setIsDrawing] = useState(false);

  const MAX_SIZE = 64;

  const start = () => {
    if (width > MAX_SIZE) setWidth(MAX_SIZE);
    if (height > MAX_SIZE) setHeight(MAX_SIZE);

    if (width < 4) setWidth(4);
    if (height < 4) setHeight(4);

    setIsDrawing(true);
  };

  return (
    <div className="App">
      <h1>Pixel Art Maker</h1>

      {!isDrawing ? (
        <div className='menu'>
          <h2>Размер холста</h2>
          <p className='subtitle'>Выберите размер или введите свой</p>
          <div className='presets'>
            <button onClick={() => { setWidth(16); setHeight(16); }}>16x16</button>
            <button onClick={() => { setWidth(32); setHeight(32); }}>32x32</button>
            <button onClick={() => { setWidth(64); setHeight(64); }}>64x64</button>
          </div>
          <div className='manual-input'>
            <div className='input-wrapper'>
              <label>Ширина</label>
              <input
                type='number'
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder='16'
                min={4}
                max={64}
              />
            </div>
            <span className='cross'>x</span>
            <div className="input-wrapper">
              <label>Высота</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="16"
                min={4}
                max={64}
              />
            </div>
          </div>
          <p className='hint'>
            Лимит: от 4 до 64 пикселей
          </p>
          <button className='start-btn' onClick={start}>СОЗДАТЬ</button>
        </div>
      ) : (
        <Editor
          width={width}
          height={height}
          onBack={() => setIsDrawing(false)}
        />
      )}
    </div>
  )
}

export default App