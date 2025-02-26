import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	// Log the request URL and method
	console.log(`[Middleware] ${request.method} ${request.url}`);

	// Add request ID to the logger if it exists
	const requestId = crypto.randomUUID();
	globalThis.logger?.info({
		meta: {
			requestId,
			url: request.url,
			method: request.method,
			userAgent: request.headers.get('user-agent'),
		},
		message: 'Request processed by middleware',
	});
	const response = NextResponse.next();
	return response;
}

// Configure which paths Middleware will run on
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon\\.ico|public/).*)',

		// Optionally, you can target specific paths
		'/api/:path*',
	]
}; 