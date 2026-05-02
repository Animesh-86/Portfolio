interface RecognitionItem {
  kind: 'image' | 'pdf';
  title: string;
  subtitle: string;
  description: string;
  href: string;
  preview?: string;
  accent: string;
  featured?: boolean;
}

const recognitions: RecognitionItem[] = [
  {
    kind: 'image',
    title: 'AWS Academy Graduate',
    subtitle: 'Cloud Foundations',
    description: 'Certificate for foundational cloud architecture and AWS concepts.',
    href: '/certificates/aws-academy-cloud-foundations.png',
    preview: '/certificates/aws-academy-cloud-foundations.png',
    accent: 'var(--primary)',
    featured: true
  },
  {
    kind: 'image',
    title: 'IBM AI SkillsBuild',
    subtitle: 'Artificial Intelligence',
    description: 'AI fundamentals badge and learning milestone from IBM SkillsBuild.',
    href: '/certificates/ibm-ai-skillsbuild.png',
    preview: '/certificates/ibm-ai-skillsbuild.png',
    accent: 'var(--secondary)'
  },
  {
    kind: 'image',
    title: 'ServiceNow Micro Certification',
    subtitle: 'Welcome ServiceNow',
    description: 'Micro-certification card from the ServiceNow learning track.',
    href: '/certificates/servicenow-micro-certification.png',
    preview: '/certificates/servicenow-micro-certification.png',
    accent: 'var(--highlight)'
  },
  {
    kind: 'pdf',
    title: 'Python Basic Certificate',
    subtitle: 'Programming Fundamentals',
    description: 'PDF certificate for Python basics and core problem-solving foundations.',
    href: '/certificates/python-basic-certificate.pdf',
    accent: 'var(--primary)'
  },
  {
    kind: 'image',
    title: 'Java Certificate',
    subtitle: 'Language Proficiency',
    description: 'Java certificate preview from the certificate bundle.',
    href: '/certificates/java.png',
    preview: '/certificates/java.png',
    accent: 'var(--secondary)'
  },
  {
    kind: 'image',
    title: 'HTML & CSS',
    subtitle: 'Frontend Basics',
    description: 'Frontend fundamentals certificate for semantic markup and styling.',
    href: '/certificates/html-css.jpeg',
    preview: '/certificates/html-css.jpeg',
    accent: 'var(--highlight)'
  }
];

export function Achievements() {
  return (
    <section className="py-32 relative" style={{ background: 'var(--background)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Number Watermark */}
        <div
          className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          04
        </div>

        {/* Section Tag */}
        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // Recognition
        </div>

        {/* Header */}
        <div className="mb-16 relative z-10">
          <h2
            className="text-[48px] font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Certificates & Recognition<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p
            className="mt-4 text-[14px] max-w-2xl"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}
          >
            Selected proofs of work from the resume bundle. Each card opens the original certificate or document.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {recognitions.map((item, index) => (
            <RecognitionCard key={item.title} item={item} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecognitionCard({ item, featured = false }: { item: RecognitionItem; featured?: boolean }) {
  const cardClassName = featured
    ? 'col-span-2 p-8 group relative overflow-hidden transition-all duration-300 hover:border-[var(--primary)]'
    : 'p-6 group relative transition-all duration-300 hover:border-[var(--primary)]';

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)'
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: item.accent }}
      />

      {item.kind === 'image' && item.preview ? (
        <div className={featured ? 'grid grid-cols-[1.2fr_0.8fr] gap-6 items-center' : 'flex flex-col gap-4'}>
          <div>
            <div className="text-[12px] tracking-[0.15em] uppercase mb-3" style={{ fontFamily: 'var(--font-mono)', color: item.accent }}>
              {featured ? 'Featured Certificate' : 'Certificate'}
            </div>
            <h3 className="text-[24px] font-medium mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <div className="text-[9px] tracking-wider uppercase mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--highlight)' }}>
              {item.subtitle}
            </div>
            <p className="text-[12px] max-w-md" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
              {item.description}
            </p>
            <div className="mt-6 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              View certificate ↗
            </div>
          </div>
          <div className={featured ? 'rounded-[14px] overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)]' : 'rounded-[12px] overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)]'}>
            <img
              src={item.preview}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full min-h-[220px] flex-col justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.15em] uppercase mb-3" style={{ fontFamily: 'var(--font-mono)', color: item.accent }}>
              Document
            </div>
            <h3 className="text-[24px] font-medium mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <div className="text-[9px] tracking-wider uppercase mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--highlight)' }}>
              {item.subtitle}
            </div>
            <p className="text-[12px] max-w-md" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
              {item.description}
            </p>
          </div>
          <div
            className="rounded-[14px] p-5 border border-[var(--border)] bg-[rgba(255,255,255,0.02)]"
            style={{ color: 'var(--text-primary)' }}
          >
            <div className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'var(--font-mono)', color: item.accent }}>
              PDF Certificate
            </div>
            <div className="text-[22px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </div>
            <div className="mt-4 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Open document ↗
            </div>
          </div>
        </div>
      )}
    </a>
  );
}
