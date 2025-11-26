package com.om.cache;


import com.fasterxml.jackson.databind.JsonNode;

public class CacheEntry {
    private JsonNode data;
    private long timestamp;

    public CacheEntry(JsonNode data, long timestamp) {
        this.data = data;
        this.timestamp = timestamp;
    }

    public JsonNode getData() {
        return data;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
