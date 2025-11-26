package com.om.cache;


import java.util.LinkedHashMap;
import java.util.Map;

public class LruCache<K, V extends CacheEntry> extends LinkedHashMap<K, V> {

    private final int capacity;
    private final long ttl; // milliseconds

    public LruCache(int capacity, long ttl) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
        this.ttl = ttl;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }

    public boolean isExpired(CacheEntry entry) {
        long current = System.currentTimeMillis();
        return (current - entry.getTimestamp()) > ttl;
    }
}

