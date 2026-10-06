import { startTransition, useEffect, useRef, useState } from 'react';
import logoImage from '../logo3.jpg';

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getLocation = () => ({
  path: window.location.pathname || '/',
  search: new URLSearchParams(window.location.search),
});

const heroSlides = [
  {
    eyebrow: 'SOINS NATURELS · ÉDITION 01',
    kicker: 'Le rituel botanique essentiel',
    title: <>La puissance de l’<em>Aloe Vera</em></>,
    subtitle: 'Pour une peau naturellement belle.',
    description: 'Découvrez notre sélection de soins à l’aloe vera, formulés pour hydrater, apaiser et révéler l’éclat de votre peau.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=88&w=1200',
    alt: "Soin visage et feuilles d'aloe vera dans une ambiance naturelle",
  },
  {
    eyebrow: 'RITUEL DOUCEUR · ÉDITION 02',
    kicker: 'La beauté en version essentielle',
    title: <>Un éclat qui se <em>cultive</em></>,
    subtitle: 'Des gestes simples, des résultats visibles.',
    description: 'Des formules sensorielles et justes pour accompagner votre peau au quotidien, du premier geste au dernier rayon de lumière.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=88&w=1200',
    alt: 'Flacons de soins naturels disposés avec des feuilles vertes',
  },
  {
    eyebrow: 'BIEN-ÊTRE AU QUOTIDIEN · ÉDITION 03',
    kicker: 'Une pause pour soi',
    title: <>Ralentir, respirer, <em>rayonner</em></>,
    subtitle: 'Le soin comme un moment à soi.',
    description: 'Explorez des essentiels naturels qui invitent à ralentir, à écouter vos besoins et à retrouver votre équilibre.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=88&w=1200',
    alt: 'Femme dans une ambiance lumineuse de soin et de bien-être',
  },
];

const products = [
  {
    id: 'aloe-gel',
    name: 'Gel d’Aloe Vera Pur Bio',
    format: 'Visage & corps · 200 ml',
    price: '34,90',
    category: 'Visage',
    href: '/produit/aloe-gel',
    badge: 'BEST-SELLER',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=88&w=700',
    alt: "Gel d'aloe vera pur dans son flacon",
    reviews: '24',
  },
  {
    id: 'aloe-cream',
    name: 'Crème Hydratante Aloe Vera',
    format: 'Peaux normales · 50 ml',
    price: '32,90',
    category: 'Visage',
    href: '/produit/aloe-cream',
    badge: 'NOUVEAU',
    badgeClass: 'product-badge--soft',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=88&w=700',
    alt: 'Crème hydratante dans un pot beige',
    reviews: '18',
  },
  {
    id: 'repair-serum',
    name: 'Sérum Visage Réparateur',
    format: 'Éclat & confort · 30 ml',
    price: '45,90',
    category: 'Visage',
    href: '/produit/repair-serum',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=88&w=700',
    alt: 'Sérum visage réparateur dans un flacon en verre',
    reviews: '31',
  },
  {
    id: 'body-milk',
    name: 'Lait Corporel Aloe Vera',
    format: 'Nutrition légère · 400 ml',
    price: '36,90',
    category: 'Corps',
    href: '/produit/body-milk',
    badge: 'COUP DE CŒUR',
    badgeClass: 'product-badge--coral',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=88&w=700',
    alt: 'Lait corporel et feuilles vertes',
    reviews: '12',
  },
  {
    id: 'relaxing-oil',
    name: 'Huile Relaxante Botanique',
    format: 'Corps & bien-être · 100 ml',
    price: '39,90',
    category: 'Bien-être',
    href: '/produit/relaxing-oil',
    badge: 'RITUEL',
    badgeClass: 'product-badge--soft',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=88&w=700',
    alt: 'Huile botanique pour un rituel relaxant',
    reviews: '16',
  },
  {
    id: 'botanical-mist',
    name: 'Brume Botanique Apaisante',
    format: 'Maison & peau · 100 ml',
    price: '27,90',
    category: 'Bien-être',
    href: '/produit/botanical-mist',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=700',
    alt: 'Brume botanique dans une atmosphère de spa',
    reviews: '9',
  },
];

const categories = [
  {
    number: '01 · Le visage',
    href: '/categorie/visage',
    lines: ['Hydratez', 'Protégez', 'Rayonnez'],
    className: 'category-card--face',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=88&w=1000',
    alt: 'Soin visage et texture crème',
  },
  {
    number: '02 · Le corps',
    href: '/categorie/corps',
    lines: ['Nourrissez', 'Adoucissez', 'Sublimez'],
    className: 'category-card--body',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=88&w=1000',
    alt: 'Flacons de soins pour le corps',
  },
  {
    number: '03 · Le bien-être',
    href: '/categorie/bien-etre',
    lines: ['Détendez', 'Respirez', 'Équilibrez'],
    className: 'category-card--wellness',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=88&w=1000',
    alt: 'Huile essentielle et botanique bien-être',
  },
];

const articles = [
  {
    href: '/conseils/aloe-vera',
    category: 'INGRÉDIENTS',
    date: '12 JUIN 2026',
    duration: '6 MIN',
    title: 'Les bienfaits de l’aloe vera pour la peau',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=900',
    alt: 'Feuilles vertes et lumière douce',
  },
  {
    href: '/conseils/hydratation',
    category: 'RITUELS',
    date: '05 JUIN 2026',
    duration: '4 MIN',
    title: 'Comment bien hydrater sa peau ?',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=88&w=900',
    alt: 'Femme appliquant une crème sur sa peau',
  },
  {
    href: '/conseils/ingredients-naturels',
    category: 'BIEN-ÊTRE',
    date: '28 MAI 2026',
    duration: '5 MIN',
    title: 'Les ingrédients naturels à privilégier',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=88&w=900',
    alt: 'Plantes et ingrédients naturels',
  },
];

const testimonials = [
  {
    quote: '“La Casa est devenue mon petit rituel de confiance. Des produits simples, sensoriels et une équipe toujours de bon conseil.”',
    name: 'Sarah M.',
    city: 'Tunis',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=85&w=180',
    alt: 'Portrait de Sarah',
  },
  {
    quote: '“Une très belle découverte. La livraison est rapide, les conseils sont précieux et ma peau n’a jamais été aussi confortable.”',
    name: 'Nour B.',
    city: 'Sousse',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=85&w=180',
    alt: 'Portrait de Nour',
  },
  {
    quote: '“J’adore l’univers de la casa : naturel, doux et jamais compliqué. Le gel d’aloe vera ne me quitte plus.”',
    name: 'Amel R.',
    city: 'La Marsa',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=85&w=180',
    alt: 'Portrait de Amel',
  },
];

