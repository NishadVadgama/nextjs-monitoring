import { Registry } from 'prom-client'
import { collectDefaultMetrics } from 'prom-client'
import type { InferMetricTypes, MergeMetricTypes } from './types'
import { createSampleMetrics, type SampleMetrics } from './sampleMetrics'
import { createUserMetrics, type UserMetrics } from './userMetrics'

type AllMetricTypes = [SampleMetrics, UserMetrics] // register all metric types
type GlobalMetricTypes = MergeMetricTypes<AllMetricTypes>
export type GlobalMetrics = InferMetricTypes<GlobalMetricTypes>

declare global {
  // eslint-disable-next-line no-var
  var metrics: GlobalMetrics | undefined
}

export function initializeMetrics(): GlobalMetrics {
  const registry = new Registry()

  // Collect default metrics
  collectDefaultMetrics({
    register: registry,
  })

  // Initialize all metric types
  const sampleMetrics = createSampleMetrics(registry)
  const userMetrics = createUserMetrics(registry)
  return {
    registry,
    counters: {
      ...sampleMetrics.counters,
      ...userMetrics.counters,
    },
    gauges: {
      ...sampleMetrics.gauges,
      ...userMetrics.gauges,
    },
    histograms: {
      ...sampleMetrics.histograms,
      ...userMetrics.histograms,
    },
  }
}
