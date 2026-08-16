import { useState, useMemo, Suspense, lazy } from 'react';
import UniverseBackground from '@/components/UniverseBackground';
import ScrollBackgroundGlow from '@/components/ScrollBackgroundGlow';
import StarCursor from '@/components/StarCursor';
import HudNav from '@/components/HudNav';
import SatelliteNetworkNotification from '@/components/SatelliteNetworkNotification';
import LoadingScreen from '@/components/LoadingScreen';
import { useScrollProgress, useActiveSection, useScrollPct } from '@/hooks/useScroll';

const SECTION_IDS = ['hero', 'profile', 'engine', 'logs', 'archive', 'experiments', 'contact'];

const Hero = lazy(() => import('@/sections/Hero'));
const MissionProfile = lazy(() => import('@/sections/MissionProfile'));
const CoreEngine = lazy(() => import('@/sections/CoreEngine'));
const MissionLogs = lazy(() => import('@/sections/MissionLogs'));
const ProjectArchive = lazy(() => import('@/sections/ProjectArchive'));
const CosmicExperiments = lazy(() => import('@/sections/CosmicExperiments'));
const FinalTransmission = lazy(() => import('@/sections/FinalTransmission'));

function SectionFallback() {
  return <div className="min-h-screen" style={{ visibility: 'hidden' }} />;
}

function App() {
  const scrollProgress = useScrollProgress();
  const scrollPct = useScrollPct();
  const activeSection = useActiveSection(SECTION_IDS);
  const [showNetworkComplete, setShowNetworkComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const handleNetworkComplete = useMemo(() => () => setShowNetworkComplete(true), []);
  const handleNetworkDismiss = useMemo(() => () => setShowNetworkComplete(false), []);
  const handleLoadingComplete = useMemo(() => () => {
    setLoading(false);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <>
      <ScrollBackgroundGlow scrollProgress={scrollProgress} />
      <UniverseBackground
        scrollProgress={scrollProgress}
        onNetworkComplete={handleNetworkComplete}
      />
      <StarCursor />
      <HudNav activeSection={activeSection} scrollPct={scrollPct} />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <SatelliteNetworkNotification
        show={showNetworkComplete}
        onComplete={handleNetworkDismiss}
      />
      <div className={`zoom-content ${loaded ? 'loaded' : ''}`}>

        <div className="relative z-10">
          <Suspense fallback={<SectionFallback />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <MissionProfile />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CoreEngine />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <MissionLogs />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ProjectArchive />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CosmicExperiments />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FinalTransmission />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
