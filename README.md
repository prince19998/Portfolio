# Prince Gupta AI/ML Portfolio

Premium, responsive, fully static portfolio website for Prince Gupta, an AI/ML Engineer, Data Scientist, and LLM Engineer. Built with React, Vite, CSS3, Framer Motion, and Lucide icons.

## Features

- Dark futuristic UI with glassmorphism
- Responsive layouts for mobile, tablet, and desktop
- Animated hero, typewriter effect, section transitions, and particle background
- Scroll progress bar, loading animation, and back-to-top button
- Dynamic project cards powered by `src/data/projectData.js`
- Project filters for AI/ML, LLM, Computer Vision, Web Apps, Research, and APIs
- GitHub stats, top languages, and contribution graph embeds
- SEO meta tags and static deployment support

## Folder Structure

```text
.
├── public
│   ├── projects
│   │   ├── ai-interview.svg
│   │   ├── email-assistant.svg
│   │   ├── meeting-bot.svg
│   │   ├── music-recommender.svg
│   │   ├── rag-chatbot.svg
│   │   ├── voice-assistant.svg
│   │   └── yolo-detection.svg
│   └── resume-prince-gupta.pdf
├── src
│   ├── components
│   │   ├── ParticleField.jsx
│   │   └── Typewriter.jsx
│   ├── data
│   │   ├── profileData.js
│   │   └── projectData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Update Profile Links

Edit `src/data/profileData.js`:

```js
export const profile = {
  email: 'your-email@example.com',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  github: 'https://github.com/your-username',
  huggingface: 'https://huggingface.co/your-username',
};
```

Replace `public/resume-prince-gupta.pdf` with the final resume file before deployment.

## Add or Edit Projects

Projects are rendered from `src/data/projectData.js`. Add a new object to the `projects` array:

```js
{
  title: 'AI Email Assistant',
  description: 'AI-powered email assistant using LangChain and Groq API',
  image: '/projects/email-assistant.svg',
  techStack: ['Python', 'LangChain', 'Groq API'],
  github: 'https://github.com/username/project',
  huggingface: 'https://huggingface.co/spaces/username/project',
  demo: 'https://project-demo.vercel.app',
  video: 'https://youtube.com/watch?v=demo',
  tags: ['LLM', 'AI/ML', 'APIs'],
  status: 'Completed',
}
```

The website automatically renders the card and includes it in matching filters.

## Deploy to GitHub Pages

1. Install the GitHub Pages package:

```bash
npm install --save-dev gh-pages
```

2. Add these scripts to `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Deploy:

```bash
npm run deploy
```

## Deploy to Netlify

1. Push the project to GitHub.
2. Create a new Netlify site from the repository.
3. Use these settings:

```text
Build command: npm run build
Publish directory: dist
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Vercel will detect Vite automatically.
4. Use:

```text
Build command: npm run build
Output directory: dist
```

## Notes

- The contact form uses `mailto:` so the site remains fully static.
- GitHub cards use the username from `profile.github`.
- For a custom domain, configure DNS in GitHub Pages, Netlify, or Vercel after deployment.
