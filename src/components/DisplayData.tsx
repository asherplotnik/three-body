import "./DisplayData.css";
interface DisplayProps {
  telemetry: Telemetry;
}

const DisplayData = (props: DisplayProps) => {
  return (
    <div className="Telemetry" style={{ top: props.telemetry.ordinal * 220 }}>
      <div>{props.telemetry.ordinal}</div>
      <div>
        forceAX: {fn(props.telemetry.forceA.x)} forceAY:{" "}
        {fn(props.telemetry.forceA.y)} forceAZ: {fn(props.telemetry.forceA.z)}
      </div>
      <div>
        forceBX: {fn(props.telemetry.forceB.x)} forceAY:{" "}
        {fn(props.telemetry.forceB.y)} forceAZ: {fn(props.telemetry.forceB.z)}
      </div>
      <div>
        deltaX: {props.telemetry.delta.x.toFixed(2)} deltaY:{" "}
        {props.telemetry.delta.y.toFixed(2)} deltaZ:{" "}
        {props.telemetry.delta.z.toFixed(2)}
      </div>
      <div>
        newPositionX: {props.telemetry.newPosition.x.toFixed(2)} newPositionY:{" "}
        {props.telemetry.newPosition.y.toFixed(2)} newPositionZ:{" "}
        {props.telemetry.newPosition.z.toFixed(2)}
      </div>
      <div>
        newVectorX: {props.telemetry.newVector.x.toFixed(2)} newVectorY:{" "}
        {props.telemetry.newVector.y.toFixed(2)} newVectorZ:{" "}
        {props.telemetry.newVector.z.toFixed(2)}
      </div>
    </div>
  );
};

const fn = (num: number) => {
  return (num * 100000).toFixed(3);
};

export default DisplayData;
