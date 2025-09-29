import http from "http";
import { listNotes, createNote, updateNote, deleteNote, searchNotes } from "./lib/notes.js";

const PORT = 3001;

// Create HTTP server
const server = http.createServer(async (req, res) => {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}

	// Handle API routes
	if (req.url.startsWith("/api/")) {
		// Set response headers for API routes
		res.setHeader("Content-Type", "application/json");

		// API routing
		if (req.url === "/api/notes" && req.method === "GET") {
			// GET all notes
			try {
				const notes = await listNotes();
				res.writeHead(200);
				res.end(JSON.stringify(notes));
			} catch (error) {
				res.writeHead(500);
				res.end(JSON.stringify({ error: "Failed to fetch notes" }));
			}

		} else if (req.url.startsWith("/api/notes/search") && req.method === "GET") {
			// GET - search notes by query parameter
			console.log('Search endpoint hit, URL:', req.url);
			const url = new URL(req.url, `http://${req.headers.host}`);
			const query = url.searchParams.get('q');
			console.log('Extracted query:', query);

			if (!query || query.trim() === '') {
				res.writeHead(400);
				return res.end(JSON.stringify({ error: "Search query is required" }));
			}

			try {
				const notes = await searchNotes(query.trim());
				res.writeHead(200);
				res.end(JSON.stringify(notes));
			} catch (error) {
				console.error('Search error:', error);
				res.writeHead(500);
				res.end(JSON.stringify({ error: "Failed to search notes" }));
			}
		} else if (req.url.startsWith("/api/notes/") && req.method === "GET") {
			// GET a note by ID
			const id = req.url.split("/").pop();

			try {
				const notes = await listNotes();
				const foundNote = notes.find((note) => note.id === Number(id));

				if (foundNote) {
					res.writeHead(200);
					res.end(JSON.stringify(foundNote));
				} else {
					res.writeHead(404);
					res.end(JSON.stringify({ error: "Note not found" }));
				}
			} catch (error) {
				res.writeHead(500);
				res.end(JSON.stringify({ error: "Failed to fetch note" }));
			}
		} else if (req.url === "/api/notes" && req.method === "POST") {
			// POST - create a new note
			let body = "";

			req.on("data", (chunk) => {
				body += chunk;
			});

			req.on("end", async () => {
				try {
					const data = JSON.parse(body || "{}");

					// Validate fields
					const note_title =
						typeof data.note_title === "string"
							? data.note_title.trim()
							: "";
					const note_text =
						typeof data.note_text === "string"
							? data.note_text.trim()
							: "";

					if (!note_title) {
						res.writeHead(400);
						return res.end(
							JSON.stringify({ error: "Note title is required" })
						);
					}

					if (!note_text) {
						res.writeHead(400);
						return res.end(
							JSON.stringify({ error: "Note text is required" })
						);
					}

					// Create and store the new note in Supabase
					const newNote = await createNote({
						note_title,
						note_text,
					});

					// Respond with created resource
					res.writeHead(201);
					return res.end(JSON.stringify(newNote));
				} catch (error) {
					res.writeHead(400);
					return res.end(
						JSON.stringify({
							error: "Invalid JSON or failed to create note",
						})
					);
				}
			});

			return;
		} else if (req.url.startsWith("/api/notes/") && req.method === "PUT") {
			// PUT - update an existing note
			const id = req.url.split("/").pop();

			// Get request body
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", async () => {
				try {
					const data = JSON.parse(body);

					// Validate fields
					const note_title =
						typeof data.note_title === "string"
							? data.note_title.trim()
							: "";
					const note_text =
						typeof data.note_text === "string"
							? data.note_text.trim()
							: "";

					if (!note_title) {
						res.writeHead(400);
						return res.end(
							JSON.stringify({ error: "Note title is required" })
						);
					}

					if (!note_text) {
						res.writeHead(400);
						return res.end(
							JSON.stringify({ error: "Note text is required" })
						);
					}

					const updatedNote = await updateNote(Number(id), {
						note_title,
						note_text,
					});
					res.writeHead(200);
					return res.end(JSON.stringify(updatedNote));
				} catch (error) {
					if (error.message && error.message.includes("No rows")) {
						res.writeHead(404);
						return res.end(
							JSON.stringify({ error: "Note not found" })
						);
					}
					res.writeHead(500);
					return res.end(
						JSON.stringify({ error: "Failed to update note" })
					);
				}
			});
		} else if (
			req.url.startsWith("/api/notes/") &&
			req.method === "DELETE"
		) {
			// DELETE a note by ID
			const id = req.url.split("/").pop();

			try {
				await deleteNote(Number(id));
				res.writeHead(204);
				return res.end();
			} catch (error) {
				if (error.message && error.message.includes("No rows")) {
					res.writeHead(404);
					return res.end(JSON.stringify({ error: "Note not found" }));
				}
				res.writeHead(500);
				return res.end(
					JSON.stringify({ error: "Failed to delete note" })
				);
			}
		} else {
			// 404 handler for API routes
			res.writeHead(404);
			res.end(
				JSON.stringify({
					error: "Not found",
					message: "The requested API route does not exist",
				})
			);
		}
	} else {
		// 404 for non-API routes
		res.writeHead(404);
		res.end("Not Found");
	}
});

// Start server
server.listen(PORT, () => {
	console.log(`API server is running on http://localhost:${PORT}`);
});