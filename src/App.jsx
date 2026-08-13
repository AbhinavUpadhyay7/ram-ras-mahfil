import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="grain"></div>

      <Navbar />

      <main>
        <Hero />
      </main>

      <MusicPlayer />
    </div>
  );
}