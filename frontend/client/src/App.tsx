import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import MedicineDetail from "@/pages/medicine-detail";
import PharmacyLocator from "@/pages/pharmacy-locator";
import AboutUs from "@/pages/about";
import DoctorsPage from "@/pages/doctors";
import MainLayout from "@/components/layout/MainLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/medicine/:medicineId" component={MedicineDetail} />
      <Route path="/pharmacy-locator" component={PharmacyLocator} />
      <Route path="/pharmacy-locator/:medicineId" component={PharmacyLocator} />
      <Route path="/about" component={AboutUs} />
      <Route path="/doctors" component={DoctorsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
