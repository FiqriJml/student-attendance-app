"use client";

import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TeachersFormPage() {
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schools, setSchools] = useState<any[]>([]);

  const router = useRouter();
  const seachParams = useSearchParams();
  const id = seachParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const { data: schoolData, error } = await supabase
        .from("schools")
        .select("id, name");
      if (!error) setSchools(schoolData);
      if (id) {
        const { data: teacerData } = await supabase
          .from("teachers")
          .select("*")
          .eq("id", id)
          .single();
        if (teacerData) {
          setName(teacerData.name);
          setNip(teacerData.nip);
          setEmail(teacerData.email);

          const { data: link } = await supabase
            .from("teacher_schools")
            .select("school_id")
            .eq("teacher_id", id)
            .single();
          if (link) {
            setSchoolId(link.school_id);
          }
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let teacherId = id;
    if (id) {
      await supabase.from("teachers").update({ name, nip, email }).eq("id", id);
    } else {
      const { data, error } = await supabase
        .from("teachers")
        .insert({ name, nip, email })
        .select()
        .single();
      if (data) {
        teacherId = data.id;
      }
    }
    // handle school relation
    await supabase.from("teacher_schools").upsert(
      {
        teacher_id: teacherId,
        school_id: schoolId,
      },
      { onConflict: "teacher_id" }
    );
    // .insert({ teacher_id: teacherId, school_id: schoolId })

    router.push("/teachers");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{id ? "Edit" : "Add"} Teacher</h2>

      <div>
        <label>Name</label>
        <input
          className="border w-full px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>NIP</label>
        <input
          className="border w-full px-2 py-1"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          className="border w-full px-2 py-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>School</label>
        <select
          className="border w-full px-2 py-1"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          required
        >
          <option value="">Select a school</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