const navMenus = [
  {
    label: 'Nos produits',
    href: '/produits',
    eyebrow: 'L’essentiel de la casa',
    title: 'Des soins pour chaque rituel',
    groups: [
      { title: 'Visage', links: [{ label: 'Nettoyants', href: '/categorie/visage' }, { label: 'Sérums', href: '/categorie/visage' }, { label: 'Hydratants', href: '/categorie/visage' }] },
      { title: 'Corps', links: [{ label: 'Laits & huiles', href: '/categorie/corps' }, { label: 'Gommages', href: '/categorie/corps' }, { label: 'Mains & pieds', href: '/categorie/corps' }] },
      { title: 'Bien-être', links: [{ label: 'Aromathérapie', href: '/categorie/bien-etre' }, { label: 'Compléments', href: '/categorie/bien-etre' }, { label: 'Accessoires', href: '/categorie/bien-etre' }] },
    ],
  },
  {
    label: 'Marques',
    href: '/marques',
    eyebrow: 'Nos maisons de confiance',
    title: 'La beauté, bien choisie',
    groups: [
      { title: 'Sélections', links: [{ label: 'Aloe botanique', href: '/produits' }, { label: 'Clean beauty', href: '/produits' }, { label: 'Nouveautés', href: '/nouveautes' }] },
      { title: 'Marques', links: [{ label: 'Avène', href: '/marques' }, { label: 'La Roche-Posay', href: '/marques' }, { label: 'SVR', href: '/marques' }] },
      { title: 'À découvrir', links: [{ label: 'Coups de cœur', href: '/produits' }, { label: 'Best-sellers', href: '/produits' }, { label: 'Promotions', href: '/promotions' }] },
    ],
  },
  {
    label: 'Conseils beauté',
    href: '/conseils',
    eyebrow: 'Le journal de la casa',
    title: 'Prendre soin, simplement',
    groups: [
      { title: 'Rituels', links: [{ label: 'Peau hydratée', href: '/conseils/hydratation' }, { label: 'Éclat naturel', href: '/conseils/ingredients-naturels' }, { label: 'Peau sensible', href: '/conseils/hydratation' }] },
      { title: 'Ingrédients', links: [{ label: 'Aloe vera', href: '/conseils/aloe-vera' }, { label: 'Actifs naturels', href: '/conseils/ingredients-naturels' }, { label: 'Nos guides', href: '/conseils' }] },
      { title: 'Bien-être', links: [{ label: 'Respirer', href: '/conseils' }, { label: 'Ralentir', href: '/conseils' }, { label: 'Équilibrer', href: '/conseils' }] },
    ],
  },
  {
    label: 'À propos',
    href: '/a-propos',
    eyebrow: 'La maison la casa',
    title: 'Une attention qui compte',
    groups: [
      { title: 'La casa', links: [{ label: 'Notre histoire', href: '/a-propos' }, { label: 'Nos engagements', href: '/a-propos' }, { label: 'Nos conseils', href: '/conseils' }] },
      { title: 'Votre expérience', links: [{ label: 'Livraison & retours', href: '/livraison' }, { label: 'FAQ', href: '/faq' }, { label: 'Nous contacter', href: '/contact' }] },
    ],
  },
];

function Icon({ name }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.35',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'search') {
    return <svg {...props}><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 5 5" /></svg>;
  }

  if (name === 'account') {
    return <svg {...props}><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20c.7-3.4 3.1-5.2 7.2-5.2s6.5 1.8 7.2 5.2" /></svg>;
  }

  return <svg {...props}><path d="M3.5 5.5h2.2l1.8 9.1h9.7l2.1-6.5H6.5" /><circle cx="9.1" cy="19.2" r="1.2" /><circle cx="17.2" cy="19.2" r="1.2" /></svg>;
}

function RouteLink({ to, children, ...props }) {
  return <a href={to} data-route={to} {...props}>{children}</a>;
}

