# Portfolio (Next.js + Three.js)

A professional, interactive portfolio website featuring a 3D data-visualization hero, your resume data, project showcase, and contact section.

## Features

- **3D Interactive Hero** — Data lattice + torus knot with orbit controls (built with React Three Fiber)
- **Resume Integration** — All content (projects, skills, education, achievements) auto-populated from your resume
- **Responsive Design** — Mobile-friendly layout with professional blue color scheme
- **Performance Optimized** — Code splitting, lazy-loaded 3D, and SEO-friendly structure
- **Vercel/Netlify Ready** — Deploy with one click; API routes work out of the box

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Resume PDF Handling

Your resume (`Animesh_Sharma_Resume.pdf`) is served via `/api/resume`:
- The API route streams the PDF from the repo root
- Alternatively, move the PDF to `/public` and link directly for static hosting

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repo → Deploy ✓

### Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select your repo → Configure build: `npm run build`, publish: `.next/out` or `.next` (depending on static export)

## Customization

- **Update 3D Geometry**: Edit `components/Hero3D.js` to change colors, shapes, or rotation speeds
- **Add Links**: Update project GitHub links and social links in `pages/index.js`
- **Styling**: Global styles in `styles/globals.css` — modify `--accent` color, fonts, or spacing
- **Content**: All resume data is hardcoded in `pages/index.js` for now; can be moved to a JSON file or CMS later

## Next Steps

- [ ] Add GitHub project links
- [ ] Set up contact form backend (Netlify Forms, Formspree, or Resend)
- [ ] Add scroll animations and parallax effects
- [ ] Blog/articles section
- [ ] Dark mode toggle
