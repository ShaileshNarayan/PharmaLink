import { Medicine, Pharmacy, Symptom } from '@shared/schema';

export interface SearchResult {
  medicines: Medicine[];
  symptoms: Symptom[];
}

export interface PharmacySearchParams {
  zipCode?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  medicineId?: number;
}

export interface MedicineCardProps {
  medicine: Medicine;
  compact?: boolean;
}

export interface DoctorVerficationInfo {
  name: string;
  credential: string;
  verificationDate: string;
}
