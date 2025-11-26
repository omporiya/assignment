package com.om.pokemon;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GetPokemonInformation 
{
	private static final String BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
	
	public static JsonNode fetchPokemon(String name) throws Exception {

        String url = BASE_URL + name;

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
        
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            //System.out.println("Pokémon not found!");
            return null;
        }

        // Parse JSON
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.body());
        
        return root;
    }
}
