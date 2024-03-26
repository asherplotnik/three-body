interface ContextUpdater {
    telemetry1: Telemetry;
    telemetry2: Telemetry;
    telemetry3: Telemetry;
    setTelemetry1: (telemetry1: Telemetry) => void;
    setTelemetry2: (telemetry2: Telemetry) => void;
    setTelemetry3: (telemetry3: Telemetry) => void;
    gState: number;
    setGState: (gState: number) => void;
}