const cacheStore = require("./cache");

/**
 * Middleware that checks the in-memory cache before hitting the controller.
 * Adds X-Cache: HIT or MISS header.
 * On a HIT it responds immediately; on a MISS it passes control to next().
 */
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cached = cacheStore.get(key);

  if (cached !== null) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }

  // MISS — intercept res.json so we can store the response in cache
  res.setHeader("X-Cache", "MISS");

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // Only cache successful responses
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheStore.set(key, data);
    }
    return originalJson(data);
  };

  next();
}

module.exports = cacheMiddleware;
