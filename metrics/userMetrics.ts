import { Registry } from "prom-client";
import { Counter } from "prom-client";
import { MetricTypes } from "./types";
import { InferMetricTypes } from "./types";

interface UserMetricTypes extends MetricTypes {
	counters: {
		userSignups: Counter
	}
}

export type UserMetrics = InferMetricTypes<UserMetricTypes>

export function createUserMetrics(registry: Registry) {
	const userSignups = new Counter({
		name: 'user_signups_total',
		help: 'Total number of user signups',
		labelNames: ['plan_type', 'referral_source'],
		registers: [registry],
	})
	registry.registerMetric(userSignups)

	return {
		counters: {
			userSignups,
		},
		gauges: {},
		histograms: {},
	}
}