import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { ChatBot } from "@/components/ChatBot";
import { useClickSfx } from "@/hooks/useClickSfx";

const Index = () => {
  useClickSfx();
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
      <ChatBot />
    </main>
  );
};

export default Index;
