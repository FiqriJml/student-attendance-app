"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SchoolForm() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (id) {
      supabase
        .from("schools")
        .select()
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (data) {
            setName(data.name);
            setAddress(data.address);
          }
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await supabase.from("schools").update({ name, address }).eq("id", id);
    } else {
      await supabase.from("schools").insert({ name, address });
    }
    router.push("/schools");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit" : "Add"} School
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/schools")}
            className="px-4 py-2 border border-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
