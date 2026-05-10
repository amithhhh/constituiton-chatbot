import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Sample Constitutional Data API
  app.get("/api/articles", (req, res) => {
    const articles = [
      { id: "14", part: "III", title: "Equality before Law", content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.", category: "Fundamental Right" },
      { id: "19", part: "III", title: "Protection of Certain Rights", content: "Protection of certain rights regarding freedom of speech, assembly, association, movement, residence, and profession.", category: "Fundamental Right" },
      { id: "21", part: "III", title: "Protection of Life & Personal Liberty", content: "No person shall be deprived of his life or personal liberty except according to procedure established by law.", category: "Fundamental Right" },
      { id: "32", part: "III", title: "Remedies for Enforcement", content: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part.", category: "Constitutional Remedy" },
      { id: "44", part: "IV", title: "Uniform Civil Code", content: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.", category: "Directive Principle" },
      { id: "51A", part: "IVA", title: "Fundamental Duties", content: "It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions.", category: "Citizenship" }
    ];
    res.json(articles);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
