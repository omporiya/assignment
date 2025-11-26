package com.om.pokemon;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.om.cache.CacheEntry;
import com.om.cache.LruCache;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@WebServlet("/PokemonInformation")
public class PokemonInformation extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private static final LruCache<String, CacheEntry> cache = new LruCache<>(100, 30 * 60 * 1000);
	
    public PokemonInformation() {
        super();
        
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("pokemon").trim().toLowerCase();
		
		CacheEntry entry = cache.get(name);

		JsonNode root = null;
        if (entry != null) {
            root = entry.getData();
            //System.out.println("Fetched from cache: " + name);
        } else {
            try {
                root = GetPokemonInformation.fetchPokemon(name);
                cache.put(name, new CacheEntry(root, System.currentTimeMillis()));
                System.out.println("Fetched from API and cached: " + name);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
		
		request.setAttribute("msg", root);
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		rd.forward(request, response);
	}	


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
