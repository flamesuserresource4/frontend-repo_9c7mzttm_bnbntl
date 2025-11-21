import { useEffect, useState } from "react";

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function Timetable() {
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);

  const load = () => {
    const base = import.meta.env.VITE_BACKEND_URL || "";
    const params = new URLSearchParams();
    if (semester) params.set("semester", semester);
    if (year) params.set("year", year);
    fetch(`${base}/api/timetable?${params.toString()}`)
      .then((r) => r.json())
      .then((items) => setData(items));
  };

  useEffect(() => { load(); }, []);

  const grouped = days.map(d => ({ day: d, slots: data.filter(x => x.day === d).sort((a,b)=>a.start_time.localeCompare(b.start_time)) }));

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Timetable</h2>
        <div className="flex gap-2">
          <select className="bg-slate-900 text-blue-100 text-sm px-2 py-1 rounded" value={semester} onChange={(e)=>setSemester(e.target.value)}>
            <option value="">All Semesters</option>
            <option>Fall</option>
            <option>Spring</option>
            <option>Summer</option>
          </select>
          <input className="bg-slate-900 text-blue-100 text-sm px-2 py-1 rounded w-24" placeholder="Year" value={year} onChange={(e)=>setYear(e.target.value)} />
          <button onClick={load} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded">Filter</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {grouped.map((group) => (
          <div key={group.day} className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
            <p className="text-white font-medium mb-2">{group.day}</p>
            {group.slots.length === 0 ? (
              <p className="text-blue-300/70 text-sm">No classes</p>
            ) : (
              <ul className="space-y-2">
                {group.slots.map((s) => (
                  <li key={s.id} className="text-blue-100 text-sm">
                    <div className="flex items-center justify-between">
                      <span>{s.start_time} - {s.end_time}</span>
                      <span className="text-blue-300/80">{s.course_code}</span>
                    </div>
                    <div className="text-blue-300/80 text-xs">{s.venue || ""} {s.lecturer ? `• ${s.lecturer}` : ""}</div>
                    {s.notes && <div className="text-blue-200/80 text-xs mt-1">{s.notes}</div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
