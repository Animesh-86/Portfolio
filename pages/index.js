import Head from 'next/head'
import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('../components/Hero3D'), { ssr: false })

const skills = [
  'Java',
  'Python',
  'C',
  'JavaScript',
  'TypeScript',
  'Dart',
  'Spring Boot',
  'Kafka',
  'Redis',
  'AWS',
  'Firebase',
  'Docker'
]

const highlights = [
  '600+ DSA problems solved',
  'Finalist in Parul University Hackathon',
  'Selected for OpenAI Academy × NxtWave × IndiaAI Hackathon',
  'ServiceNow CSA & CAD training cohort'
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Animesh Sharma | Software Engineer</title>
        <meta name="description" content="Portfolio of Animesh Sharma, software engineer focused on backend systems, AI/ML, and real-time collaboration." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-blob bg-blob-one" aria-hidden="true" />
      <div className="bg-blob bg-blob-two" aria-hidden="true" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top">Animesh Sharma</a>
          <nav>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">Software Engineer · Backend · AI/ML</p>
              <h1>Building systems that feel fast, intelligent, and real.</h1>
              <p className="hero-text">
                I design distributed platforms, backend APIs, and collaborative product experiences with a focus on clarity,
                performance, and strong engineering fundamentals.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#projects">See selected work</a>
                <a className="btn secondary" href="/api/resume">Download resume</a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>600+</strong>
                  <span>DSA problems solved</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Featured systems</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>Certifications highlighted</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card hero-card-top">
                <span className="card-label">Current focus</span>
                <p>Backend architecture, event-driven systems, and product engineering.</p>
              </div>
              <div className="hero-canvas">
                <Hero3D />
              </div>
              <div className="hero-card hero-card-bottom">
                <span className="card-label">Profile</span>
                <p>Parul University · AI/ML specialization · Freelance Software Engineer</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Professional summary</h2>
          </div>
          <div className="experience-grid">
            <article className="experience-card featured">
              <h3>Freelance Software Engineer</h3>
              <p className="meta">Remote · 2026</p>
              <p>
                Built a serverless POS system for a local cafe, replacing SaaS software and cutting costs by 70%.
                Architected a Firebase backend for real-time inventory and billing, and delivered a Flutter app with offline support.
              </p>
            </article>
            <article className="experience-card">
              <h3>Education</h3>
              <p className="meta">Parul University · 2023 – 2027</p>
              <p>B.Tech in Computer Science & Engineering, specialization in AI/ML with a minor focus on Deep Learning Architectures.</p>
            </article>
            <article className="experience-card">
              <h3>Certifications</h3>
              <p className="meta">Selected credentials</p>
              <p>ServiceNow CSA, AWS Academy Cloud Foundations, HackerRank Java and Python, IBM SkillsBuild AI Fundamentals.</p>
            </article>
          </div>
        </section>

        <section id="projects" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
            <h2>Projects that show range, depth, and execution</h2>
          </div>
          <div className="projects-grid">
            <article className="project-card project-card-large">
              <div className="project-topline">
                <span>Axion</span>
                <span>Python · Spring Boot · Kafka</span>
              </div>
              <h3>EV fleet telemetry and OTA platform</h3>
              <p>Processed 1,000+ sensor events/min, built a Redis-backed digital twin, and delivered canary OTA rollouts.</p>
            </article>
            <article className="project-card">
              <div className="project-topline">
                <span>Parallax</span>
                <span>React · Spring Boot · WebRTC</span>
              </div>
              <h3>Collaborative code editor</h3>
              <p>Low-latency collaborative editing with WebSockets, voice/video, and session reconciliation.</p>
            </article>
            <article className="project-card">
              <div className="project-topline">
                <span>JSON Parser</span>
                <span>Java · JUnit</span>
              </div>
              <h3>Dependency-free JSON parsing library</h3>
              <p>Parsed 10MB+ nested files with constant-time lookups and structured syntax reporting.</p>
            </article>
          </div>
        </section>

        <section id="about" className="section container">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Skills, achievements, and technical range</h2>
          </div>
          <div className="about-layout">
            <article className="about-panel">
              <h3>What I work with</h3>
              <div className="skill-list">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
            <article className="about-panel">
              <h3>Highlights</h3>
              <ul>
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
            <article className="about-panel">
              <h3>Resume snapshot</h3>
              <p>Software engineer with backend focus, event-driven architecture experience, and practical GenAI familiarity.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="section container">
          <div className="contact-wrap">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let’s build something sharp and useful</h2>
              <p className="contact-copy">Open to internships, freelance work, and product engineering roles.</p>
            </div>
            <div className="contact-info">
              <p><strong>Email</strong><a href="mailto:animesh8sharma@gmail.com">animesh8sharma@gmail.com</a></p>
              <p><strong>Phone</strong><a href="tel:+919691633801">+91-9691633801</a></p>
              <p><strong>Resume</strong><a href="/api/resume">Download PDF</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} Animesh Sharma</div>
      </footer>
    </>
  )
}
