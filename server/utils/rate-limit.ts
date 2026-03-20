interface RateLimitState {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const getStore = () => {
  const globalKey = '__guestbook_rate_limit_store__';
  const globalRef = globalThis as typeof globalThis & {
    [key: string]: Map<string, RateLimitState> | undefined;
  };

  if (!globalRef[globalKey]) {
    globalRef[globalKey] = new Map<string, RateLimitState>();
  }

  return globalRef[globalKey] as Map<string, RateLimitState>;
};

export const applyRateLimit = (
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult => {
  const now = Date.now();
  const store = getStore();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    };
  }

  current.count += 1;

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
  };
};
