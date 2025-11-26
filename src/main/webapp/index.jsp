<%@ page import="com.fasterxml.jackson.databind.JsonNode"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pokemon Search UI (HTML + CSS Only)</title>
<link rel="stylesheet" href="index.css" />
</head>
<body>

	<div class="container">
		<h1 class="title">Pokemon Search</h1>

		<!-- Search Box -->
		<form class="search-box" action="./PokemonInformation" method="GET">
			<input type="text" name="pokemon" placeholder="Enter Pokemon Name..."
				required />
			<button type="submit">Search</button>
		</form>

		<%
			String searchedPokemon = request.getParameter("pokemon");
			if (searchedPokemon != null && request.getAttribute("msg") == null) {
		%>
			<p style="color: red; font-weight: bold; margin-top: 10px;">NotPokémon Found !!!</p>
		<%
		}
		%>

		<%
		JsonNode root = (JsonNode) request.getAttribute("msg");

		if (root != null) {
			// Extract Stats
			int hp = 0, attack = 0, defense = 0, speed = 0;

			for (JsonNode stat : root.get("stats")) {
				String statName = stat.get("stat").get("name").asText();
				int value = stat.get("base_stat").asInt();

				switch (statName) {
				case "hp":
			hp = value;
			break;
				case "attack":
			attack = value;
			break;
				case "defense":
			defense = value;
			break;
				case "speed":
			speed = value;
			break;
				}
			}
			String type = root.get("types").get(0).get("type").get("name").asText();
			String imageUrl = root.get("sprites").get("other").get("official-artwork").get("front_default").asText();
		%>

		<div class="card">

			<!-- Image -->
			<div class="image-section">
				<img src="<%=imageUrl%>" alt="<%=root.get("name").asText()%>">
			</div>

			<!-- Info -->
			<div class="info-section">
				<h2><%=root.get("name").asText()%></h2>
				<p class="tag"><%=type%></p>

				<div class="details">
					<p>
						<strong>Height:</strong>
						<%=root.get("height").asInt()%>
						m
					</p>
					<p>
						<strong>Weight:</strong>
						<%=root.get("weight").asInt()%>
						kg
					</p>
					<p>
						<strong>Base XP:</strong>
						<%=root.get("base_experience").asInt()%></p>
				</div>

				<!-- Stats -->
				<div class="stats">
					<div class="stat-box">
						<span>HP</span><b><%=hp%></b>
					</div>
					<div class="stat-box">
						<span>Attack</span><b><%=attack%></b>
					</div>
					<div class="stat-box">
						<span>Defense</span><b><%=defense%></b>
					</div>
					<div class="stat-box">
						<span>Speed</span><b><%=speed%></b>
					</div>
				</div>
			</div>
		</div>

		<%
		}
		%>

	</div>
</body>
</html>