function ReassuranceIcon({ type }) {
  const props = {
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (type === 'natural') {
    return <svg {...props}><path d="M16 26C9.5 21.9 5.7 17.4 5.7 12.1A4.8 4.8 0 0 1 15 10a4.8 4.8 0 0 1 9.3 2.1C24.3 17.4 20.5 21.9 16 26Z" /><path d="M16 7.5V3.8M12.8 6l-2.5-2.4M19.2 6l2.5-2.4" /></svg>;
  }

  if (type === 'trust') {
    return <svg {...props}><path d="m16 4 3.2 2.2 3.8.2 1.2 3.6 2.7 2.6-1.4 3.5.4 3.8-3.5 1.5-2.4 3-3.7-.6-3.7.6-2.4-3-3.5-1.5.4-3.8-1.4-3.5 2.7-2.6L8 6.4l3.8-.2L16 4Z" /><path d="m11.6 15.8 2.7 2.7 5.9-6" /></svg>;
  }

  if (type === 'delivery') {
    return <svg {...props}><path d="M4 8.5h16.5v14H4zM20.5 13h4l3.5 3.7v5.8h-7.5z" /><circle cx="9.2" cy="23.4" r="2.2" /><circle cx="24.6" cy="23.4" r="2.2" /><path d="M24.5 16.7H21v-3.6" /></svg>;
  }

  return <svg {...props}><path d="M16 26.1C9.4 22.2 5.8 18.1 5.8 13.3a4.8 4.8 0 0 1 9.4-1.4 4.8 4.8 0 0 1 9.4 1.4c0 4.8-3.6 8.9-8.6 12.8Z" /></svg>;
}

function Brand() {
  return (
    <RouteLink className="brand" to="/" aria-label="Ons Bien-être Parapharmacie, accueil">
      <span className="brand-logo"><img src={logoImage} alt="Ons Bien-être Parapharmacie" /></span>
    </RouteLink>
  );
}

function App() {
  const [siteLocation, setSiteLocation] = useState(getLocation);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroChanging, setHeroChanging] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialChanging, setTestimonialChanging] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(() => new Set());
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const productTrackRef = useRef(null);
  const heroTransitionRef = useRef(null);
  const testimonialTransitionRef = useRef(null);
  const toastTimerRef = useRef(null);
  const touchStartX = useRef(null);

  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + Number.parseFloat(item.product.price.replace(',', '.')) * item.quantity, 0);

  useEffect(() => {
    document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
      link.href = logoImage;
      link.type = 'image/jpeg';
    });
  }, []);

  const navigate = (to) => {
    const target = new URL(to, window.location.origin);
    if (target.origin !== window.location.origin) {
      window.location.assign(to);
      return;
    }
    window.history.pushState({}, '', `${target.pathname}${target.search}${target.hash}`);
    setSiteLocation({ path: target.pathname || '/', search: new URLSearchParams(target.search) });
    setMenuOpen(false);
    setMobileSubmenu(null);
    window.requestAnimationFrame(() => {
      if (target.hash) document.querySelector(target.hash)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  };

  useEffect(() => {
    const handlePopState = () => setSiteLocation(getLocation());
    const handleRouteClick = (event) => {
      const anchor = event.target.closest('a[data-route]');
      if (!anchor || anchor.target === '_blank' || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(anchor.getAttribute('href'));
    };
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleRouteClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleRouteClick);
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      setHeaderCompact(window.scrollY > 35);
    };
    let frame = null;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateScrollState();
        frame = null;
      });
    };
    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    window.clearTimeout(heroTransitionRef.current);
    window.clearTimeout(testimonialTransitionRef.current);
    window.clearTimeout(toastTimerRef.current);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || heroPaused) return undefined;
    const interval = window.setInterval(() => {
      changeHeroSlide(heroIndex + 1);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [heroIndex, heroPaused]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(''), 3200);
  };

  const changeHeroSlide = (nextIndex) => {
    const normalizedIndex = (nextIndex + heroSlides.length) % heroSlides.length;
    if (normalizedIndex === heroIndex) return;
    window.clearTimeout(heroTransitionRef.current);
    setHeroChanging(true);
    heroTransitionRef.current = window.setTimeout(() => {
      startTransition(() => setHeroIndex(normalizedIndex));
      setHeroChanging(false);
    }, prefersReducedMotion ? 0 : 180);
  };

  const changeTestimonial = (direction) => {
    const nextIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
    window.clearTimeout(testimonialTransitionRef.current);
    setTestimonialChanging(true);
    testimonialTransitionRef.current = window.setTimeout(() => {
      startTransition(() => setTestimonialIndex(nextIndex));
      setTestimonialChanging(false);
    }, prefersReducedMotion ? 0 : 180);
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.product.id === product.id);
      if (existingItem) return currentCart.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...currentCart, { product, quantity: 1 }];
    });
    setAddedProductId(product.id);
    showToast(`${product.name} a rejoint votre panier.`);
    window.setTimeout(() => setAddedProductId(null), 1400);
  };

  const toggleFavorite = (product) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      const isLiked = nextFavorites.has(product.id);
      if (isLiked) nextFavorites.delete(product.id);
      else nextFavorites.add(product.id);
      showToast(isLiked ? 'Retiré de vos favoris.' : 'Ajouté à vos favoris.');
      return nextFavorites;
    });
  };

  const scrollProducts = (distance) => {
    productTrackRef.current?.scrollBy({ left: distance, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((currentCart) => currentCart.flatMap((item) => item.product.id === productId ? (quantity > 0 ? [{ ...item, quantity }] : []) : [item]));
  };

  const activeHero = heroSlides[heroIndex];
  const activeTestimonial = testimonials[testimonialIndex];
  const isHome = siteLocation.path === '/';

  return (
    <>
      <div className="page-background" aria-hidden="true">
        <div className="aloe-image aloe-image--left aloe-image--one" />
        <div className="aloe-image aloe-image--left aloe-image--two" />
        <div className="aloe-image aloe-image--right aloe-image--three" />
        <div className="aloe-image aloe-image--right aloe-image--four" />
        <span className="background-orb background-orb--one" />
        <span className="background-orb background-orb--two" />
      </div>

      <div className="announcement-bar">
        <p><span className="announcement-dot" /> Livraison offerte dès 150 TND · Partout en Tunisie</p>
        <RouteLink to="/conseils">Le journal de la casa <span aria-hidden="true">↗</span></RouteLink>
      </div>

      <header className={`site-header${headerCompact ? ' is-compact' : ''}`} id="top">
        <div className="nav-inner">
          <Brand />
          <nav className="main-nav" aria-label="Navigation principale">
            <RouteLink className={`nav-link${siteLocation.path === '/' ? ' is-active' : ''}`} to="/">Accueil</RouteLink>
            {navMenus.map((menu) => (
              <div className="nav-dropdown-wrap" key={menu.label}>
                <RouteLink className={`nav-link nav-link--dropdown${siteLocation.path.startsWith(menu.href) ? ' is-active' : ''}`} to={menu.href} aria-haspopup="true">
                  {menu.label}<span className="nav-chevron" aria-hidden="true">⌄</span>
                </RouteLink>
                <div className="nav-dropdown" role="menu">
                  <div className="dropdown-intro"><span>{menu.eyebrow}</span><strong>{menu.title}</strong><RouteLink to={menu.href}>Tout découvrir <b>↗</b></RouteLink></div>
                  <div className="dropdown-groups">{menu.groups.map((group) => <div className="dropdown-group" key={group.title}><h3>{group.title}</h3>{group.links.map((link) => <RouteLink to={link.href} role="menuitem" key={link.label}>{link.label}<span aria-hidden="true">↗</span></RouteLink>)}</div>)}</div>
                </div>
              </div>
            ))}
          </nav>
          <div className="nav-actions">
            <form className="search-form" role="search" onSubmit={(event) => { event.preventDefault(); const query = searchQuery.trim(); if (query) navigate(`/recherche?q=${encodeURIComponent(query)}`); else showToast('Saisissez un soin à rechercher.'); }}>
              <label className="sr-only" htmlFor="search-input">Rechercher un produit</label>
              <input id="search-input" type="search" placeholder="Rechercher" autoComplete="off" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
              <button type="submit" aria-label="Lancer la recherche"><Icon name="search" /></button>
            </form>
            <button className="icon-button account-button" type="button" aria-label="Mon compte" onClick={() => navigate('/compte')}><Icon name="account" /></button>
            <button className="icon-button cart-button" type="button" aria-label={`Panier, ${cartItems} article${cartItems > 1 ? 's' : ''}`} onClick={() => navigate('/panier')}><Icon name="cart" /><span className="cart-count">{cartItems}</span></button>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /><span /></button>
          </div>
        </div>
        <nav className={`mobile-nav${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
          <RouteLink to="/" onClick={() => setMenuOpen(false)}>Accueil</RouteLink>
          {navMenus.map((menu) => {
            const isOpen = mobileSubmenu === menu.label;
            return <div className="mobile-nav-group" key={menu.label}><button className="mobile-nav-trigger" type="button" aria-expanded={isOpen} onClick={() => setMobileSubmenu(isOpen ? null : menu.label)}><span>{menu.label}</span><b aria-hidden="true">+</b></button><div className={`mobile-submenu${isOpen ? ' is-open' : ''}`}><RouteLink to={menu.href} onClick={() => setMenuOpen(false)}>Tout découvrir</RouteLink>{menu.groups.flatMap((group) => group.links).map((link) => <RouteLink to={link.href} onClick={() => setMenuOpen(false)} key={`${menu.label}-${link.label}`}>{link.label}</RouteLink>)}</div></div>;
          })}
        </nav>
      </header>

      {isHome ? (
      <main>
        <section className="hero section" id="accueil">
          <div className="hero-grid">
            <div className="hero-copy reveal is-visible">
              <div className="eyebrow"><span /><span>{activeHero.eyebrow}</span></div>
              <div className={`hero-copy-content${heroChanging ? ' is-changing' : ''}`}>
                <p className="hero-kicker">{activeHero.kicker}</p>
                <h1 className="hero-title">{activeHero.title}</h1>
                <p className="hero-subtitle">{activeHero.subtitle}</p>
                <p className="hero-description">{activeHero.description}</p>
                <div className="hero-cta-row"><RouteLink className="button button--dark" to="/produits">Découvrir la gamme <span>→</span></RouteLink><RouteLink className="text-link" to="/produits">Explorer les soins <span aria-hidden="true">↗</span></RouteLink></div>
              </div>
              <div className="hero-footnote"><span className="mini-leaf" aria-hidden="true">✳</span><span><strong>98%</strong> d’ingrédients d’origine naturelle</span></div>
            </div>
            <div className={`hero-visual reveal is-visible${heroChanging ? ' is-changing' : ''}`} onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) >= 45) changeHeroSlide(heroIndex + (distance < 0 ? 1 : -1)); }}>
              <div className="hero-visual-backdrop" />
              <div className="hero-image-frame"><img className="hero-image" src={activeHero.image} alt={activeHero.alt} /></div>
              <div className="hero-stamp" aria-hidden="true"><span>LA CASA</span><strong>BOTANIQUE</strong><span>since 2026</span></div>
              <div className="hero-note"><span className="hero-note-icon" aria-hidden="true">✦</span><span><strong>Le geste juste</strong><small>Hydratation · douceur · éclat</small></span></div>
              <div className="hero-visual-meta"><div className="hero-counter"><strong className="hero-current">{String(heroIndex + 1).padStart(2, '0')}</strong><span>/</span><span>03</span></div><div className="hero-controls"><button className="round-button hero-prev" type="button" aria-label="Slide précédent" onClick={() => changeHeroSlide(heroIndex - 1)}>←</button><button className="round-button hero-next" type="button" aria-label="Slide suivant" onClick={() => changeHeroSlide(heroIndex + 1)}>→</button></div></div>
            </div>
          </div>
          <div className="hero-dots" aria-label="Choisir une présentation">{heroSlides.map((slide, index) => <button key={slide.eyebrow} type="button" className={`hero-dot${heroIndex === index ? ' is-active' : ''}`} aria-label={`Présentation ${index + 1}`} aria-current={heroIndex === index ? 'true' : undefined} onClick={() => changeHeroSlide(index)} />)}</div>
        </section>

        <section className="reassurance section" aria-label="Nos engagements">
          <div className="reassurance-grid">
            {[['natural', 'Produits naturels', 'Des soins sélectionnés avec soin'], ['trust', 'Marques de confiance', 'Des produits de qualité'], ['delivery', 'Livraison rapide', 'Partout en Tunisie'], ['care', 'Service client', 'À votre écoute']].map(([icon, title, description]) => <div className="reassurance-item reveal" key={title}><span className="line-icon"><ReassuranceIcon type={icon} /></span><span><strong>{title}</strong><small>{description}</small></span></div>)}
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading reveal"><div><p className="section-kicker">Votre rituel, à votre rythme</p><h2>Nos <em>catégories</em></h2></div><RouteLink className="text-link" to="/produits">Voir tout l’univers <span aria-hidden="true">↗</span></RouteLink></div>
          <div className="category-grid">{categories.map((category) => <RouteLink className={`category-card ${category.className} reveal`} to={category.href} key={category.number}><img src={category.image} alt={category.alt} loading="lazy" /><div className="category-shade" /><div className="category-content"><span>{category.number}</span><h3>{category.lines.map((line) => <span key={line}>{line}<br /></span>)}</h3><strong className="category-arrow">↗</strong></div></RouteLink>)}</div>
        </section>

        <section className="section best-sellers-section" id="best-sellers">
          <div className="section-heading reveal"><div><p className="section-kicker">Les essentiels de la casa</p><h2>Nos <em>best-sellers</em></h2></div><div className="rail-controls"><button className="round-button product-prev" type="button" aria-label="Produits précédents" onClick={() => scrollProducts(-310)}>←</button><button className="round-button product-next" type="button" aria-label="Produits suivants" onClick={() => scrollProducts(310)}>→</button></div></div>
          <div className="product-track" ref={productTrackRef} tabIndex="0" aria-label="Liste des best-sellers">{products.slice(0, 4).map((product) => { const isLiked = favorites.has(product.id); const isAdded = addedProductId === product.id; return <article className="product-card reveal" key={product.id}><div className="product-media">{product.badge && <span className={`product-badge ${product.badgeClass || ''}`}>{product.badge}</span>}<button className={`wishlist-button${isLiked ? ' is-liked' : ''}`} type="button" aria-label={`Ajouter ${product.name} aux favoris`} aria-pressed={isLiked} onClick={() => toggleFavorite(product)}>{isLiked ? '♥' : '♡'}</button><img src={product.image} alt={product.alt} loading="lazy" /></div><div className="product-info"><div className="stars" aria-label="5 étoiles">★★★★★ <span>({product.reviews})</span></div><RouteLink className="product-name-link" to={product.href}><h3>{product.name}</h3></RouteLink><p>{product.format}</p><div className="product-bottom"><strong>{product.price} <small>TND</small></strong><button className={`add-to-cart${isAdded ? ' is-added' : ''}`} type="button" aria-label={`Ajouter ${product.name} au panier`} onClick={() => addToCart(product)}><span>{isAdded ? '✓' : '+'}</span></button></div></div></article>; })}</div>
        </section>

        <section className="section promo-section reveal" id="promotions">
          <div className="promo-copy"><p className="section-kicker section-kicker--light">Le moment douceur</p><h2>Jusqu’à <em>-30%</em></h2><p className="promo-lead">Sur une sélection de soins</p><p className="promo-description">Prenez soin de vous naturellement, avec des formules choisies pour accompagner chaque moment de votre journée.</p><RouteLink className="button button--light" to="/promotions">Découvrir la sélection <span>→</span></RouteLink></div>
          <div className="promo-art" aria-hidden="true"><div className="promo-circle">-30<span>%</span></div><div className="promo-arch" /><img className="promo-leaf" src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=88&w=700" alt="" loading="lazy" /><div className="promo-bottle promo-bottle--one"><span>la<br /><b>casa</b></span></div><div className="promo-bottle promo-bottle--two"><span>aloe<br /><b>ritual</b></span></div></div>
        </section>

        <section className="section testimonial-section" id="a-propos">
          <div className="testimonial-intro reveal"><p className="section-kicker">Une beauté qui se partage</p><h2>Ils nous font<br /><em>confiance</em></h2><div className="testimonial-controls"><button className="round-button testimonial-prev" type="button" aria-label="Témoignage précédent" onClick={() => changeTestimonial(-1)}>←</button><button className="round-button testimonial-next" type="button" aria-label="Témoignage suivant" onClick={() => changeTestimonial(1)}>→</button></div></div>
          <div className="testimonial-card reveal"><span className="quote-mark" aria-hidden="true">“</span><div className="testimonial-avatar"><img className="testimonial-image" src={activeTestimonial.image} alt={activeTestimonial.alt} style={{ opacity: testimonialChanging ? 0.2 : 1 }} /></div><div className="testimonial-stars" aria-label="5 étoiles">★★★★★</div><blockquote className="testimonial-quote" style={{ opacity: testimonialChanging ? 0.2 : 1 }}>{activeTestimonial.quote}</blockquote><p className="testimonial-name">{activeTestimonial.name} <span>· {activeTestimonial.city}</span></p><div className="testimonial-dots">{testimonials.map((testimonial, index) => <span className={testimonialIndex === index ? 'is-active' : ''} key={testimonial.name} />)}</div></div>
        </section>

        <section className="section editorial-section" id="conseils">
          <div className="section-heading reveal"><div><p className="section-kicker">Le journal de la casa</p><h2>Nos <em>conseils beauté</em></h2></div><RouteLink className="text-link" to="/conseils">Tous les articles <span aria-hidden="true">↗</span></RouteLink></div>
          <div className="editorial-grid">{articles.map((article) => <RouteLink to={article.href} className="article-card reveal" key={article.title}><div className="article-image"><img src={article.image} alt={article.alt} loading="lazy" /><span>{article.category}</span></div><div className="article-meta"><span>{article.date}</span><span>{article.duration}</span></div><h3>{article.title}</h3><span className="article-link">Lire l’article <b>↗</b></span></RouteLink>)}</div>
        </section>

        <section className="newsletter-band section reveal"><div><p className="section-kicker">Une attention pour vous</p><h2>Le beau côté<br /><em>de la boîte mail.</em></h2></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); const email = new FormData(event.currentTarget).get('email'); setNewsletterStatus(`Merci, ${email} est bien inscrit(e).`); event.currentTarget.reset(); }}><label className="sr-only" htmlFor="newsletter-email">Votre adresse e-mail</label><div className="newsletter-input"><input id="newsletter-email" name="email" type="email" placeholder="Votre adresse e-mail" required /><button type="submit" aria-label="S'inscrire à la newsletter">→</button></div><p className="newsletter-status" role="status">{newsletterStatus}</p><small>En vous inscrivant, vous acceptez notre politique de confidentialité.</small></form></section>
      </main>
      ) : (
        <RoutePage location={siteLocation} products={products} cart={cart} cartTotal={cartTotal} favorites={favorites} addedProductId={addedProductId} onAddToCart={addToCart} onToggleFavorite={toggleFavorite} onUpdateCartQuantity={updateCartQuantity} onNavigate={navigate} />
      )}

      <footer className="site-footer">
        <div className="footer-inner"><div className="footer-brand-column"><div className="footer-brand-lockup"><div className="footer-logo-frame"><img src={logoImage} alt="Logo Ons Bien-être Parapharmacie" /></div></div><p>Votre bien-être naturel,<br /><em>notre priorité.</em></p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">p</a></div></div><div className="footer-links-column"><h3>Nos produits</h3><RouteLink to="/categorie/visage">Visage</RouteLink><RouteLink to="/categorie/corps">Corps</RouteLink><RouteLink to="/categorie/bien-etre">Bien-être</RouteLink><RouteLink to="/nouveautes">Nouveautés</RouteLink><RouteLink to="/promotions">Promotions</RouteLink></div><div className="footer-links-column"><h3>Aide &amp; informations</h3><RouteLink to="/livraison">Livraison &amp; retours</RouteLink><RouteLink to="/faq">FAQ</RouteLink><RouteLink to="/contact">Nous contacter</RouteLink><RouteLink to="/cgv">CGV</RouteLink><RouteLink to="/confidentialite">Politique de confidentialité</RouteLink></div><div className="footer-newsletter"><p className="footer-kicker">Restons en contact</p><h3>Inscrivez-vous à<br />notre newsletter</h3><p>Recevez nos offres exclusives et nos conseils beauté.</p><RouteLink to="/newsletter" className="footer-mail-link">Votre adresse e-mail <span>→</span></RouteLink></div></div>
        <div className="footer-bottom"><span>© 2026 Ons Bien-être. Tous droits réservés.</span><span>Conçu avec soin à Tunis <i aria-hidden="true">✦</i></span></div>
      </footer>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

const brandData = [
  { name: 'Avène', description: 'Des soins experts et apaisants pour les peaux sensibles.', accent: 'EAU THERMALE' },
  { name: 'La Roche-Posay', description: 'Des formules dermatologiques pensées pour le quotidien.', accent: 'DERMATOLOGIE' },
  { name: 'SVR', description: 'Des actifs précis pour une peau confortable et lumineuse.', accent: 'ACTIFS CIBLÉS' },
  { name: 'Aloe botanique', description: 'La sélection signature de la casa, douce et sensorielle.', accent: 'SÉLECTION LA CASA' },
];

const faqData = [
  { question: 'Quels sont les délais de livraison ?', answer: 'Les commandes sont préparées sous 24 heures ouvrées. La livraison prend ensuite 1 à 3 jours ouvrés dans le Grand Tunis et 2 à 5 jours dans les autres gouvernorats.' },
  { question: 'Comment suivre ma commande ?', answer: 'Dès l’expédition, un message de confirmation vous est envoyé avec les informations de suivi et le contact du transporteur.' },
  { question: 'Puis-je retourner un produit ?', answer: 'Oui, un produit non ouvert et conservé dans son emballage d’origine peut être retourné dans les 14 jours suivant sa réception. Contactez-nous avant tout retour.' },
  { question: 'Comment choisir un soin adapté ?', answer: 'Chaque fiche produit précise la texture, le type de peau et le geste conseillé. Notre équipe peut aussi vous guider par téléphone ou via la page contact.' },
  { question: 'Les produits sont-ils authentiques ?', answer: 'Nous sélectionnons nos références auprès de distributeurs et de marques partenaires. Chaque produit est neuf, scellé lorsque la marque le prévoit et accompagné de sa traçabilité.' },
];

const articleContent = {
  'aloe-vera': {
    category: 'INGRÉDIENTS',
    title: 'Les bienfaits de l’aloe vera pour la peau',
    intro: 'Un actif frais, apaisant et polyvalent qui trouve naturellement sa place dans les rituels simples.',
    paragraphs: [
      'L’aloe vera est apprécié depuis longtemps pour sa sensation fraîche et son affinité avec les peaux qui recherchent confort et hydratation. Sa texture légère permet de l’intégrer facilement à une routine du matin comme à un geste réparateur le soir.',
      'Pour profiter pleinement de ce type de soin, appliquez une petite quantité sur une peau propre et légèrement humide. La peau retient mieux cette sensation de confort lorsque le geste est suivi d’une crème adaptée.',
      'Comme pour tout nouveau produit, testez la formule sur une petite zone et observez la réaction de votre peau. Le bon rituel est celui qui reste agréable, régulier et adapté à vos besoins.',
    ],
    image: articles[0].image,
  },
  hydratation: {
    category: 'RITUELS',
    title: 'Comment bien hydrater sa peau ?',
    intro: 'La régularité compte davantage que la quantité : trois gestes simples pour installer un rituel confortable.',
    paragraphs: [
      'Commencez par un nettoyage doux, sans multiplier les produits. Une peau propre mais non desséchée est une meilleure base pour recevoir les soins suivants.',
      'Appliquez ensuite un sérum ou un gel léger sur peau encore un peu humide, puis scellez le confort avec une crème. Le matin, pensez à ajouter une protection solaire lorsque votre exposition le nécessite.',
      'Enfin, observez votre peau au fil des jours. Tiraillements, zones brillantes ou inconfort sont des signaux utiles pour ajuster la texture et la fréquence de vos soins.',
    ],
    image: articles[1].image,
  },
  'ingredients-naturels': {
    category: 'BIEN-ÊTRE',
    title: 'Les ingrédients naturels à privilégier',
    intro: 'Mieux comprendre les actifs pour choisir des formules naturelles avec discernement.',
    paragraphs: [
      'Un ingrédient naturel n’est pas automatiquement adapté à toutes les peaux. La concentration, la formule complète et la façon dont le produit est utilisé sont tout aussi importantes.',
      'L’aloe vera apporte une sensation d’hydratation légère, l’huile d’amande douce nourrit les zones sèches et l’avoine est souvent recherchée pour son toucher réconfortant. Ces actifs s’intègrent à des routines très différentes.',
      'Privilégiez une liste d’ingrédients lisible, une texture que vous aimez utiliser et une routine courte. C’est cette combinaison qui rend les bons gestes faciles à maintenir.',
    ],
    image: articles[2].image,
  },
};

function InnerPage({ eyebrow, title, description, children }) {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <div className="section inner-hero-inner">
          <div className="breadcrumbs"><RouteLink to="/">Accueil</RouteLink><span>/</span><span>{title}</span></div>
          <p className="inner-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {description && <p className="inner-description">{description}</p>}
        </div>
      </section>
      <div className="section inner-content">{children}</div>
    </main>
  );
}

function ProductGrid({ items, favorites, addedProductId, onAddToCart, onToggleFavorite }) {
  if (!items.length) {
    return <div className="empty-state"><span className="empty-state-mark">✳</span><h2>Cette sélection est en préparation</h2><p>Retrouvez nos autres soins pendant que nous enrichissons cette collection.</p><RouteLink className="button button--dark" to="/produits">Voir tous les produits <span>→</span></RouteLink></div>;
  }

  return (
    <div className="catalog-grid">
      {items.map((product) => {
        const isLiked = favorites.has(product.id);
        const isAdded = addedProductId === product.id;
        return (
          <article className="product-card catalog-card" key={product.id}>
            <div className="product-media">
              {product.badge && <span className={`product-badge ${product.badgeClass || ''}`}>{product.badge}</span>}
              <button className={`wishlist-button${isLiked ? ' is-liked' : ''}`} type="button" aria-label={`Ajouter ${product.name} aux favoris`} aria-pressed={isLiked} onClick={() => onToggleFavorite(product)}>{isLiked ? '♥' : '♡'}</button>
              <RouteLink className="catalog-image-link" to={product.href}><img src={product.image} alt={product.alt} loading="lazy" /></RouteLink>
            </div>
            <div className="product-info">
              <div className="stars" aria-label="5 étoiles">★★★★★ <span>({product.reviews})</span></div>
              <RouteLink className="product-name-link" to={product.href}><h3>{product.name}</h3></RouteLink>
              <p>{product.format}</p>
              <div className="product-bottom"><strong>{product.originalPrice && <del>{product.originalPrice}</del>}{product.price} <small>TND</small></strong><button className={`add-to-cart${isAdded ? ' is-added' : ''}`} type="button" aria-label={`Ajouter ${product.name} au panier`} onClick={() => onAddToCart(product)}><span>{isAdded ? '✓' : '+'}</span></button></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CatalogPage({ path, products, favorites, addedProductId, onAddToCart, onToggleFavorite }) {
  const categorySlug = path.startsWith('/categorie/') ? path.split('/').pop() : null;
  const categoryNames = { visage: 'Visage', corps: 'Corps', 'bien-etre': 'Bien-être' };
  const categoryName = categorySlug ? categoryNames[categorySlug] : null;
  const isPromotions = path === '/promotions';
  const isNew = path === '/nouveautes';
  let items = products;
  let title = 'Nos produits';
  let eyebrow = 'L’univers de la casa';
  let description = 'Des soins essentiels, choisis pour accompagner votre peau et votre bien-être avec simplicité.';

  if (categoryName) {
    items = products.filter((product) => product.category === categoryName);
    title = categoryName;
    eyebrow = `Rituel ${categoryName.toLowerCase()}`;
    description = categoryName === 'Visage' ? 'Nettoyer, hydrater, révéler : les essentiels pour construire un rituel visage qui vous ressemble.' : categoryName === 'Corps' ? 'Des textures enveloppantes pour nourrir, adoucir et prendre soin de chaque zone.' : 'Des gestes sensoriels pour ralentir, respirer et créer une parenthèse dans la journée.';
  }

  if (isPromotions) {
    items = products.slice(0, 4).map((product, index) => ({ ...product, price: ['29,90', '27,90', '38,90', '29,90'][index], originalPrice: product.price, badge: '-30%', badgeClass: 'product-badge--coral' }));
    title = 'Promotions';
    eyebrow = 'Le moment douceur';
    description = 'Une sélection de soins à prix doux, disponible dans la limite des stocks de la saison.';
  }

  if (isNew) {
    items = products.filter((product) => product.badge === 'NOUVEAU' || product.badge === 'RITUEL');
    title = 'Nouveautés';
    eyebrow = 'Les derniers arrivés';
    description = 'Les nouvelles attentions de la casa, choisies pour compléter vos rituels naturellement.';
  }

  return <InnerPage eyebrow={eyebrow} title={title} description={description}><div className="catalog-toolbar"><span>{items.length} soins sélectionnés</span><RouteLink className="text-link" to="/conseils">Besoin d’un conseil ? <span aria-hidden="true">↗</span></RouteLink></div><ProductGrid items={items} favorites={favorites} addedProductId={addedProductId} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} /></InnerPage>;
}

function ProductPage({ slug, products, favorites, addedProductId, onAddToCart, onToggleFavorite }) {
  const product = products.find((item) => item.id === slug);
  if (!product) return <NotFoundPage />;
  const copy = {
    'aloe-gel': { intro: 'Un gel frais et polyvalent pour apporter une sensation immédiate de confort au visage et au corps.', benefits: ['Hydrate sans alourdir', 'Apaise après le nettoyage', 'S’utilise seul ou sous une crème'], ingredients: 'Aloe barbadensis leaf juice, glycérine végétale, vitamine E.' },
    'aloe-cream': { intro: 'Une crème souple qui enveloppe la peau d’un confort quotidien, sans fini lourd.', benefits: ['Confort longue durée', 'Texture fondante', 'Idéale dans une routine quotidienne'], ingredients: 'Aloe vera, beurre de karité, huile de jojoba.' },
    'repair-serum': { intro: 'Un sérum léger à glisser dans le rituel du soir pour retrouver une peau souple et lumineuse.', benefits: ['Ravive l’éclat', 'Soutient la barrière cutanée', 'Pénètre rapidement'], ingredients: 'Aloe vera, acide hyaluronique, extrait de calendula.' },
    'body-milk': { intro: 'Un lait fluide qui nourrit la peau du corps et laisse une sensation douce, confortable et fraîche.', benefits: ['Nourrit sans effet collant', 'Adoucit les zones sèches', 'Parfum discret et naturel'], ingredients: 'Aloe vera, huile d’amande douce, vitamine E.' },
    'relaxing-oil': { intro: 'Une huile botanique à masser lentement pour transformer la fin de journée en moment de détente.', benefits: ['Glisse idéale pour le massage', 'Texture sèche', 'Rituel corps et respiration'], ingredients: 'Huiles de noyau d’abricot, jojoba et lavande.' },
    'botanical-mist': { intro: 'Une brume légère à vaporiser pour rafraîchir la peau et la maison à tout moment.', benefits: ['Sensation fraîche instantanée', 'Format nomade', 'Parfum végétal délicat'], ingredients: 'Hydrolat de fleur d’oranger, aloe vera, eau florale.' },
  }[product.id];
  const isLiked = favorites.has(product.id);
  const isAdded = addedProductId === product.id;
  return <InnerPage eyebrow={`${product.category} · ${product.format}`} title={product.name} description={copy.intro}><div className="product-detail"><div className="product-detail-media"><img src={product.image} alt={product.alt} /></div><div className="product-detail-copy"><div className="stars" aria-label="5 étoiles">★★★★★ <span>({product.reviews} avis)</span></div><p className="product-detail-price">{product.price} <small>TND</small></p><p className="product-detail-text">{copy.intro}</p><div className="product-detail-actions"><button className={`button button--dark${isAdded ? ' product-added-button' : ''}`} type="button" onClick={() => onAddToCart(product)}>{isAdded ? 'Ajouté au panier' : 'Ajouter au panier'} <span>{isAdded ? '✓' : '→'}</span></button><button className={`detail-favorite${isLiked ? ' is-liked' : ''}`} type="button" aria-label="Ajouter aux favoris" aria-pressed={isLiked} onClick={() => onToggleFavorite(product)}>{isLiked ? '♥' : '♡'}</button></div><div className="product-detail-note"><span>✳</span><p>Livraison offerte dès 150 TND<br /><small>Partout en Tunisie</small></p></div></div></div><div className="product-detail-sections"><div><h2>Pourquoi vous allez l’aimer</h2><ul>{copy.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div><div><h2>Conseils d’utilisation</h2><p>Appliquez une noisette sur une peau propre et massez doucement jusqu’à absorption. Ajustez la quantité selon votre besoin et écoutez votre peau.</p><p className="ingredient-note"><strong>Ingrédients clés</strong><br />{copy.ingredients}</p></div></div><div className="detail-back"><RouteLink className="text-link" to="/produits">← Retour à la boutique</RouteLink></div></InnerPage>;
}

function BrandsPage() {
  return <InnerPage eyebrow="Nos maisons de confiance" title="Les marques" description="Nous privilégions des maisons reconnues pour la qualité de leurs formules, leur transparence et leur attention aux peaux sensibles."><div className="brand-grid">{brandData.map((brand) => <article className="brand-card" key={brand.name}><span>{brand.accent}</span><h2>{brand.name}</h2><p>{brand.description}</p><RouteLink className="text-link" to="/produits">Découvrir la sélection <span aria-hidden="true">↗</span></RouteLink></article>)}</div><div className="brand-note"><span>✳</span><p>La sélection la casa évolue au fil des saisons. Chaque référence est choisie pour avoir une vraie place dans un rituel, pas pour remplir une étagère.</p></div></InnerPage>;
}

function AdvicePage() {
  return <InnerPage eyebrow="Le journal de la casa" title="Conseils beauté" description="Des repères simples pour comprendre les ingrédients, construire un rituel et prendre soin de soi avec plus de sérénité."><div className="editorial-grid advice-grid">{articles.map((article) => <RouteLink to={article.href} className="article-card" key={article.title}><div className="article-image"><img src={article.image} alt={article.alt} /><span>{article.category}</span></div><div className="article-meta"><span>{article.date}</span><span>{article.duration}</span></div><h3>{article.title}</h3><span className="article-link">Lire l’article <b>↗</b></span></RouteLink>)}</div><div className="advice-principles"><p className="section-kicker">Notre façon de conseiller</p><h2>Moins de bruit,<br /><em>plus de justesse.</em></h2><p>Un bon conseil commence par l’écoute. Nous préférons vous aider à comprendre une routine courte plutôt que de multiplier les étapes.</p></div></InnerPage>;
}

function ArticlePage({ slug }) {
  const article = articleContent[slug];
  if (!article) return <NotFoundPage />;
  return <InnerPage eyebrow={`${article.category} · Le journal de la casa`} title={article.title} description={article.intro}><article className="article-detail"><img className="article-detail-image" src={article.image} alt="" /><div className="article-detail-copy">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-detail-tip"><span>CONSEIL LA CASA</span><strong>Gardez votre rituel simple et agréable : la régularité fera le reste.</strong></div></div></article><div className="detail-back"><RouteLink className="text-link" to="/conseils">← Retour aux conseils</RouteLink></div></InnerPage>;
}

function AboutPage() {
  return <InnerPage eyebrow="La maison la casa" title="À propos" description="Une parapharmacie pensée comme un espace de confiance, de beauté naturelle et de conseils accessibles."><div className="about-story"><div><p className="section-kicker">Notre intention</p><h2>Le soin peut être<br /><em>un moment à soi.</em></h2></div><div><p>La casa est née d’une envie simple : rendre les bons soins plus faciles à choisir et plus agréables à intégrer au quotidien.</p><p>Nous sélectionnons des produits naturels, dermatologiques et sensoriels avec une attention particulière portée à la formulation, à l’usage et à la qualité du conseil.</p><RouteLink className="button button--dark" to="/contact">Parler à notre équipe <span>→</span></RouteLink></div></div><div className="values-grid"><article><span>01</span><h3>Choisir avec soin</h3><p>Chaque référence doit avoir une raison d’être dans votre rituel.</p></article><article><span>02</span><h3>Conseiller avec justesse</h3><p>Des explications claires, sans promesses exagérées ni routine imposée.</p></article><article><span>03</span><h3>Prendre soin ensemble</h3><p>Un service disponible avant, pendant et après votre commande.</p></article></div></InnerPage>;
}

function SearchPage({ query, products, favorites, addedProductId, onAddToCart, onToggleFavorite }) {
  const normalizedQuery = query.trim().toLowerCase();
  const results = products.filter((product) => `${product.name} ${product.format} ${product.category}`.toLowerCase().includes(normalizedQuery));
  return <InnerPage eyebrow="Recherche" title={normalizedQuery ? `Résultats pour “${query}”` : 'Rechercher'} description="Trouvez un soin par nom, catégorie ou besoin."><div className="catalog-toolbar"><span>{results.length} résultat{results.length > 1 ? 's' : ''}</span><RouteLink className="text-link" to="/produits">Voir tout le catalogue <span aria-hidden="true">↗</span></RouteLink></div><ProductGrid items={results} favorites={favorites} addedProductId={addedProductId} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} /></InnerPage>;
}

function CartPage({ cart, cartTotal, onUpdateCartQuantity, onNavigate }) {
  const [checkoutMessage, setCheckoutMessage] = useState('');
  return <InnerPage eyebrow="Votre sélection" title="Votre panier" description="Retrouvez ici les soins que vous avez choisis, prêts à rejoindre votre rituel.">{cart.length === 0 ? <div className="empty-state cart-empty"><span className="empty-state-mark">♡</span><h2>Votre panier est encore vide</h2><p>Explorez nos soins et ajoutez vos essentiels pour les retrouver ici.</p><RouteLink className="button button--dark" to="/produits">Découvrir les produits <span>→</span></RouteLink></div> : <div className="cart-layout"><div className="cart-list">{cart.map(({ product, quantity }) => <article className="cart-item" key={product.id}><img src={product.image} alt={product.alt} /><div className="cart-item-copy"><RouteLink to={product.href}><h2>{product.name}</h2></RouteLink><p>{product.format}</p><strong>{product.price} TND</strong></div><div className="quantity-control"><button type="button" aria-label="Retirer une unité" onClick={() => onUpdateCartQuantity(product.id, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label="Ajouter une unité" onClick={() => onUpdateCartQuantity(product.id, quantity + 1)}>+</button></div><button className="cart-remove" type="button" aria-label={`Supprimer ${product.name}`} onClick={() => onUpdateCartQuantity(product.id, 0)}>Supprimer</button></article>)}</div><aside className="cart-summary"><p className="section-kicker">Récapitulatif</p><h2>Votre commande</h2><div><span>Sous-total</span><strong>{cartTotal.toFixed(2).replace('.', ',')} TND</strong></div><div><span>Livraison</span><strong>{cartTotal >= 150 ? 'Offerte' : 'À partir de 7 TND'}</strong></div><button className="button button--dark" type="button" onClick={() => setCheckoutMessage('Votre demande est enregistrée. Notre équipe vous contactera pour confirmer le paiement et la livraison.')}>Passer la commande <span>→</span></button>{checkoutMessage && <p className="form-success" role="status">{checkoutMessage}</p>}<button className="text-link cart-continue" type="button" onClick={() => onNavigate('/produits')}>Continuer mes achats <span>↗</span></button></aside></div>}</InnerPage>;
}

function AccountPage() {
  const [status, setStatus] = useState('');
  return <InnerPage eyebrow="Espace personnel" title="Mon compte" description="Retrouvez vos commandes, vos favoris et vos informations dans un espace personnel simple et sécurisé."><div className="account-layout"><div className="account-intro"><p className="section-kicker">Bienvenue chez vous</p><h2>Un espace pour<br /><em>vos essentiels.</em></h2><p>Connectez-vous pour retrouver vos préférences et suivre vos prochaines commandes.</p></div><form className="account-form" onSubmit={(event) => { event.preventDefault(); setStatus('Votre demande de connexion a bien été prise en compte.'); }}><label htmlFor="account-email">Adresse e-mail</label><input id="account-email" name="email" type="email" placeholder="vous@exemple.com" required /><label htmlFor="account-password">Mot de passe</label><input id="account-password" name="password" type="password" placeholder="••••••••" required /><button className="button button--dark" type="submit">Se connecter <span>→</span></button>{status && <p className="form-success" role="status">{status}</p>}<RouteLink className="text-link" to="/contact">Besoin d’aide ? <span>↗</span></RouteLink></form></div></InnerPage>;
}

function ContactPage() {
  const [status, setStatus] = useState('');
  return <InnerPage eyebrow="Nous sommes à votre écoute" title="Nous contacter" description="Une question sur un produit, une commande ou votre routine ? Écrivez-nous, notre équipe vous répondra avec attention."><div className="contact-layout"><div className="contact-details"><p className="section-kicker">Parlons-nous</p><h2>Une question,<br /><em>une attention.</em></h2><div className="contact-detail"><span>RÉPONSE</span><p>Utilisez le formulaire et recevez une réponse personnalisée sous un jour ouvré.</p></div><div className="contact-detail"><span>HORAIRES</span><p>Lun. – Ven. · 9h00 – 18h00<br />Sam. · 9h00 – 13h00</p></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setStatus('Merci pour votre message. Notre équipe revient vers vous sous un jour ouvré.'); event.currentTarget.reset(); }}><div className="form-row"><label>Prénom<input name="firstName" type="text" required /></label><label>Nom<input name="lastName" type="text" required /></label></div><label>Adresse e-mail<input name="email" type="email" required /></label><label>Votre message<textarea name="message" rows="5" required /></label><button className="button button--dark" type="submit">Envoyer le message <span>→</span></button>{status && <p className="form-success" role="status">{status}</p>}</form></div></InnerPage>;
}

function NewsletterPage() {
  const [status, setStatus] = useState('');
  return <InnerPage eyebrow="Une attention pour vous" title="La newsletter" description="Des offres exclusives, des conseils de routine et les nouveautés de la casa, directement dans votre boîte mail."><div className="newsletter-page-card"><span className="empty-state-mark">✳</span><h2>Le beau côté<br /><em>de la boîte mail.</em></h2><p>Inscrivez-vous pour recevoir une lettre douce, utile et jamais trop fréquente.</p><form className="newsletter-page-form" onSubmit={(event) => { event.preventDefault(); const email = new FormData(event.currentTarget).get('email'); setStatus(`Merci, ${email} est bien inscrit(e).`); event.currentTarget.reset(); }}><input name="email" type="email" placeholder="Votre adresse e-mail" required /><button className="button button--dark" type="submit">S’inscrire <span>→</span></button></form>{status && <p className="form-success" role="status">{status}</p>}<small>Vous pouvez vous désinscrire à tout moment.</small></div></InnerPage>;
}

function FaqPage() {
  return <InnerPage eyebrow="Aide & informations" title="Questions fréquentes" description="Les réponses aux questions que vous nous posez le plus souvent, avant et après votre commande."><div className="faq-list">{faqData.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div><div className="faq-contact"><p>Vous ne trouvez pas votre réponse ?</p><RouteLink className="text-link" to="/contact">Contacter notre équipe <span>↗</span></RouteLink></div></InnerPage>;
}

function InformationPage({ type }) {
  const content = {
    livraison: { eyebrow: 'Aide & informations', title: 'Livraison & retours', description: 'Une livraison claire, un suivi simple et une équipe disponible en cas de besoin.', sections: [['Préparation', 'Les commandes sont préparées sous 24 heures ouvrées, avec soin et dans un emballage adapté.'], ['Délais', 'Comptez 1 à 3 jours ouvrés dans le Grand Tunis et 2 à 5 jours dans les autres gouvernorats. La livraison est offerte dès 150 TND.'], ['Retours', 'Un produit non ouvert peut être retourné dans les 14 jours. Contactez-nous avant l’envoi afin que nous vous indiquions la marche à suivre.']] },
    cgv: { eyebrow: 'Informations légales', title: 'Conditions générales de vente', description: 'Les règles qui encadrent vos achats sur la boutique la casa.', sections: [['Objet', 'Les présentes conditions régissent les ventes de produits de parapharmacie proposées par la casa à ses clients.'], ['Commande', 'Toute commande est confirmée après vérification des coordonnées et de la disponibilité des produits. Les prix sont indiqués en dinars tunisiens, toutes taxes comprises lorsque la réglementation le prévoit.'], ['Responsabilité', 'La casa s’engage à présenter les produits avec exactitude. Les conseils proposés ne remplacent pas un avis médical ou pharmaceutique personnalisé.']] },
    confidentialite: { eyebrow: 'Informations légales', title: 'Politique de confidentialité', description: 'Nous utilisons vos informations uniquement pour traiter vos demandes et améliorer votre expérience.', sections: [['Données collectées', 'Nous collectons les informations nécessaires à une commande, une demande de contact ou une inscription à la newsletter.'], ['Utilisation', 'Vos données servent à répondre à vos messages, préparer vos commandes et vous envoyer la newsletter si vous y avez consenti.'], ['Vos droits', 'Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à bonjour@lacasa.tn.']] },
  }[type];
  return <InnerPage eyebrow={content.eyebrow} title={content.title} description={content.description}><div className="info-sections">{content.sections.map(([heading, text], index) => <section key={heading}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{heading}</h2><p>{text}</p></div></section>)}</div><div className="info-footer-note"><RouteLink className="text-link" to="/contact">Une question sur ces informations ? <span>↗</span></RouteLink></div></InnerPage>;
}

function NotFoundPage() {
  return <InnerPage eyebrow="La page recherchée" title="Cette page n’existe pas" description="Le lien a peut-être changé, mais l’essentiel de la casa est toujours ici."><div className="empty-state not-found-state"><span className="empty-state-mark">404</span><h2>Retrouvons votre chemin</h2><p>Explorez nos soins ou revenez à l’accueil pour continuer votre découverte.</p><div className="not-found-actions"><RouteLink className="button button--dark" to="/">Retour à l’accueil <span>→</span></RouteLink><RouteLink className="text-link" to="/produits">Voir les produits <span>↗</span></RouteLink></div></div></InnerPage>;
}

function RoutePage({ location, products, cart, cartTotal, favorites, addedProductId, onAddToCart, onToggleFavorite, onUpdateCartQuantity, onNavigate }) {
  const { path, search } = location;
  if (path === '/produits' || path === '/nouveautes' || path === '/promotions' || path.startsWith('/categorie/')) return <CatalogPage path={path} products={products} favorites={favorites} addedProductId={addedProductId} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />;
  if (path.startsWith('/produit/')) return <ProductPage slug={path.split('/').pop()} products={products} favorites={favorites} addedProductId={addedProductId} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />;
  if (path === '/marques') return <BrandsPage />;
  if (path === '/conseils') return <AdvicePage />;
  if (path.startsWith('/conseils/')) return <ArticlePage slug={path.split('/').pop()} />;
  if (path === '/a-propos') return <AboutPage />;
  if (path === '/recherche') return <SearchPage query={search.get('q') || ''} products={products} favorites={favorites} addedProductId={addedProductId} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />;
  if (path === '/panier') return <CartPage cart={cart} cartTotal={cartTotal} onUpdateCartQuantity={onUpdateCartQuantity} onNavigate={onNavigate} />;
  if (path === '/compte') return <AccountPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/newsletter') return <NewsletterPage />;
  if (path === '/faq') return <FaqPage />;
  if (path === '/livraison' || path === '/cgv' || path === '/confidentialite') return <InformationPage type={path.slice(1)} />;
  return <NotFoundPage />;
}

export default App;
