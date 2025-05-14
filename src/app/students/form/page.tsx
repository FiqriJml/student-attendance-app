"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schools, setSchools] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");

  useEffect(() => {
    const fetchSchools = async () => {
      const { data, error } = await supabase.from("schools").select("id, name");
      if (!error) setSchools(data);
    };

    const fetchStudent = async () => {
      if (studentId) {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("id", studentId)
          .single();
        if (!error) {
          setName(data.name);
          setNis(data.nis);
          setSchoolId(data.school_id);
        }
      }
    };

    fetchSchools();
    fetchStudent();
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (studentId) {
      await supabase
        .from("students")
        .update({ name, nis, school_id: schoolId })
        .eq("id", studentId);
    } else {
      await supabase
        .from("students")
        .insert([{ name, nis, school_id: schoolId }]);
    }
    router.push("/students");
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Add Student</h2>
      <div>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div>
        <label>NIS</label>
        <input
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div>
        <label>School</label>
        <select
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        >
          <option value="">Select School</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Save
      </button>
    </form>
  );
}
