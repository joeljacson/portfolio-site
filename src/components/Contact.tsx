import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("All fields required");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Transmission received. I'll reply soon.");
    }, 2400);
  };

  const Field = ({ label, name, type = "text", textarea = false }: { label: string; name: keyof typeof form; type?: string; textarea?: boolean }) => (
    <label className="block">
      <span className="font-code text-[10px] tracking-[0.25em] text-primary block mb-2">[{label}]</span>
      {textarea ? (
        <textarea
          rows={5}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 font-code text-cloud resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 font-code text-cloud transition-colors"
        />
      )}
    </label>
  );

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader index="05" caption="// open_channel.exe" title="Contact" />

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Got a data pipeline to build, an AI idea to prototype, or just want to say hi? Drop a transmission — I read every one.
            </p>

            <div className="space-y-4 font-code text-sm">
              <a href="mailto:jamesjoel7114@gmail.com" className="flex items-center gap-3 text-cloud hover:text-primary transition-colors group">
                <span className="w-9 h-9 grid place-items-center border border-border group-hover:border-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                jamesjoel7114@gmail.com
              </a>
              <a href="tel:+919363674032" className="flex items-center gap-3 text-cloud hover:text-primary transition-colors group">
                <span className="w-9 h-9 grid place-items-center border border-border group-hover:border-primary transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                +91 93636 74032
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-9 h-9 grid place-items-center border border-border">
                  <MapPin className="w-4 h-4" />
                </span>
                Chennai, India
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a href="https://linkedin.com/in/joeljacsonj" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/joeljacson" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="panel p-4 font-code text-xs text-muted-foreground">
              <span className="text-primary">$ status</span> → available for freelance &amp; full-time roles · IST hours preferred
            </div>
          </div>

          <form onSubmit={onSubmit} className="panel p-6 md:p-8 relative overflow-hidden">
            <div className="space-y-6">
              <Field label="NAME" name="name" />
              <Field label="EMAIL" name="email" type="email" />
              <Field label="MESSAGE" name="message" textarea />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 py-4 bg-primary text-primary-foreground font-code text-sm tracking-[0.25em] uppercase rounded-sm hover:bg-primary-glow disabled:opacity-70 transition-colors"
            >
              {sending ? "TRANSMITTING..." : "SEND_TRANSMISSION"}
              <Send className="w-4 h-4" />
            </button>

            {/* radar sweep overlay when sending */}
            {sending && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 origin-center animate-radar"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.18) 40deg, transparent 80deg)",
                  }}
                />
              </div>
            )}
          </form>
        </div>

        <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 font-code text-xs text-muted-foreground">
          <span>
            <span className="text-primary">©</span> 2026 Joel Jacson J — Built with conviction in Chennai.
          </span>
          <span>SYS_VERSION 3.0 · UPTIME 100%</span>
        </footer>
      </div>
    </section>
  );
};
