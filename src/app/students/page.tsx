"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("*");
      if (!error) setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Students</h1>
        <Link href="/students/form">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Student
          </button>
        </Link>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">NIS</th>
            <th className="border px-2">School ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-2">{student.name}</td>
              <td className="border px-2">{student.nis}</td>
              <td className="border px-2">{student.school_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
