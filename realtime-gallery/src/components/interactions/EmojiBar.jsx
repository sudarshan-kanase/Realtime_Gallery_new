import { useEffect, useMemo, useState } from "react";
import { channel } from "../../realtime/channel";

const EMOJIS = ["❤️", "🔥", "😂", "👏"];

export default function EmojiBar({ imageId }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.type === "reaction" &&
        event.data.imageId === imageId
      ) {
        setReactions(event.data.reactions);
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [imageId]);

  const addReaction = (emoji) => {
    const updated = [...reactions, { emoji }];

    setReactions(updated);

    channel.postMessage({
      type: "reaction",
      imageId,
      emoji,          // ✅ important for feed
      reactions: updated,
    });
  };

  const emojiCounts = useMemo(() => {
    const counts = {};
    reactions.forEach((r) => {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    });
    return counts;
  }, [reactions]);

  return (
    <div className="flex gap-3 mt-4">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => addReaction(emoji)}
          className="px-3 py-1 border rounded"
        >
          {emoji} {emojiCounts[emoji] || 0}
        </button>
      ))}
    </div>
  );
}
