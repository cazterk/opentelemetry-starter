/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require("@opentelemetry/sdk-node");
const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  ZipkinExporter,
  SimpleSpanProcessor,
} = require("@opentelemetry/exporter-zipkin");
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require("@opentelemetry/sdk-metrics");

// Initialize OpenTelemetry SDK
const sdk = new opentelemetry.NodeSDK({
  traceExporter: new ZipkinExporter({
    serviceName: "tracer-service",
    url: "http://localhost:9411/api/v2/spans",
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
