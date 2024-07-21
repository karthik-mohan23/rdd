import { useState } from "react";

function DropArea({ onDrop, status, position }) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      onDragEnter={() => {
        setShowDrop(true);
      }}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(status, position);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: showDrop ? "2px dashed blue" : "2px solid transparent",
        width: showDrop ? "280px" : "",
        height: showDrop ? "140px" : "",
      }}
      className="flex justify-center items-center">
      {showDrop && "Drop here"}
    </div>
  );
}

export default DropArea;
