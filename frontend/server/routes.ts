import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Medicines API routes
  app.get("/api/medicines", async (req, res) => {
    try {
      const query = req.query.q as string | undefined;
      const medicines = await storage.getMedicines(query);
      res.json(medicines);
    } catch (error) {
      res.status(500).json({ message: "Error fetching medicines" });
    }
  });

  app.get("/api/medicines/:id", async (req, res) => {
    try {
      const medicine = await storage.getMedicineById(parseInt(req.params.id));
      if (!medicine) {
        return res.status(404).json({ message: "Medicine not found" });
      }
      res.json(medicine);
    } catch (error) {
      res.status(500).json({ message: "Error fetching medicine" });
    }
  });

  // Symptoms API routes
  app.get("/api/symptoms", async (req, res) => {
    try {
      const query = req.query.q as string | undefined;
      const symptoms = await storage.getSymptoms(query);
      res.json(symptoms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching symptoms" });
    }
  });

  app.get("/api/symptoms/:id/medicines", async (req, res) => {
    try {
      const medicines = await storage.getMedicinesBySymptom(parseInt(req.params.id));
      res.json(medicines);
    } catch (error) {
      res.status(500).json({ message: "Error fetching medicines by symptom" });
    }
  });

  // Pharmacy API routes
  app.get("/api/pharmacies", async (req, res) => {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;
      const zip = req.query.zip as string | undefined;

      const pharmacies = await storage.getPharmacies(lat, lng, zip);
      res.json(pharmacies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pharmacies" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
