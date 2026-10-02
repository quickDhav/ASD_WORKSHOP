// In-memory cache store
// Each entry: { value: <data>, createdAt: <timestamp ms> }
const cache = {};

const TTL_MS = 60 * 1000; // 1 minute

function get(key) {
  const entry = cache[key];
  if (!entry) return null;

  const age = Date.now() - entry.createdAt;
  if (age > TTL_MS) {
    // Expired — remove it and signal a miss
    delete cache[key];
    return null;
  }

  return entry.value;
}

function set(key, value) {
  cache[key] = {
    value,
    createdAt: Date.now(),
  };
}

// Invalidate a specific key or all keys when no argument is passed
function invalidate(key) {
  if (key) {
    delete cache[key];
  } else {
    // Clear everything (used after write operations)
    Object.keys(cache).forEach((k) => delete cache[k]);
  }
}

module.exports = { get, set, invalidate };
