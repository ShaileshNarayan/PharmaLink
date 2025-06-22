import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Building, Award, Target, Heart } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-neutral-dark">About PharmaLink</h1>
        <p className="text-xl text-gray-600">
          Empowering individuals with accurate information about medications, helping them make
          informed decisions about their health.
        </p>
      </div>

      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-neutral-dark">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At PharmaLink, our mission is to provide reliable, accessible, and easy-to-understand
                  information about medications to patients, caregivers, and healthcare professionals.
                  We believe that better information leads to better health outcomes.
                </p>
                <p className="text-gray-600">
                  Founded in 2020 by a team of healthcare professionals and technology experts,
                  PharmaLink has quickly become a trusted resource for medication information,
                  reaching millions of users worldwide.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-neutral-dark">PharmaLink by Numbers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-lg">10,000+ Medications</span>
                      <span className="text-gray-600">Comprehensive database of prescription and over-the-counter drugs</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-lg">200+ Medical Professionals</span>
                      <span className="text-gray-600">Doctors and pharmacists who verify our information</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-lg">3 Million+ Monthly Users</span>
                      <span className="text-gray-600">People who trust PharmaLink for medication information</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-neutral-dark">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-dark">Accuracy</h3>
              <p className="text-gray-600">
                All information is thoroughly researched and verified by medical professionals
                to ensure the highest level of accuracy.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-dark">Accessibility</h3>
              <p className="text-gray-600">
                We believe health information should be accessible to everyone, presented in
                clear language that's easy to understand.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-dark">Empowerment</h3>
              <p className="text-gray-600">
                We empower individuals to take control of their health through
                knowledge, transparency, and education.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Our Team</h2>
            <p className="text-gray-600 mb-4">
              PharmaLink is powered by a diverse team of healthcare professionals, including doctors,
              pharmacists, and medical researchers, alongside technology experts, designers, and
              content specialists.
            </p>
            <p className="text-gray-600 mb-6">
              Our leadership team consists of experienced professionals from both the medical and
              technology fields, ensuring that PharmaLink delivers the highest quality information
              through an accessible, user-friendly platform.
            </p>
            <div className="flex justify-center">
              <a href="/doctors" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors duration-300">
                Meet Our Doctors
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <Users className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-dark">General Inquiries</h3>
                    <p className="text-gray-600">info@pharmalink.com</p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Building className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-dark">Headquarters</h3>
                    <p className="text-gray-600">
                      123 Health Avenue<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-dark mb-3">For Medical Professionals</h3>
                <p className="text-gray-600 mb-4">
                  Interested in joining our network of medical professionals who verify medication information?
                  We're always looking for qualified doctors, pharmacists, and specialists to join our team.
                </p>
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  Learn More About Joining
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;