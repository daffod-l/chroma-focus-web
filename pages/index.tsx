import { useState, useEffect } from "react";

export default function Home() {
  // timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // load from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("timeLeft");
    if (savedTime) setTimeLeft(Number(savedTime));
  }, []);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [timeLeft]);

  // timer effect
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // helper to adjust time
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
      <div className="w-full flex justify-between items-center p-4 bg-[#f5f5f5]">
        <h1 style={{ fontFamily: "DreamerTM", color: "#4f5264ff" }} className="text-6xl">
          Chroma
        </h1>
        <button
          style={{ fontFamily: "AlteHaasGrotesk" }}
          className="text-3xl font-bold px-3 py-1"
        >
          &#9776; {/* hamburger menu */}
        </button>
      </div>

      {/* Timer */}
      <div className="text-center mt-16">
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
        <div className="mt-0.2 space-x-2">
          <button onClick={() => adjustTime(5)} style={buttonStyle} className="px-4 py-2 rounded-full hover:opacity-90 transition">
            +5
          </button>
          <button onClick={() => adjustTime(10)} style={buttonStyle} className="px-4 py-2 rounded-full hover:opacity-90 transition">
            +10
          </button>
          <button onClick={() => adjustTime(-5)} style={buttonStyle} className="px-4 py-2 rounded-full hover:opacity-90 transition">
            -5
          </button>
          <button onClick={() => adjustTime(-10)} style={buttonStyle} className="px-4 py-2 rounded-full hover:opacity-90 transition">
            -10
          </button>
        </div>

        {/* Start / Reset buttons */}
        <div className="mt-4 space-x-3">
          <button onClick={() => setIsRunning(!isRunning)} style={buttonStyle} className="px-5 py-2 rounded-full shadow-md hover:opacity-90 transition">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={() => { setTimeLeft(25 * 60); setIsRunning(false); }} style={buttonStyle} className="px-5 py-2 rounded-full shadow-md hover:opacity-90 transition">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
