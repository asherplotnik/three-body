import { Canvas } from "@react-three/fiber";
import "./App.css";
import Sphere from "./components/Sphere";
import { useState } from "react";
import getInitialPosition from "./commons/getInitialPosition";
import DisplayData from "./components/DisplayData";
import { OrbitControls } from '@react-three/drei';
import { AppContext } from "./context/AppContext";

const App = () => {
  const [telemetry1, setTelemetry1] = useState<Telemetry>(getInitialTelemetry(0));
  const [telemetry2, setTelemetry2] = useState<Telemetry>(getInitialTelemetry(1));
  const [telemetry3, setTelemetry3] = useState<Telemetry>(getInitialTelemetry(2));
  const [gState, setGState] = useState(6.674 * Math.pow(10, -11));
  const contextValue: ContextUpdater = { 
    telemetry1, telemetry2, telemetry3, setTelemetry1, setTelemetry2, setTelemetry3, gState, setGState  
  };
  return (
    <AppContext.Provider value={contextValue}>
    <div className="Scene">
       <Canvas
        camera={{
          position: [10, 10, 4],
          fov: 60,
          aspect: 1.77,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <axesHelper args={[8]} />
        <OrbitControls />
        <Sphere me = {1}/>
        <Sphere me = {2}/>
        <Sphere me = {3}/>
      </Canvas> 
      <DisplayData />
    </div>
    </AppContext.Provider>
  );
};

const getInitialTelemetry = (ordinal: number): Telemetry => {
  const randomPosition = getInitialPosition(2);
  return {
    ordinal: ordinal,
    position: randomPosition,
    vector: { x: 0, y: f(ordinal), z: 0 },
    forceA: { x: 0, y: 0, z: 0 },
    forceB: { x: 0, y: 0, z: 0 },
    delta: { x: 0, y: 0, z: 0 },
    newPosition: randomPosition,
    newVector: { x: 0, y: 0, z: 0 }
  };
};

const f = (ordinal: number) => {
    return ordinal === 1 ? 0.005 : ordinal === 0 ? 0 : -0.005;
}

export default App;
