import { supabase } from "@/lib/supabase";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  const { data: ripples, error } = await supabase
    .from("ripples")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch ripples:", error);
  }

  return <ExploreClient ripples={ripples || []} />;
}