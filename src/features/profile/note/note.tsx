import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Note = () => {
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem("userNote");
    if (savedNote) setNote(savedNote);
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem("userNote", note);
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      {(note || showNoteInput) && (
        <motion.div
          onMouseEnter={() => setShowNoteInput(true)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="relative">
            <div className="bg-white px-4 py-2 rounded-2xl shadow-lg min-w-[100px] text-center">
              {isEditing ? (
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={handleSaveNote}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNote()}
                  placeholder="Заметка..."
                  className="w-full bg-transparent outline-none text-center text-sm"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => setIsEditing(true)}
                  className="text-sm cursor-pointer"
                >
                  {note || "Заметка..."}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Note;
