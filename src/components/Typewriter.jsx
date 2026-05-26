import { useEffect, useState } from 'react';

export default function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const delay = isDeleting ? 45 : 85;
    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 900);
        return;
      }
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }
      setText(current.slice(0, text.length + (isDeleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timer);
  }, [isDeleting, text, wordIndex, words]);

  return <span className="typewriter">{text}<span className="cursor">|</span></span>;
}
