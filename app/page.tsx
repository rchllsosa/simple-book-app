import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { inter } from "./ui/fonts";
import Books from "./(components)/books/page";

export default async function Index() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 justify-center rounded-lg p-4 md:h-25">
          <p className={`${inter.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Simple Book App</strong>
          </p>
      </div>
      <Books />
    </main>
  );
}
