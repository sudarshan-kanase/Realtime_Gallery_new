import { useEffect, useMemo, useState } from "react";
import { db } from "../../instantdb/client";

const EMOJIS = ["❤️", "🔥", "😂", "👏"];

export default function EmojiBar({ imageId }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    if (!imageId) return;

    const unsub = db
      .collection("reactions")
      .where("imageId", "==", imageId)
      .subscribe(setReactions);

    return () => unsub();
  }, [imageId]);

  const emojiCounts = useMemo(() => {
    return reactions.reduce((acc, r) => {
      acc[r.emoji] = (acc[r.emoji] || 0) + 1;
      return acc;
    }, {});
  }, [reactions]);

  const addReaction = async (emoji) => {
    await db.collection("reactions").add({
      imageId,
      emoji,
    });
  };

  return (
    <div className="flex gap-3 mt-3">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => addReaction(emoji)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {emoji} {emojiCounts[emoji] || 0}
        </button>
      ))}
    </div>
  );
}
