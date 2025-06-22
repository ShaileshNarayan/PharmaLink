import React from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Info, Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DoctorVerifiedBadge from '@/components/ui/doctor-verified-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const renderRichText = (blocks: any[]) => {
  return blocks?.map((block, i) => {
    if (!block || !block.children) return null;
    return (
      <p key={i} className="mb-2 text-gray-700">
        {block.children.map((child: any, j: number) => {
          let content = child.text;
          if (child.bold) content = <strong key={j}>{content}</strong>;
          if (child.underline) content = <u key={j}>{content}</u>;
          if (child.italic) content = <em key={j}>{content}</em>;
          return <React.Fragment key={j}>{content}</React.Fragment>;
        })}
      </p>
    );
  });
};



const MedicineDetails: React.FC = () => {
  const { medicineId } = useParams<{ medicineId?: string }>();
  const [_, navigate] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['medicineDetails', medicineId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:1337/api/medicines?filters[documentId]=${medicineId}&populate=*`);
      const json = await res.json();
      return json.data?.[0];
    },
    enabled: !!medicineId,
  });

  if (isLoading) return <p className="p-10 text-gray-600">Loading...</p>;
  if (error || !data) return <p className="p-10 text-red-600">Failed to load medicine details.</p>;

  const medicine = data;
  const name = data.name;
  const doctorName = medicine.Added_by?.name || 'Doctor';
  const imageUrl = data.image?.url ? `http://localhost:1337${data.image.url}` : null;
  
  const overview = renderRichText(data.overview);
  const dosage = renderRichText(data.dosage);
  const sideEffects = renderRichText(data.sideEffects);
  const interactions = renderRichText(data.interactions);

  const handleBackClick = () => navigate('/');
  const handleFindPharmacies = () => navigate(`/pharmacy-locator/${medicineId}`);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex min-h-[600px]">
              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" onClick={handleBackClick}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Medicines
                    </Button>
                    <DoctorVerifiedBadge />
                  </div>
                  {imageUrl && (
                    <div className="flex justify-center mb-6">
                      <img
                        src={imageUrl}
                        alt={`${name} medication`}
                        className="rounded-lg shadow-md w-48 h-48 object-cover"
                      />
                    </div>
                  )}

                  <h1 className="text-2xl font-bold text-neutral-dark mb-2">{name}</h1>
                  <Badge>
  {doctorName ? `Validated by ${doctorName}` : 'Validating...'}
</Badge>

                  <div className="mt-6">
                    <Button className="w-full" onClick={handleFindPharmacies}>
                      Find This Medicine Nearby
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="p-6">
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4 border-b border-gray-200 w-full justify-start">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
                      <TabsTrigger value="dosage">Dosage</TabsTrigger>
                      <TabsTrigger value="interactions">Interactions</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <h2 className="text-xl font-bold text-neutral-dark mb-4">What is {name}?</h2>
                      <div>{overview}</div>
                    </TabsContent>

                    <TabsContent value="side-effects">
                      <h2 className="text-xl font-bold text-neutral-dark mb-4">Side Effects</h2>
                      <div>{sideEffects}</div>
                    </TabsContent>

                    <TabsContent value="dosage">
                      <h2 className="text-xl font-bold text-neutral-dark mb-4">Dosage Information</h2>
                      <div>{dosage}</div>
                    </TabsContent>

                    <TabsContent value="interactions">
                      <h2 className="text-xl font-bold text-neutral-dark mb-4">Drug Interactions</h2>
                      <div>{interactions}</div>
                    </TabsContent>

                    <TabsContent value="reviews">
                      <h2 className="text-xl font-bold text-neutral-dark mb-4">Patient Reviews</h2>
                      <p className="text-gray-600">
                        Reviews coming soon. Be the first to share your experience with {name}.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MedicineDetails;
