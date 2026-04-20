interface Props {
  index: string;
  title: string;
  caption?: string;
}

export const SectionHeader = ({ index, title, caption }: Props) => (
  <div className="mb-12 md:mb-16">
    <div className="flex items-center gap-3 mb-4 font-code text-xs tracking-[0.3em] text-primary">
      <span className="w-8 h-px bg-primary" />
      <span>{index}</span>
      <span className="text-muted-foreground">{caption}</span>
    </div>
    <h2 className="font-tech text-4xl md:text-6xl text-cloud">
      {title}
      <span className="text-primary">.</span>
    </h2>
    <div className="mt-6 h-px w-full" style={{ background: "var(--gradient-line)" }} />
  </div>
);
