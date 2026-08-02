import UniverseBackground from '@/components/UniverseBackground';
import StarCursor from '@/components/StarCursor';
import HudNav from '@/components/HudNav';
import Hero from '@/sections/Hero';
import MissionProfile from '@/sections/MissionProfile';
import CoreEngine from '@/sections/CoreEngine';
import MissionLogs from '@/sections/MissionLogs';
import ProjectArchive from '@/sections/ProjectArchive';
import CosmicExperiments from '@/sections/CosmicExperiments';
import FinalTransmission from '@/sections/FinalTransmission';
import { useScrollProgress, useActiveSection, useScrollPct } from '@/hooks/useScroll';

const SECTION_IDS = ['hero', 'profile', 'engine', 'logs', 'archive', 'experiments', 'contact'];

function App() {
  const scrollProgress = useScrollProgress();
  const scrollPct = useScrollPct();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <UniverseBackground scrollProgress={scrollProgress} />
      <StarCursor />
      <HudNav activeSection={activeSection} scrollPct={scrollPct} />

      <div className="relative z-10">
        <Hero />
        <MissionProfile />
        <CoreEngine />
        <MissionLogs />
        <ProjectArchive />
        <CosmicExperiments />
        <FinalTransmission />
      </div>
    </div>
  );
}

export default App;
