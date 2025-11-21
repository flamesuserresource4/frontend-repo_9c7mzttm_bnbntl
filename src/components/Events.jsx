import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || "";
    fetch(`${base}/api/events`)
      .then((r) => r.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
        <span className="text-xs text-blue-300/70">Auto-updates from admin</span>
      </div>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-blue-300/80">No events yet</p>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{e.title}</p>
                  <p className="text-blue-300/80 text-sm">{e.date} {e.time ? `• ${e.time}` : ""} {e.location ? `• ${e.location}` : ""}</p>
                </div>
                {e.link && (
                  <a href={e.link} target="_blank" className="text-blue-400 hover:underline text-sm">Details</a>
                )}
              </div>
              {e.description && <p className="text-blue-200/80 text-sm mt-2">{e.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
