import { RateLimiterMemory } from 'rate-limiter-flexible';

const points = parseInt(process.env.RATE_LIMIT_POINTS || '5', 10); // Default 5 requests
const duration = parseInt(process.env.RATE_LIMIT_DURATION || '3600', 10); // Default 1 hour in seconds

export const rateLimiter = new RateLimiterMemory({
    points,
    duration,
});

export const isAllowedDomain = (origin: string | null): boolean => {
    if (!origin) return false;
    const allowedDomains = process.env.ALLOWED_DOMAINS?.split(',') || [];
    return allowedDomains.some(domain => origin.endsWith(domain.trim()));
}; 