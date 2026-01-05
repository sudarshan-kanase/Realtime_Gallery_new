import { useEffect, useState } from "react";
import { channel } from "../../realtime/channel";

export default function CommentBox({ imageId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.type === "comment" &&
        event.data.imageId === imageId
      ) {
        setComments(event.data.comments);
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [imageId]);

  const addComment = () => {
    if (!text.trim()) return;

    const updated = [...comments, { text }];

    setComments(updated);
    setText("");

    channel.postMessage({
      type: "comment",
      imageId,
      text,          // ✅ important for feed
      comments: updated,
    });
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>

      <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
        {comments.map((c, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded text-sm">
            {c.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Write a comment..."
        />
        <button
          onClick={addComment}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
