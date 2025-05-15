// app/page.tsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("teachers")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setUser(data);
          setUserName(data.name);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Welcome, {userName || "Teacher"}!
        </h1>
        <p className="text-gray-700 mt-2">This is your dashboard.</p>
      </div>
    </main>
  );
}
