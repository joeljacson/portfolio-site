import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#timeline", label: "TIMELINE" },
  { href: "#contact", label: "CONTACT" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/70 border-b border-border" : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#hero" className="font-tech text-primary text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-live" />
          <span>JOEL_J</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-cloud">v3.0</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-code text-xs tracking-widest">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-primary transition-colors relative group"
            >
              <span className="text-primary mr-1">0{i + 1}.</span>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <button
          aria-label="menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary font-tech text-2xl"
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 flex flex-col gap-4 font-code text-sm">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
