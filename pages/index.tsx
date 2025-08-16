import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTime = localStorage.getItem("timeLeft");
    if (savedTime) setTimeLeft(Number(savedTime));
  }, []);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const adjustTime = (minutesDelta: number) => {
    setTimeLeft((prev) => Math.max(prev + minutesDelta * 60, 0));
  };

  const buttonStyle = {
    fontFamily: "AlteHaasGrotesk",
    backgroundColor: "#6f779e",
    color: "#ffffff",
    fontWeight: "bold",
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center p-4 bg-[#f5f5f5] fixed top-0 z-30">
        <h1
          style={{ fontFamily: "DreamerTM", color: "#4f5264ff" }}
          className="text-6xl"
        >
          Chroma
        </h1>
        <button
          style={{ fontFamily: "AlteHaasGrotesk" }}
          className="text-3xl font-bold px-3 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#dfe1e8] shadow-lg p-4 z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          style={{ fontFamily: "DreamerTM", color: "#474e74ff" }}
          className="mb-4 text-6xl"
          onClick={() => setMenuOpen(false)}
        >
          Menu
        </button>

        <ul className="space-y-2">
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>

      {/* Overlay with fade + blur */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 backdrop-blur-[1px] transition-all duration-500 z-30 ${
          menuOpen
            ? "bg-black/20 opacity-100"
            : "bg-black/0 opacity-0 pointer-events-none"
        }`}
      />

      {/* Timer */}
      <div className="text-center mt-44">
        <h2
          style={{
            fontFamily: "DreamerTM",
            color: "#505378ff",
            fontSize: "14rem",
            textShadow: "2px 2px 4px rgba(99, 97, 110, 0.3)",
          }}
        >
          {minutes}:{seconds.toString().padStart(2, "0")}
        </h2>

        {/* Time adjustment buttons */}
        <div className="mt-2 space-x-2">
          <button
            onClick={() => adjustTime(5)}
            style={buttonStyle}
            className="px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            +5
          </button>
          <button
            onClick={() => adjustTime(10)}
            style={buttonStyle}
            className="px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            +10
          </button>
          <button
            onClick={() => adjustTime(-5)}
            style={buttonStyle}
            className="px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            -5
          </button>
          <button
            onClick={() => adjustTime(-10)}
            style={buttonStyle}
            className="px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            -10
          </button>
        </div>

        {/* Start / Reset buttons */}
        <div className="mt-4 space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={buttonStyle}
            className="px-5 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setTimeLeft(25 * 60);
              setIsRunning(false);
            }}
            style={buttonStyle}
            className="px-5 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
