import { useState } from "react";
import './App.css';

export default function Editor(props) {
    const { width, height, onBack } = props;

    const [pixels, setPixels] = useState(Array(width * height).fill('#fff'));
    const [selectedColor, setSelectedColor] = useState('#000');
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [activeTool, setActiveTool] = useState('pencil');

    const colors = [
        "#000000", "#808080", "#c0c0c0", "#ffffff",
        "#ff0000", "#ffa500", "#ffff00", "#008000",
        "#00ffff", "#0000ff", "#800080", "#ff00ff",
    ];

    const paintPixel = (index) => {
        const newPixels = [...pixels];

        if (activeTool === 'pencil') {
            newPixels[index] = selectedColor;
        } else if (activeTool === 'eraser') {
            newPixels[index] = "#ffffff";
        }

        setPixels(newPixels);
    };

    const handleMouseDown = (index) => {
        if (activeTool === 'picker') {
            setSelectedColor(pixels[index]);
            setActiveTool('pencil');
            return;
        }

        setIsMouseDown(true);
        paintPixel(index);
    };

    const handleMouseEnter = (index) => {
        if (activeTool === 'picker') return;

        if (isMouseDown) paintPixel(index);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const clearCanvas = () => {
        setPixels(Array(width * height).fill("#fff"));
        setActiveTool('pencil');
    };

    const exportImage = () => {
        const canvas = document.createElement('canvas');
        const scale = 20;
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');

        pixels.forEach((color, index) => {
            const x = (index % width) * scale;
            const y = Math.floor(index / width) * scale;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, scale, scale);
        });

        const link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="editor">
            <div className="editor-header">
                <button className="icon-btn" onClick={onBack} title="Назад">
                    ⬅
                </button>
                <span className="canvas-info">{width} x {height}</span>
                <button className="icon-btn export-btn-mini" onClick={exportImage} title="Скачать">
                    💾
                </button>
            </div>

            <div className="toolbar">
                <div className="tool-group">
                    <button
                        className={`tool-btn ${activeTool === 'pencil' ? "active-tool" : ""}`}
                        onClick={() => setActiveTool('pencil')}
                    >
                        ✏️ Карандаш
                    </button>
                    <button
                        className={`tool-btn ${activeTool === 'eraser' ? "active-tool" : ""}`}
                        onClick={() => setActiveTool('eraser')}
                    >
                        🧽 Ластик
                    </button>
                    <button
                        className={`tool-btn ${activeTool === 'picker' ? "active-tool" : ""}`}
                        onClick={() => setActiveTool('picker')}
                    >
                        🖊 Пипетка
                    </button>
                    <button className="tool-btn" onClick={clearCanvas}>
                        🗑️ Очистить
                    </button>
                </div>
            </div>

            <div
                className={`drawing-area ${activeTool === 'picker' ? "eyedropper-cursor" : ""}`}
                style={{ gridTemplateColumns: `repeat(${width}, 1.5rem)` }}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
            >
                {pixels.map((pixelColor, index) => (
                    <div
                        key={index}
                        className="pixel"
                        style={{ backgroundColor: pixelColor }}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseUp={handleMouseUp}
                    ></div>
                ))}
            </div>

            <div className="palette-container">
                <div className="custom-color-wrapper">
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => {
                            setSelectedColor(e.target.value);
                            setActiveTool('pencil');
                        }}
                        className="color-input"
                        title="Выбрать свой цвет"
                    />
                    <div className="color-wheel-btn"></div>
                </div>

                <div className="palette">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className="color-swatch"
                            style={{
                                backgroundColor: color,
                                outline: (color === selectedColor && activeTool === 'pencil') ? "2px solid #fff" : "none",
                                transform: (color === selectedColor && activeTool === 'pencil') ? "scale(1.15)" : "scale(1)",
                                zIndex: (color === selectedColor && activeTool === 'pencil') ? 2 : 1
                            }}
                            onClick={() => {
                                setSelectedColor(color);
                                setActiveTool('pencil');
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}