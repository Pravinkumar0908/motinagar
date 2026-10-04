type SectionHeadingProps = { eyebrow: string; title: string; description?: string }

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-terracotta">{eyebrow}</p>
      <h1 className="font-hindi text-3xl font-extrabold leading-tight text-[#293a30] sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl font-hindi text-base leading-8 text-[#6c7b6f]">{description}</p>}
    </div>
  )
}
