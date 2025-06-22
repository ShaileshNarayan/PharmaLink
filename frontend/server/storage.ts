import { 
  users, 
  type User, 
  type InsertUser, 
  Medicine, 
  InsertMedicine, 
  Pharmacy, 
  InsertPharmacy,
  Symptom,
  InsertSymptom
} from "@shared/schema";

// Modify the interface with any CRUD methods needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Medicine methods
  getMedicines(query?: string): Promise<Medicine[]>;
  getMedicineById(id: number): Promise<Medicine | undefined>;
  createMedicine(medicine: InsertMedicine): Promise<Medicine>;
  
  // Pharmacy methods
  getPharmacies(lat?: number, lng?: number, zip?: string): Promise<Pharmacy[]>;
  getPharmacyById(id: number): Promise<Pharmacy | undefined>;
  createPharmacy(pharmacy: InsertPharmacy): Promise<Pharmacy>;
  
  // Symptom methods
  getSymptoms(query?: string): Promise<Symptom[]>;
  getMedicinesBySymptom(symptomId: number): Promise<Medicine[]>;
  createSymptom(symptom: InsertSymptom): Promise<Symptom>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private medicines: Map<number, Medicine>;
  private pharmacies: Map<number, Pharmacy>;
  private symptoms: Map<number, Symptom>;
  
  private userId: number;
  private medicineId: number;
  private pharmacyId: number;
  private symptomId: number;

  constructor() {
    this.users = new Map();
    this.medicines = new Map();
    this.pharmacies = new Map();
    this.symptoms = new Map();
    
    this.userId = 1;
    this.medicineId = 1;
    this.pharmacyId = 1;
    this.symptomId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Add sample medicines
    this.createMedicine({
      name: "Acetaminophen",
      genericName: "Acetaminophen",
      brandNames: ["Tylenol", "Panadol", "Excedrin"],
      description: "Pain reliever and fever reducer used to treat mild to moderate pain and reduce fever.",
      uses: ["Pain relief", "Fever reduction", "Headache", "Muscle aches"],
      sideEffects: ["Nausea", "Rash", "Headache", "Liver damage (with high doses)"],
      dosage: "Adults and children 12 years and over: 650 mg every 4 to 6 hours as needed. Do not take more than 3,250 mg in 24 hours.",
      interactions: ["Alcohol", "Warfarin", "Isoniazid"],
      categories: ["Pain Relief", "Fever Reducer", "OTC"],
      isVerified: true,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop"
    });
    
    this.createMedicine({
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      brandNames: ["Amoxil", "Trimox", "Moxatag"],
      description: "Antibiotic used to treat a variety of bacterial infections, including bronchitis and pneumonia.",
      uses: ["Respiratory infections", "Ear infections", "Urinary tract infections", "Skin infections"],
      sideEffects: ["Diarrhea", "Nausea", "Vomiting", "Rash", "Allergic reactions"],
      dosage: "Adults: 250-500 mg every 8 hours or 500-875 mg every 12 hours, depending on the type and severity of infection.",
      interactions: ["Probenecid", "Allopurinol", "Oral contraceptives"],
      categories: ["Antibiotic", "Prescription", "Infection"],
      isVerified: true,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1585435557885-22b016da2e0b?auto=format&fit=crop"
    });
    
    this.createMedicine({
      name: "Lisinopril",
      genericName: "Lisinopril",
      brandNames: ["Prinivil", "Zestril", "Qbrelis"],
      description: "Used to treat high blood pressure (hypertension) and heart failure, and to improve survival after a heart attack.",
      uses: ["High blood pressure", "Heart failure", "Post heart attack", "Kidney protection in diabetes"],
      sideEffects: ["Dizziness", "Cough", "Headache", "Fatigue", "Low blood pressure"],
      dosage: "Initial dose: 10 mg once daily. Maintenance dose: 20-40 mg once daily.",
      interactions: ["Potassium supplements", "Salt substitutes", "Diuretics", "NSAIDs", "Lithium"],
      categories: ["Blood Pressure", "Heart", "Prescription"],
      isVerified: true,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop"
    });
    
    this.createMedicine({
      name: "Atorvastatin",
      genericName: "Atorvastatin",
      brandNames: ["Lipitor"],
      description: "Statin medication used to lower blood cholesterol and reduce the risk of cardiovascular disease.",
      uses: ["High cholesterol", "Prevention of heart disease", "Stroke prevention"],
      sideEffects: ["Muscle pain", "Liver problems", "Digestive issues", "Increased blood sugar"],
      dosage: "10-80 mg once daily, usually taken in the evening.",
      interactions: ["Grapefruit juice", "Cyclosporine", "Gemfibrozil", "Erythromycin"],
      categories: ["Cholesterol", "Heart", "Prescription"],
      isVerified: true,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1626716493898-012870bc61c2?auto=format&fit=crop"
    });
    
    this.createMedicine({
      name: "Ibuprofen",
      genericName: "Ibuprofen",
      brandNames: ["Advil", "Motrin", "Nurofen"],
      description: "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.",
      uses: ["Pain relief", "Inflammation", "Fever reduction", "Menstrual cramps"],
      sideEffects: ["Stomach pain", "Heartburn", "Dizziness", "Increased risk of heart attack and stroke"],
      dosage: "Adults: 200-400 mg every 4-6 hours as needed. Do not exceed 1200 mg in 24 hours without consulting a doctor.",
      interactions: ["Aspirin", "Blood thinners", "Diuretics", "ACE inhibitors"],
      categories: ["Pain Relief", "Anti-inflammatory", "OTC"],
      isVerified: true,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop"
    });
    
    this.createMedicine({
      name: "Metformin",
      genericName: "Metformin",
      brandNames: ["Glucophage", "Glumetza", "Riomet"],
      description: "First-line medication for the treatment of type 2 diabetes, particularly in people who are overweight.",
      uses: ["Type 2 diabetes", "Insulin resistance", "Polycystic ovary syndrome"],
      sideEffects: ["Nausea", "Diarrhea", "Gas", "Vitamin B12 deficiency", "Lactic acidosis (rare)"],
      dosage: "Initial: 500 mg twice daily or 850 mg once daily. Maintenance: 2000-2500 mg daily, divided into 2-3 doses.",
      interactions: ["Contrast dyes", "Alcohol", "Sulfonylureas", "Cimetidine"],
      categories: ["Diabetes", "Prescription", "Metabolic"],
      isVerified: true,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1593491056588-2f3843114926?auto=format&fit=crop"
    });
    
    // Add sample pharmacies
    this.createPharmacy({
      name: "HealthPlus Pharmacy",
      address: "1234 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "212-555-1234",
      hours: "Open until 9PM",
      latitude: "40.7128",
      longitude: "-74.0060",
      distance: "0.3 miles",
      imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b3db3f2?auto=format&fit=crop"
    });
    
    this.createPharmacy({
      name: "MediCare Pharmacy",
      address: "5678 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      phone: "212-555-2345",
      hours: "Open 24 hours",
      latitude: "40.7142",
      longitude: "-74.0070",
      distance: "0.7 miles",
      imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop"
    });
    
    this.createPharmacy({
      name: "City Drug Store",
      address: "9876 Park Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10022",
      phone: "212-555-3456",
      hours: "Open until 8PM",
      latitude: "40.7200",
      longitude: "-73.9950",
      distance: "1.2 miles",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop"
    });
    
    this.createPharmacy({
      name: "PharmaWorld",
      address: "4321 Lexington Ave",
      city: "New York",
      state: "NY",
      zipCode: "10017",
      phone: "212-555-4567",
      hours: "Open until 10PM",
      latitude: "40.7180",
      longitude: "-73.9960",
      distance: "1.5 miles",
      imageUrl: "https://images.unsplash.com/photo-1583604518057-6fde83a82fb9?auto=format&fit=crop"
    });
    
    // Add sample symptoms
    this.createSymptom({
      name: "Headache",
      relatedMedicines: [1, 5]
    });
    
    this.createSymptom({
      name: "Fever",
      relatedMedicines: [1, 5]
    });
    
    this.createSymptom({
      name: "Cough",
      relatedMedicines: [2]
    });
    
    this.createSymptom({
      name: "High Blood Pressure",
      relatedMedicines: [3]
    });
    
    this.createSymptom({
      name: "High Cholesterol",
      relatedMedicines: [4]
    });
    
    this.createSymptom({
      name: "Inflammation",
      relatedMedicines: [5]
    });
    
    this.createSymptom({
      name: "Diabetes",
      relatedMedicines: [6]
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Medicine methods
  async getMedicines(query?: string): Promise<Medicine[]> {
    let medicines = Array.from(this.medicines.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      medicines = medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(lowerQuery) ||
        medicine.genericName.toLowerCase().includes(lowerQuery) ||
        medicine.brandNames.some(name => name.toLowerCase().includes(lowerQuery)) ||
        medicine.description.toLowerCase().includes(lowerQuery) ||
        medicine.uses.some(use => use.toLowerCase().includes(lowerQuery)) ||
        medicine.categories.some(category => category.toLowerCase().includes(lowerQuery))
      );
    }
    
    return medicines;
  }
  
  async getMedicineById(id: number): Promise<Medicine | undefined> {
    return this.medicines.get(id);
  }
  
  async createMedicine(insertMedicine: InsertMedicine): Promise<Medicine> {
    const id = this.medicineId++;
    const medicine: Medicine = { ...insertMedicine, id };
    this.medicines.set(id, medicine);
    return medicine;
  }
  
  // Pharmacy methods
  async getPharmacies(lat?: number, lng?: number, zip?: string): Promise<Pharmacy[]> {
    let pharmacies = Array.from(this.pharmacies.values());
    
    // For a real application, we would use lat/lng to calculate distances
    // For this demo, we'll just return all pharmacies
    
    return pharmacies;
  }
  
  async getPharmacyById(id: number): Promise<Pharmacy | undefined> {
    return this.pharmacies.get(id);
  }
  
  async createPharmacy(insertPharmacy: InsertPharmacy): Promise<Pharmacy> {
    const id = this.pharmacyId++;
    const pharmacy: Pharmacy = { ...insertPharmacy, id };
    this.pharmacies.set(id, pharmacy);
    return pharmacy;
  }
  
  // Symptom methods
  async getSymptoms(query?: string): Promise<Symptom[]> {
    let symptoms = Array.from(this.symptoms.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      symptoms = symptoms.filter(symptom => 
        symptom.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    return symptoms;
  }
  
  async getMedicinesBySymptom(symptomId: number): Promise<Medicine[]> {
    const symptom = this.symptoms.get(symptomId);
    
    if (!symptom || !symptom.relatedMedicines) {
      return [];
    }
    
    return symptom.relatedMedicines
      .map(id => this.medicines.get(id))
      .filter(Boolean) as Medicine[];
  }
  
  async createSymptom(insertSymptom: InsertSymptom): Promise<Symptom> {
    const id = this.symptomId++;
    const symptom: Symptom = { ...insertSymptom, id };
    this.symptoms.set(id, symptom);
    return symptom;
  }
}

export const storage = new MemStorage();
