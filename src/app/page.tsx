import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Projects />
    </main>
  );
}