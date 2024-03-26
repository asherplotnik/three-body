import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Mesh } from "three";
import "./Sphere.css";
import { useAppContext } from "../context/AppContext";
interface MyComponentProps {
  me: number;
}

const Sphere = (props: MyComponentProps) => {
  const context = useAppContext();
  const telemetry = getMyTelemetry(context, props.me);
  const setTelemetry = setMyTelemetry(context, props.me);
  const [isPaused, setIsPaused] = useState(true);
  const [vector, setVector] = useState<Vector>(telemetry.vector);
  const [position, setPosition] = useState<Position>(telemetry.position);
  const meshRef = useRef<Mesh>(null!);
  const gState = useAppContext().gState;

  useEffect(() => {
    meshRef.current.position.x = telemetry.position.x;
    meshRef.current.position.y = telemetry.position.y;
    meshRef.current.position.z = telemetry.position.z;
    console.log(Boolean(meshRef.current));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", togglePause);

    return () => {
      window.removeEventListener("keydown", togglePause);
    };
  }, [isPaused]);

  const togglePause = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setIsPaused(!isPaused);
    }
  };


  useFrame(() => {
    if (isPaused) {
      return;
    }
    const newPosition = calcNewPositionAndMomentum(
        1,
        setPosition,
        setVector,
        position,
        vector,
        setTelemetry,
        telemetry,
        getPositionA(context, props.me),
        getPositionA(context, props.me),
        gState
      );
    if (meshRef.current) {
      meshRef.current.position.x = newPosition.x;
      meshRef.current.position.y = newPosition.y;
      meshRef.current.position.z = newPosition.z;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial metalness={telemetry.ordinal*0.5} roughness={0.1} />
    </mesh>
  );
};

const calcNewPositionAndMomentum = (
  friction:number,
  setPosition: Dispatch<SetStateAction<Position>>,
  setVector: Dispatch<SetStateAction<Vector>>,
  position: Position,
  vector: Vector,
  setTelemetry: Function,
  telemetry: Telemetry,
  positionA: Position,
  positionB: Position,
  gState: number
): Position => {
  const distanceA =  Math.sqrt((position.x + positionA.x)**2 + (position.y + positionA.y)**2 + (position.z + positionA.z)**2);
  const distanceB = Math.sqrt((position.x + positionB.x)**2 + (position.y + positionB.y)**2 + (position.z + positionB.z)**2);
  const totalForceA = (gState * position.mass * positionA.mass) / distanceA**2;
  const totalForceB = (gState * position.mass * positionB.mass) / distanceA**2;
  const forceA = {
    x: getForce(totalForceA, positionA.x, position.x, distanceA),
    y: getForce(totalForceA, positionA.y, position.y, distanceA),
    z: getForce(totalForceA, positionA.z, position.z, distanceA)
  };
  const forceB = {
    x: getForce(totalForceB, positionB.x, position.x, distanceB),
    y: getForce(totalForceB, positionB.y, position.y, distanceB),
    z: getForce(totalForceB, positionB.z, position.z, distanceB)
  };
  const newVector = {
    x: friction*((forceA.x + forceB.x)/position.mass) + vector.x,
    y: friction*((forceA.y + forceB.y)/position.mass) + vector.y,
    z: friction*((forceA.z + forceB.z)/position.mass) + vector.z
  };
  const delta = {
    x: 0.5 * newVector.x ,
    y: 0.5 * newVector.y ,
    z: 0.5 * newVector.z 
  };
  const newPosition = {
    mass: position.mass,
    x: delta.x + position.x,
    y: delta.y + position.y,
    z: delta.z + position.z,
  };
  
  setTelemetry(
      {ordinal: telemetry.ordinal,
      position,
      vector,
      forceA,
      forceB,
      delta,
      newPosition,
      newVector}
  );
  setPosition(newPosition);
  setVector(newVector);
  return newPosition;
};

const getForce = (force: number, positionA: number, position: number, distance: number) => {
    return force*(positionA - position)/distance; 
} 

const getMyTelemetry = (context: ContextUpdater, me: number): Telemetry => {
    switch (me) {
        case 1: return context.telemetry1;
        case 2: return context.telemetry2;
        case 3: return context.telemetry3;
        default: return null!;
    }
}

const setMyTelemetry = (context: ContextUpdater, me: number): Function => {
    switch (me) {
        case 1: return context.setTelemetry1;
        case 2: return context.setTelemetry2;
        case 3: return context.setTelemetry3;
        default: return null!;
    }
}

const getPositionA = (context: ContextUpdater, me: number): Position => {
    switch (me) {
        case 1: return context.telemetry2.position;
        case 2: return context.telemetry1.position;
        case 3: return context.telemetry1.position;
        default: return null!;
    }
}

const getPositionB = (context: ContextUpdater, me: number): Position => {
    switch (me) {
        case 1: return context.telemetry3.position;
        case 2: return context.telemetry3.position;
        case 3: return context.telemetry2.position;
        default: return null!;
    }
}
export default Sphere;
