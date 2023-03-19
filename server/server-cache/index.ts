class Cache {
  private cache = new Map()

  getFromCache(key: string) {
    return this.cache.get(key)
  }

  setCache(key: string, value: any) {
    this.cache.set(key, value)
  }

  removeFromCatch(key: string) {
    this.cache.delete(key)
  }

  isInCache(key: string) {
    if (!key) return false
    return this.cache.has(key)
  }

  size() {
    return this.cache.size
  }

  getKes() {
    return this.cache.keys()
  }
}

export const cache = new Cache()
