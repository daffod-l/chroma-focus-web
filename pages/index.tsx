import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // states for dropdown sections
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

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
    backgroundColor: "#15183eff",
    color: "#ffffff",
    fontWeight: "bold",
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/chromadrift_backdrop.mp4"
      />
      {/* white overlay */}
      <div className="absolute inset-0 bg-white opacity-[0.30] z-0"></div>

      {/* app content */}
      <div className="relative z-10">
        {/* Top bar */}
        <div className="w-full flex justify-between items-center p-4 bg-[#a19cd9]/20 fixed top-0 z-30 backdrop-blur-sm">
          <h1
            style={{ fontFamily: "DreamerTM", color: "#141729ff" }}
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
          style={{ fontFamily: "AlteHaasGrotesk" }}
        >
          <button
            style={{ fontFamily: "DreamerTM", color: "#474e74ff" }}
            className="mb-6 text-6xl"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </button>

          {/* SETTINGS DROPDOWN */}
          <div className="mb-4">
            <p
              className="cursor-pointer text-lg font-bold text-[#211b94]"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              Settings
            </p>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                settingsOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 pl-2">To be updated~</p>
            </div>
          </div>

          {/* ABOUT DROPDOWN */}
          <div>
            <p
              className="cursor-pointer text-lg font-bold text-[#211b94]"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About
            </p>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                aboutOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-2 pl-2">
                <p className="mb-2 font-bold text-lg">What is Chroma?</p>
                <p className="mb-2">
                  Chroma is a simple study/focus timer I made as
                  I was experimenting with the next.js framework. Enjoy!
                </p>
                <a
                  href="https://instagram.com/jiayicosmos"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "AlteHaasGrotesk",
                    color: "#2f1d6f",
                    fontWeight: "bold",
                  }}
                  className="underline"
                >
                  My Instagram
                </a>
                <p></p>
                <a
                  href="https://www.youtube.com/watch?v=eHCYzIu-ij4&list=RDeHCYzIu-ij4&start_radio=1&ab_channel=PLAVE%ED%94%8C%EB%A0%88%EC%9D%B4%EB%B8%8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "AlteHaasGrotesk",
                    color: "#2f1d6f",
                    fontWeight: "bold",
                  }}
                  className="underline"
                >
                  Background Credit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* menu transition overlay */}
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
              color: "#15183eff",
              fontSize: "14rem",
              textShadow: `
                0 0 10px rgba(49, 36, 129, 0.7),
                0 0 20px rgba(45, 31, 129, 0.6)
              `,
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
    </div>
  );
}
