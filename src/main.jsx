import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Globe2, ChevronDown, Check } from 'lucide-react';
import './modern.css';

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

const COPY = {
  es: {
    login: 'iniciar sesión',
    join: 'únete ahora',
    learn: 'LO QUE APRENDERÁS',
    reviews: 'OPINIONES DE NUESTROS ESTUDIANTES',
    escape: '¿LISTO PARA ESCAPAR? ÚNETE AHORA',
    access: 'TENDRÁS ACCESO A',
    thoughts: 'REFLEXIONES FINALES',
    faq: 'Preguntas frecuentes',
    more: 'VER MÁS',
  },
  fr: {
    login: 'se connecter',
    join: 'rejoindre maintenant',
    learn: 'CE QUE VOUS APPRENDREZ',
    reviews: 'AVIS DE NOS ÉTUDIANTS',
    escape: 'PRÊT À VOUS ÉCHAPPER ? REJOIGNEZ-NOUS',
    access: 'VOUS AUREZ ACCÈS À',
    thoughts: 'DERNIÈRES RÉFLEXIONS',
    faq: 'Questions fréquentes',
    more: 'VOIR PLUS',
  },
  de: {
    login: 'anmelden',
    join: 'jetzt beitreten',
    learn: 'WAS DU LERNEN WIRST',
    reviews: 'BEWERTUNGEN UNSERER STUDIERENDEN',
    escape: 'BEREIT ZU ENTFLIEHEN? JETZT BEITRETEN',
    access: 'DU ERHÄLTST ZUGANG ZU',
    thoughts: 'ABSCHLIESSENDE GEDANKEN',
    faq: 'Häufig gestellte Fragen',
    more: 'MEHR ANZEIGEN',
  },
  it: {
    login: 'accedi',
    join: 'iscriviti ora',
    learn: 'COSA IMPARERAI',
    reviews: 'RECENSIONI DEI NOSTRI STUDENTI',
    escape: 'PRONTO A CAMBIARE VITA? ISCRIVITI ORA',
    access: 'AVRAI ACCESSO A',
    thoughts: 'CONSIDERAZIONI FINALI',
    faq: 'Domande frequenti',
    more: 'VEDI ALTRO',
  },
  pt: {
    login: 'entrar',
    join: 'junte-se agora',
    learn: 'O QUE VOCÊ VAI APRENDER',
    reviews: 'AVALIAÇÕES DOS NOSSOS ALUNOS',
    escape: 'PRONTO PARA MUDAR? JUNTE-SE AGORA',
    access: 'VOCÊ TERÁ ACESSO A',
    thoughts: 'CONSIDERAÇÕES FINAIS',
    faq: 'Perguntas frequentes',
    more: 'VER MAIS',
  },
};

const normalize = (value) => value.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();

function translatePage(language) {
  const dictionary = COPY[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-trw-original]').forEach((node) => {
    node.textContent = node.dataset.trwOriginal;
    delete node.dataset.trwOriginal;
  });
  if (!dictionary) return;

  const translations = new Map([
    ['login', dictionary.login],
    ['join now', dictionary.join],
    ['what you will learn', dictionary.learn],
    ["our students' reviews", dictionary.reviews],
    ['ready to escape? join now', dictionary.escape],
    ['you will get access to', dictionary.access],
    ['final thoughts', dictionary.thoughts],
    ['frequently asked questions', dictionary.faq],
    ['see more', dictionary.more],
  ]);

  const candidates = document.querySelectorAll('a, button, h2, h3, h4, .text-size-large, .text-size-medium');
  candidates.forEach((node) => {
    const key = normalize(node.textContent || '');
    const replacement = translations.get(key);
    if (replacement) {
      node.dataset.trwOriginal = node.textContent;
      node.textContent = replacement;
    }
  });
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('trw-language') || 'en');
  const current = useMemo(() => LANGUAGE_OPTIONS.find((item) => item.code === language) || LANGUAGE_OPTIONS[0], [language]);

  useEffect(() => {
    translatePage(language);
    localStorage.setItem('trw-language', language);
  }, [language]);

  useEffect(() => {
    const onOutside = (event) => {
      if (!event.target.closest('[data-trw-language]')) setOpen(false);
    };
    document.addEventListener('click', onOutside);
    return () => document.removeEventListener('click', onOutside);
  }, []);

  return (
    <div className="trw-language" data-trw-language>
      <button className="trw-language__trigger" type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)}>
        <Globe2 size={16} aria-hidden="true" />
        <span aria-hidden="true">{current.flag}</span>
        <span className="trw-language__name">{current.label}</span>
        <ChevronDown size={15} aria-hidden="true" className={open ? 'is-open' : ''} />
      </button>
      {open && (
        <div className="trw-language__menu" role="listbox" aria-label="Choose language">
          {LANGUAGE_OPTIONS.map((item) => (
            <button key={item.code} type="button" role="option" aria-selected={language === item.code} className="trw-language__option" onClick={() => { setLanguage(item.code); setOpen(false); }}>
              <span aria-hidden="true">{item.flag}</span><span>{item.label}</span>{language === item.code && <Check size={14} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PerformanceEnhancements() {
  useEffect(() => {
    document.querySelectorAll('img').forEach((image, index) => {
      if (!image.getAttribute('alt')) image.setAttribute('alt', 'The Real World FX');
      if (index > 5) image.setAttribute('loading', 'lazy');
      image.setAttribute('decoding', 'async');
    });
    document.querySelectorAll('iframe').forEach((frame) => {
      frame.setAttribute('loading', 'lazy');
      frame.setAttribute('title', frame.getAttribute('title') || 'The Real World FX video');
    });
    document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
  }, []);
  return null;
}

function App() {
  return <><LanguageSwitcher /><PerformanceEnhancements /></>;
}

const mount = document.getElementById('trw-react-enhancements');
if (mount) createRoot(mount).render(<App />);
