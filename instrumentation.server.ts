import pino, { Logger } from 'pino';
import pinoLoki from 'pino-loki';
import type { GlobalMetrics } from './metrics';
import { initializeMetrics } from './metrics';

declare global {
	// var usage is required for global declaration
	// eslint-disable-next-line no-var
	var logger: Logger | undefined;

	// eslint-disable-next-line no-var
	var metrics: GlobalMetrics | undefined;
}

function initLogger() {
	const transport = pinoLoki({
		host: 'http://localhost:3100', // Loki server address
		batching: true, // Enable batching of logs for better performance
		interval: 5, // Send logs every 5 seconds when batching
		labels: { app: 'next-app' } // Add application label to all logs
	})
	const logger = pino(transport);
	globalThis.logger = logger;
}

function initMetrics() {
	globalThis.metrics = initializeMetrics();
}

initLogger();
initMetrics();