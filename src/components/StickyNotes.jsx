import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import "./StickyNotes.css";

function StickyNotes({ notes, onSave, stickers, onStickersSave }) {
  const [tempNote, setTempNote] = useState("");
  const [localStickers, setLocalStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const noteAreaRef = useRef(null);

  // Load notes
  useEffect(() => {
    setTempNote(notes || "");
  }, [notes]);

  // Load stickers for this date
  useEffect(() => {
    setLocalStickers(stickers || []);
  }, [stickers]);

  const handleSave = () => onSave(tempNote);

  // Save stickers back to parent (App.jsx)
  const saveStickersToParent = (updated) => {
    setLocalStickers(updated);
    onStickersSave(updated);
  };

  // Allow drop only inside sticky note area
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const stickerSrc = e.dataTransfer.getData("sticker");
    if (stickerSrc && noteAreaRef.current) {
      const rect = noteAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSticker = { src: stickerSrc, x, y, width: 80, height: 80 };
      const updated = [...localStickers, newSticker];
      saveStickersToParent(updated);
    }
  };

  const updateStickerPosition = (index, d) => {
    const updated = localStickers.map((sticker, i) =>
      i === index ? { ...sticker, x: d.x, y: d.y } : sticker
    );
    saveStickersToParent(updated);
  };

  const updateStickerSize = (index, ref, position) => {
    const updated = localStickers.map((sticker, i) =>
      i === index
        ? {
            ...sticker,
            width: parseFloat(ref.style.width),
            height: parseFloat(ref.style.height),
            ...position,
          }
        : sticker
    );
    saveStickersToParent(updated);
  };

  // Delete with Delete/Backspace
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedSticker !== null) {
        const updated = localStickers.filter((_, i) => i !== selectedSticker);
        saveStickersToParent(updated);
        setSelectedSticker(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedSticker, localStickers]);

  // Click outside deselect
  useEffect(() => {
    const handleDocClick = (e) => {
      if (noteAreaRef.current && !noteAreaRef.current.contains(e.target)) {
        setSelectedSticker(null);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  return (
    <div className="sticky-notes">
      <h2>Journal</h2>

      <div
        className="sticky-note-area"
        ref={noteAreaRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
          style={{ touchAction: "none" }} // 👈 ensures draggable works on touch
      >
        <textarea
          value={tempNote}
          onChange={(e) => setTempNote(e.target.value)}
          placeholder="Write your thoughts for this date..."
        />

        {localStickers.map((sticker, index) => (
          <Rnd
            key={index}
            bounds="parent"
            size={{ width: sticker.width, height: sticker.height }}
            position={{ x: sticker.x, y: sticker.y }}
            onDragStart={() => setSelectedSticker(index)}
            onDragStop={(e, d) => updateStickerPosition(index, d)}
            onResizeStart={() => setSelectedSticker(index)}
            onResizeStop={(e, direction, ref, delta, position) =>
              updateStickerSize(index, ref, position)
            }
            enableResizing={{
              bottomRight: true,
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              topLeft: false,
              bottomLeft: false,
            }}
            style={{
              border:
                selectedSticker === index
                  ? "2px dashed rgba(255,184,108,0.9)"
                  : "none",
              zIndex: selectedSticker === index ? 999 : 1,
            }}
          >
            <img
              src={sticker.src}
              alt="sticker"
              className="dropped-sticker"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                touchAction: "none", // 👈 helps mobile touch drag
                userSelect: "none",
                pointerEvents: "auto",
                cursor: "move",
              }}
              draggable={false}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSticker(index);
              }}
            />
          </Rnd>
        ))}
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default StickyNotes;
