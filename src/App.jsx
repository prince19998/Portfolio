import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  Bot,
  BrainCircuit,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Play,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { profile, skills, experience, certifications } from './data/profileData';
import { projectCategories, projects } from './data/projectData';
import ParticleField from './components/ParticleField';
import Typewriter from './components/Typewriter';

const sectionVariant = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);
  const githubUsername = githubUser(profile.github);
  const githubCards = {
    stats: `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${githubUsername}&theme=github_dark`,
    languages: `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${githubUsername}&theme=github_dark`,
    contributions: `https://ghchart.rshah.org/38d9a9/${githubUsername}`,
  };
  const filteredProjects = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((project) => project.tags.includes(activeFilter))),
    [activeFilter],
  );

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 850);
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Research', 'GitHub', 'Contact'];

  if (isLoading) {
    return (
      <div className="loader-screen">
        <div className="loader-orbit" />
        <span>Initializing AI portfolio</span>
      </div>
    );
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Prince Gupta home">
          <span>PG</span>
          Prince Gupta
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <button className="icon-button menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <ParticleField />
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
              <div className="eyebrow">
                <Sparkles size={16} /> Building intelligent systems for real users
              </div>
              <h1>{profile.name}</h1>
              <h2>
                <Typewriter words={['AI/ML Engineer', 'Data Scientist', 'LLM Engineer', 'RAG Systems Builder']} />
              </h2>
              <p>
                I design and build practical AI products across LLM applications, retrieval augmented generation,
                computer vision, FastAPI backends, and polished data-driven interfaces.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={profile.resume} download>
                  <Download size={18} /> Download Resume
                </a>
                <a className="button secondary" href="#contact">
                  <Mail size={18} /> Contact Me
                </a>
              </div>
            </motion.div>
            <motion.div className="hero-panel glass" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.15 }}>
              <div className="signal-card">
                <BrainCircuit size={38} />
                <div>
                  <strong>AI Product Stack</strong>
                  <span>LLMs, RAG, Vision, APIs, Analytics</span>
                </div>
              </div>
              <div className="metric-grid">
                <div><strong>7+</strong><span>Featured Projects</span></div>
                <div><strong>2</strong><span>Internships</span></div>
                <div><strong>Full</strong><span>Static Deploy</span></div>
                <div><strong>AI/ML</strong><span>Ready</span></div>
              </div>
              <div className="code-window">
                <span>Princegupta19998@gmail.com</span>
                <code>{'Data Science, AI/ML Engineer'}</code>
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedSection id="about" className="section about">
          <SectionHeader kicker="About Me" title="Engineer focused on useful intelligence." />
          <div className="about-grid">
            <p>
              I am an AI/ML Engineer and Data Scientist with hands-on experience building LLM-powered assistants,
              RAG pipelines, computer vision systems, Streamlit demos, and backend APIs. My work combines model
              experimentation with practical engineering so prototypes can become dependable products.
            </p>
            <p>
              Through internships at WebMobi360 and Data Einstein Tech Pvt Ltd, plus independent AI/ML projects, I
              have worked across FastAPI, LangChain, Streamlit, YOLO, Hugging Face, Groq API, Ollama, and modern
              React interfaces.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" className="section">
          <SectionHeader kicker="Skills" title="A balanced AI engineering toolkit." />
          <div className="card-grid skills-grid">
            {skills.map((group) => (
              <motion.article className="skill-card glass" key={group.category} whileHover={{ y: -8 }}>
                <Bot size={24} />
                <h3>{group.category}</h3>
                <div className="chips">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="experience" className="section">
          <SectionHeader kicker="Experience" title="Internships and applied AI work." />
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item glass" key={item.company}>
                <span className="timeline-dot" />
                <small>{item.period}</small>
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" className="section projects-section">
          <SectionHeader kicker="Projects" title="Dynamic project system powered by data." />
          <div className="filter-bar" aria-label="Project filters">
            {projectCategories.map((category) => (
              <button key={category} className={activeFilter === category ? 'active' : ''} onClick={() => setActiveFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="card-grid project-grid">
            {filteredProjects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </div>
        </AnimatedSection>

        <AnimatedSection id="certifications" className="section">
          <SectionHeader kicker="Certifications" title="Proof points for continuous learning." />
          <div className="card-grid cert-grid">
            {certifications.map((cert) => (
              <article className="certificate-card glass" key={cert}>
                <Sparkles size={20} />
                <h3>{cert}</h3>
                <span>Certificate</span>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="research" className="section split-section">
          <div>
            <SectionHeader kicker="Research & Publications On IEEE" title="Multimodal AI research direction." />
            <p className="large-copy">
              “Multimodal Emotion Recognition using Vision, Text, and Audio with Transformer Models”
            </p>
          </div>
          <div className="glass research-card">
            <h3>Research Focus</h3>
            <p>Transformer-based fusion of visual, textual, and acoustic signals for richer emotion recognition.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="github" className="section">
          <SectionHeader kicker="GitHub Stats" title="Development activity at a glance." />
          <div className="github-grid">
            <GitHubCard src={githubCards.stats} alt={`${githubUsername} GitHub stats card`} href={profile.github} label="View GitHub stats" />
            <GitHubCard src={githubCards.languages} alt={`${githubUsername} top languages card`} href={`${profile.github}?tab=repositories`} label="View repositories" />
            <img className="contrib" src={githubCards.contributions} alt={`${githubUsername} GitHub contribution graph`} loading="lazy" />
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="section contact-section">
          <SectionHeader kicker="Contact" title="Let’s build intelligent products." />
          <div className="contact-grid">
            <div className="contact-links glass">
              <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              <a href={profile.huggingface} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Hugging Face</a>
            </div>
            <form className="contact-form glass" action={`mailto:${profile.email}`} method="post" encType="text/plain">
              <input aria-label="Name" name="name" placeholder="Your name" required />
              <input aria-label="Email" name="email" type="email" placeholder="Your email" required />
              <textarea aria-label="Message" name="message" rows="5" placeholder="Tell me about your project" required />
              <button className="button primary" type="submit"><Send size={18} /> Send Message</button>
            </form>
          </div>
        </AnimatedSection>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href={profile.github} aria-label="GitHub"><Github size={20} /></a>
          <a href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20} /></a>
        </div>
        <nav>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </nav>
        <p>© 2026 Prince Gupta. Built for AI/ML, Data Science Contact No:- 6386664148.</p>
      </footer>

      <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={20} />
      </button>
    </>
  );
}

function AnimatedSection({ id, className, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ kicker, title }) {
  return (
    <div className="section-header">
      <span>{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article className="project-card glass" whileHover={{ y: -8 }}>
      <div className="project-media">
        <img src={project.image} alt={`${project.title} preview`} />
        <span className={project.status === 'Completed' ? 'status completed' : 'status ongoing'}>{project.status}</span>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="chips">
          {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
        </div>
        <div className="project-links">
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}><Github size={17} /></a>}
          {project.huggingface && <a href={project.huggingface} target="_blank" rel="noreferrer">HF</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={17} /></a>}
          {project.video && <a href={project.video} target="_blank" rel="noreferrer"><Play size={17} /></a>}
        </div>
      </div>
    </motion.article>
  );
}

function GitHubCard({ src, alt, href, label }) {
  const [hasError, setHasError] = useState(false);

  return (
    <a className={hasError ? 'github-card fallback' : 'github-card'} href={href} target="_blank" rel="noreferrer">
      {hasError ? (
        <span>{label}</span>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setHasError(true)} />
      )}
    </a>
  );
}

function githubUser(url) {
  return url.split('/').filter(Boolean).pop() || 'username';
}

export default App;
