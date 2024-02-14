const axios = require("axios");
const cheerio = require("cheerio");
const { createClient } = require("@supabase/supabase-js");

// Crea un cliente de Supabase
const supabase = createClient(
	"https://nuscdxyrentcqjgchkfa.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c2NkeHlyZW50Y3FqZ2Noa2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MTczODgsImV4cCI6MjAyMzQ5MzM4OH0.8nxaLP0L9HTo3Fj6-OLWGPJanY8eFKv8Zig838veBlw"
);

// Función para hacer scraping
async function hacerScraping() {
	const url = "https://desafiolevantemoschile.org/finalizar-compra-2/?causa=levantemos-la-v-region&product_id=203157";
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);
	const elemento = $(
		"#checkout > section > div > div:nth-child(1) > div.row.mb-4.fonto-checkcout > div:nth-child(3) > p:nth-child(1) > span > bdi"
	).text();

	console.log(elemento);

	// Almacena el dato en Supabase
	const { data: insertData, error } = await supabase.from("datos").insert([{ elemento: elemento }]);

	if (error) {
		console.error("Error al insertar datos:", error);
	} else {
		console.log("Datos insertados correctamente:", insertData);
	}
}

hacerScraping();
