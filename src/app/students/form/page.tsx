"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("students")
      .insert([{ name, nis, school_id: schoolId }]);

    if (error) {
      console.error("Error inserting student:", error);
    } else {
      console.log("Student inserted:", data);
      router.push("/students");
    }
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
        <label>School ID</label>
        <input
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="border px-2 py-1 w-full"
        />
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
