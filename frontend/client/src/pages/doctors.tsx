import React, { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  id: number;
  attributes: {
    name: string;
    specialization: string;
    expertise: any;
    email: string;
    phone: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
}


function renderExpertise(expertise: any[]) {
  if (!Array.isArray(expertise)) return "General Medicine";

  return expertise
    .map((block) =>
      block.children?.map((child: any) => child.text).join(" ")
    )
    .join("\n");
}

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:1337/api/doctors?populate=image");
        console.log("Fetched Doctors:", res.data.data);
        setDoctors(res.data.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p className="text-center p-10">Loading doctors...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Our Contributing Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {doctors.map((doc: any) => {
  if (!doc) return null;

  const {
    name,
    specialization,
    expertise,
    email,
    phone,
    image,
  } = doc;

  const imageUrl =
    image && image.url
      ? `http://localhost:1337${image.url}`
      : require("../assets/fallback-doctor.png");

return (
  <div
    key={doc.id}
    className="bg-white rounded-lg border border-gray-250 hover:shadow-md transition duration-300 cursor-pointer overflow-hidden"
  >
    <div className="p-6 text-center">
      <img
        src={imageUrl}
        alt={name}
        className="mx-auto rounded-full h-32 w-32 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-neutral-dark mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">{renderExpertise(expertise)}</p>
      <br></br>
      <a href={'mailto:${email}'} className="text-sm text-blue-600 hover:underline mt-2 block">
        {email}
      </a>
      <p className="text-sm text-gray-600">{phone}</p>
    </div>
  </div>
);

})}
      </div>
    </div>
  );
};

export default DoctorsPage;
