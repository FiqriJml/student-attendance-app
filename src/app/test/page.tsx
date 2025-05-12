"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthGuard from "@/components/authGuard";

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("students").select("*");
      if (error) console.error(error);
      else setData(data);
    }

    fetchData();
  }, []);

  return (
    // Wrap the content with AuthGuard to ensure authentication
    // and authorization are enforced
    <AuthGuard>
      <div>
        <h1>Test Supabase Connection</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </AuthGuard>
  );
}
