import { registerOTel } from '@vercel/otel';

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import('./instrumentation.server');

    // vercel otel for traces
    registerOTel();
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    // edge runtime
    registerOTel();
  }
}

