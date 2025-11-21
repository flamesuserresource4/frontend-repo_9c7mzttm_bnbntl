import { useEffect, useState } from "react";

export default function Hero() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || "";
    fetch(`${base}/test`).then(async (r) => {
      const data = await r.json();
      setStatus(`${data.backend} • DB: ${data.database}`);
    }).catch(() => setStatus("Backend not reachable"));
  }, []);

  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Gender & Youth Dept Portal</h1>
      <p className="text-blue-200 mt-3">Events, courses, and timetables in one place</p>
      <p className="text-blue-300/70 text-sm mt-4">{status}</p>
    </div>
  );
}
