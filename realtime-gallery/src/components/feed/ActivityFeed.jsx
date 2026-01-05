import { useEffect, useState } from "react";
import { channel } from "../../realtime/channel";

export default function ActivityFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    channel.onmessage = (event) => {
      if (event.data.type === "reaction" || event.data.type === "comment") {
        setFeed((prev) => [
          {
            type: event.data.type,
            imageId: event.data.imageId,
            emoji: event.data.emoji,
            text: event.data.text,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
    };
  }, []);

  return (
    <div className="border-l p-4 h-screen overflow-y-auto">
      <h2 className="font-semibold mb-3">Live Activity</h2>

      {feed.length === 0 && (
        <p className="text-sm text-gray-500">No activity yet</p>
      )}

      <div className="space-y-2">
        {feed.map((item, i) => (
          <div key={i} className="text-sm bg-gray-100 p-2 rounded">
            {item.type === "reaction" && (
              <span>
                Reacted {item.emoji} on image ({item.time})
              </span>
            )}
            {item.type === "comment" && (
              <span>
                Commented: “{item.text}” ({item.time})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
