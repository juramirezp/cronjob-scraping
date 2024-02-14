const { createClient } = require("@supabase/supabase-js");

const leerDatos = async () => {
	// Crea un cliente de Supabase
	const supabase = createClient(
		"https://nuscdxyrentcqjgchkfa.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c2NkeHlyZW50Y3FqZ2Noa2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MTczODgsImV4cCI6MjAyMzQ5MzM4OH0.8nxaLP0L9HTo3Fj6-OLWGPJanY8eFKv8Zig838veBlw"
	);

	let { data: datos, error } = await supabase
		.from("datos")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(1);

	if (error) {
		console.error("Error al insertar datos:", error);
	} else {
		console.log("Datos leidos correctamente:", datos);
	}
	return { datos, error };
};

leerDatos();
