"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);

  const fetchTeachers = async () => {
    const { data, error } = await supabase.from("teachers").select("*");
    if (!error) setTeachers(data);
  };

  const deleteTeacher = async (id: number) => {
    await supabase.from("teachers").delete().eq("id", id);
    fetchTeachers();
  };
  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Teachers</h1>
        <Link href="/teachers/form">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Add Teacher
          </button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">NIP</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border px-2">{teacher.name}</td>
              <td className="border px-2">{teacher.nip}</td>
              <td className="border px-2">{teacher.email}</td>
              <td className="border px-2">
                <Link href={`/teachers/form?id=${teacher.id}`}>
                  <button className="text-blue-500 mr-2">Edit</button>
                </Link>
                <button
                  onClick={() => deleteTeacher(teacher.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
