import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const StickerPack = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const stickers = [
    "/stickers/camera.png",
    "/stickers/boba.png",
    "/stickers/tired.png",
    "/stickers/panda.png",
    "/stickers/overthinker.png",
    "/stickers/stamp.png",
    "/stickers/coffee.png",
    "/stickers/envelope.png",
    "/stickers/van.png",
  ];

  // 👇 Close popup when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // 👇 Make stickers draggable
  const handleDragStart = (e, src) => {
    e.dataTransfer.setData("sticker", src);
  };

  return (
    <div className="box sticker-pack">
      <h2>Sticker Pack</h2>

      {/* Small preview of 3 stickers */}
      <div className="sticker-preview">
        {stickers.slice(0, 2).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Sticker ${index}`}
            className="sticker-img"
            draggable
            onDragStart={(e) => handleDragStart(e, src)}
          />
        ))}
      </div>

      {/* See More button */}
      <button className="see-more-btn" onClick={() => setShowPopup(true)}>
        See More
      </button>

      {/* Popup box for stickers */}
      {showPopup && (
        <div className="sticker-popup">
          <div className="popup-content" ref={popupRef}>
            <h3>🌸 Choose a Sticker</h3>
            <div className="popup-sticker-grid">
              {stickers.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Sticker ${index}`}
                  className="popup-sticker"
                  draggable
                  onDragStart={(e) => handleDragStart(e, src)}
                />
              ))}
            </div>
            <button
              className="close-popup-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickerPack;
