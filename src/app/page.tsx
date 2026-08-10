import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Projects />
      <Skills />
      <About />
    </main>
  );
}