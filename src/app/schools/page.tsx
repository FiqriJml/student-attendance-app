"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);

  const fetchSchools = async () => {
    const { data, error } = await supabase.from("schools").select();
    if (!error) setSchools(data);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("schools").delete().eq("id", id);
    fetchSchools();
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schools</h1>
        <Link href="/schools/form">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add School
          </button>
        </Link>
      </div>
      <ul className="space-y-3">
        {schools.map((school) => (
          <li
            key={school.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{school.name}</p>
              <p className="text-sm text-gray-600">{school.address}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/schools/form?id=${school.id}`}>
                <button className="text-blue-500">Edit</button>
              </Link>
              <button
                className="text-red-500"
                onClick={() => handleDelete(school.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
