import Hero from "./components/Hero";
import Events from "./components/Events";
import Courses from "./components/Courses";
import Timetable from "./components/Timetable";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.07),transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-4 py-10 space-y-8">
        <Hero />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Events />
            <Timetable />
          </div>
          <div>
            <Courses />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
