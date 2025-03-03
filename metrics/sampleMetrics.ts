import { Counter, Gauge, Histogram } from 'prom-client'
import type { InferMetricTypes, MetricTypes } from './types'

interface SampleMetricTypes extends MetricTypes {
  counters: {
    sampleCounter: Counter
  }
  gauges: {
    sampleGauge: Gauge
  }
  histograms: {
    sampleHistogram: Histogram
  }
}

export type SampleMetrics = InferMetricTypes<SampleMetricTypes>

export function createSampleMetrics(
  registry: SampleMetrics['registry']
): Omit<SampleMetrics, 'registry'> {
  const sampleCounter = new Counter({
    name: 'sample_counter',
    help: 'Sample counter',
    labelNames: ['sample_label'],
    registers: [registry],
  })
  registry.registerMetric(sampleCounter)

  const sampleGauge = new Gauge({
    name: 'sample_gauge',
    help: 'Sample gauge',
    labelNames: ['sample_label'],
    registers: [registry],
  })
  registry.registerMetric(sampleGauge)

  const sampleHistogram = new Histogram({
    name: 'sample_histogram',
    help: 'Sample histogram',
    labelNames: ['sample_label'],
    registers: [registry],
  })
  registry.registerMetric(sampleHistogram)

  return {
    counters: {
      sampleCounter,
    },
    gauges: {
      sampleGauge,
    },
    histograms: {
      sampleHistogram,
    },
  }
}
