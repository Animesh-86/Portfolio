import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactLinks = [
    {
      label: 'Email',
      value: 'animesh8sharma@gmail.com',
      href: 'mailto:animesh8sharma@gmail.com'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/animesh-sharma-adev',
      href: 'https://www.linkedin.com/in/animesh-sharma-adev'
    },
    {
      label: 'GitHub',
      value: 'github.com/Animesh-86',
      href: 'https://github.com/Animesh-86'
    }
  ];

  const contactDetails = [
    { icon: '✉️', text: 'animesh8sharma@gmail.com' },
    { icon: '📱', text: '+91 XXX XXX XXXX' },
    { icon: '📍', text: 'Gujarat, India' }
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio message from ${formData.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\n\n${formData.message}`
    );

    window.location.href = `mailto:animesh8sharma@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-32" style={{ background: 'rgba(10, 10, 15, 0.72)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 gap-0" style={{ borderTop: '1px solid var(--border)' }}>
          {/* Left Half */}
          <div
            className="p-16 flex flex-col justify-between"
            style={{ borderRight: '1px solid var(--border)', minHeight: '500px' }}
          >
            <div>
              <h2
                className="text-[56px] font-medium leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Let's build something that{' '}
                <span style={{ color: 'var(--primary)' }}>matters.</span>
              </h2>

              <p
                className="text-[14px] font-light mb-12 max-w-md"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)',
                  lineHeight: '1.8'
                }}
              >
                Looking for full-time roles, internship opportunities, or freelance projects. I'm actively seeking teams and clients to build production systems with.
              </p>

              {/* Contact Details */}
              <div className="flex flex-col gap-3">
                {contactDetails.map((detail) => (
                  <div key={detail.text} className="flex items-center gap-3">
                    <span className="text-[16px]">{detail.icon}</span>
                    <span
                      className="text-[12px]"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
                    >
                      {detail.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Half - Form + Links */}
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="p-12 flex flex-col gap-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div>
                <div
                  className="text-[10px] tracking-wider uppercase mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  Send a message
                </div>
                <h3
                  className="text-[28px] font-medium"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  Email me directly.
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  type="text"
                  placeholder="Your name"
                  className="px-4 py-3 text-[13px] outline-none transition-colors"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
                <input
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 text-[13px] outline-none transition-colors"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <textarea
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                placeholder="Tell me what you're building or what role you have in mind..."
                rows={5}
                className="px-4 py-3 text-[13px] outline-none resize-none transition-colors"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              />

              <button
                type="submit"
                className="px-5 py-3 text-[13px] font-medium transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] self-start"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: 'var(--primary)',
                  color: '#ffffff'
                }}
              >
                Send Message
              </button>
            </form>

            {contactLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-8 flex items-center justify-between transition-all duration-300 hover:bg-[var(--surface)]"
                style={{
                  borderBottom:
                    index < contactLinks.length - 1 ? '1px solid var(--border)' : 'none'
                }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[10px] tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-[16px] font-medium italic transition-colors group-hover:text-[var(--primary)]"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
                  >
                    {link.value}
                  </span>
                </div>

                <span
                  className="text-[20px] transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-8 py-6 mt-16"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span
            className="text-[9px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            © 2026 Animesh Sharma · Systems Engineer
          </span>
          <span
            className="text-[9px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            Designed & Built by Animesh Sharma
          </span>
        </div>
      </div>
    </section>
  );
}
