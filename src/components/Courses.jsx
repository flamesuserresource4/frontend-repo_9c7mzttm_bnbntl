import { useEffect, useState } from "react";

export default function Courses() {
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [courses, setCourses] = useState([]);

  const load = () => {
    const base = import.meta.env.VITE_BACKEND_URL || "";
    const params = new URLSearchParams();
    if (semester) params.set("semester", semester);
    if (year) params.set("year", year);
    fetch(`${base}/api/courses?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setCourses(data));
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Courses</h2>
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
      {courses.length === 0 ? (
        <p className="text-blue-300/80">No courses found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((c) => (
            <div key={c.id} className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
              <p className="text-white font-medium">{c.code} — {c.title}</p>
              <p className="text-blue-300/80 text-sm">{c.semester} {c.year} • {c.credits ?? 3} credits</p>
              {c.lecturer && <p className="text-blue-200/80 text-sm mt-1">Lecturer: {c.lecturer}</p>}
              {c.description && <p className="text-blue-200/80 text-sm mt-2">{c.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
