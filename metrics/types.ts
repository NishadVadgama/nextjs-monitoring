import { Registry } from 'prom-client'

export interface MetricRegistry {
  registry: Registry
}

export interface MetricTypes {
  counters?: Record<string, any>
  gauges?: Record<string, any>
  histograms?: Record<string, any>
}

export type InferMetricTypes<T extends MetricTypes> = {
  registry: Registry
} & Required<T>

// Helper type to merge multiple metric types
export type MergeMetricTypes<T extends MetricTypes[]> = {
  counters: UnionToIntersection<T[number]['counters']>
  gauges: UnionToIntersection<T[number]['gauges']>
  histograms: UnionToIntersection<T[number]['histograms']>
}

// Helper type to convert union to intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never
