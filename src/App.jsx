import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Clock, CalendarDays } from 'lucide-react';

const weddingData = {
  bride: {
    name: "Dr Wiam Khadfy",
    shortName: "Wiam",
    fullName: "DR WIAM KHADFY",
    father: "MR AZIZ KHADFY",
    mother: "MRS AZIZA KHADFY",
    image: "/images/bride.jpg"
  },
  groom: {
    name: "Dr Mohammed Naveed",
    shortName: "Naveed",
    fullName: "DR MOHAMMED NAVEED",
    father: "MR. SHAMSUDHEEN",
    mother: "MRS RASHEEDA SHAMSUDHEEN",
    image: "/images/groom.jpg"
  },
  hosts: "MR. SHAMSUDHEEN & MRS RASHEEDA SHAMSUDHEEN",
  bestRegards: "MR SHAMSUDHEEN , MRS RASHEEDA SHAMSUDHEEN , NILDA SHAMSUDHEEN",
  date: "2026-12-25T17:00:00",
  dateLabel: "25 • DECEMBER • 2026",
  timeLabel: "5:00 PM COMMENCES • 9:00 PM CONCLUDES",
  venue: {
    name: "AURORA CASTLE",
    address: "NALLAMKALLU EDAKKAZHIYUR",
    city: "Edakkazhiyur",
    maps: "https://maps.app.goo.gl/nXYEosg2tsb9r72h9"
  }
};

const storyTimeline = [
  {
    number: "0 1",
    title: "The Beginning",
    description: "Where our story began — a simple meeting that quietly changed everything."
  },
  {
    number: "0 2",
    title: "A Beautiful Journey",
    description: "Growing together, learning together and creating unforgettable memories."
  },
  {
    number: "0 3",
    title: "The Proposal",
    description: "A special moment, a quiet promise, and one unforgettable yes."
  },
  {
    number: "0 4",
    title: "Forever Begins",
    description: "Our journey continues with a new chapter, written together."
  }
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Venue", href: "#venue" }
];

function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;

    const playAudio = () => {
      audio.play().then(() => {
        window.removeEventListener("pointerdown", playAudio);
        window.removeEventListener("touchstart", playAudio);
        window.removeEventListener("keydown", playAudio);
      }).catch(() => {});
    };

    playAudio();
    window.addEventListener("pointerdown", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("keydown", playAudio);

    return () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/anlatmam.mp3"
      autoPlay
      loop
      preload="auto"
      playsInline
      aria-label="Background wedding music"
    />
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-ivory/90 backdrop-blur-md shadow-sm border-b border-gold/20 py-3' : 'border-b border-transparent py-4'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className="font-serif text-xl tracking-[0.2em] text-burgundy">
          N <span className="text-gold">&amp;</span> W
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative font-sans text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors hover:text-burgundy"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-burgundy md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </nav>

      <div className={`fixed inset-0 z-50 flex flex-col paper-texture transition-opacity duration-500 md:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-serif text-xl tracking-[0.2em] text-burgundy">
            N <span className="text-gold">&amp;</span> W
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-burgundy"
            aria-label="Close menu"
          >
            <X className="size-7" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-3xl tracking-wide text-burgundy"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Petals({ count = 10 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 100 * Math.random(),
        size: 8 + 10 * Math.random(),
        duration: 12 + 12 * Math.random(),
        delay: -(20 * Math.random()),
        drift: `${(Math.random() - 0.5) * 160}px`,
        opacity: 0.25 + 0.4 * Math.random()
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--petal-drift': p.drift,
            '--petal-opacity': p.opacity
          }}
        />
      ))}
    </div>
  );
}

function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-24"></span>
      <svg width="46" height="16" viewBox="0 0 46 16" fill="none" className="text-gold">
        <path d="M23 2c2.5 3 5 4 8 4-3 0-5.5 1-8 4-2.5-3-5-4-8-4 3 0 5.5-1 8-4Z" fill="currentColor" fillOpacity="0.9"></path>
        <circle cx="4" cy="8" r="1.6" fill="currentColor"></circle>
        <circle cx="42" cy="8" r="1.6" fill="currentColor"></circle>
        <path d="M9 8h6M31 8h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"></path>
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-24"></span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = as;

  return (
    <Component
      ref={domRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

function HeroSection({ onOpenInvitation }) {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden paper-texture">
      <div className="absolute inset-0 arabesque opacity-70" aria-hidden="true" />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="blend-floral pointer-events-none absolute -left-8 -top-6 w-40 select-none sm:w-56 md:w-72 lg:w-80"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="blend-floral pointer-events-none absolute -right-8 -top-6 w-40 -scale-x-100 select-none sm:w-56 md:w-72 lg:w-80"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="blend-floral pointer-events-none absolute -bottom-6 -left-8 w-36 -scale-y-100 select-none opacity-90 sm:w-52 md:w-64 lg:hidden"
      />
      <Petals count={10} />
      <div className="pointer-events-none absolute inset-4 border border-gold/25 sm:inset-6 md:inset-8" />
      <div className="pointer-events-none absolute inset-5 border border-gold/15 sm:inset-8 md:inset-10" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center px-8 pb-16 pt-24 text-center md:pt-28">
        <p dir="rtl" lang="ar" className="font-arabic text-3xl leading-relaxed text-gold sm:text-4xl md:text-5xl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <GoldDivider className="mt-4" />

        <p className="mt-10 font-sans text-xs uppercase tracking-[0.5em] text-foreground/70">
          The Wedding Of
        </p>

        <div className="mt-4 flex flex-col items-center">
          <h1 className="font-serif text-6xl font-light capitalize leading-none text-black sm:text-7xl md:text-8xl" style={{ color: '#000000' }}>
            {weddingData.groom.name}
          </h1>
          <span className="my-2 font-serif text-4xl italic text-black sm:text-5xl" style={{ color: '#000000' }}>&amp;</span>
          <h1 className="font-serif text-6xl font-light capitalize leading-none text-black sm:text-7xl md:text-8xl" style={{ color: '#000000' }}>
            {weddingData.bride.name}
          </h1>
        </div>

        <p className="mt-8 max-w-md text-pretty font-serif text-lg italic leading-relaxed text-foreground/80 sm:text-xl">
          with the blessing of allah,we joyfully invite you to celebrate the marriage of mohammed naveed &amp; wiam khadfy
        </p>

        <div className="mt-9 flex flex-col items-center gap-1.5">
          <p className="font-sans text-sm uppercase tracking-[0.4em] text-black font-medium sm:text-base">
            {weddingData.dateLabel}
          </p>
          <span className="h-px w-14 bg-gold/50" />
          <p className="mt-1 font-serif text-lg text-foreground/80">
            {weddingData.venue.name}
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/60">
            {weddingData.venue.city}
          </p>
        </div>

        <a
          href="#invitation"
          onClick={(e) => {
            e.preventDefault();
            onOpenInvitation();
          }}
          className="mt-10 inline-flex items-center justify-center rounded-lg border border-[#A88C66] bg-[#B79B74] hover:bg-[#B79B74] active:bg-[#B79B74] focus:bg-[#B79B74] px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#382D26] shadow-sm transition-all duration-300 hover:tracking-[0.4em]"
        >
          Open Invitation
        </a>
      </div>
    </section>
  );
}

function InvitationSection() {
  return (
    <section id="invitation" className="relative overflow-hidden bg-warm-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 arabesque opacity-60" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="relative border border-gold/30 bg-ivory/70 px-6 py-16 text-center sm:px-14 md:py-20">
          <span className="absolute left-3 top-3 size-6 border-l border-t border-gold/60" />
          <span className="absolute right-3 top-3 size-6 border-r border-t border-gold/60" />
          <span className="absolute bottom-3 left-3 size-6 border-b border-l border-gold/60" />
          <span className="absolute bottom-3 right-3 size-6 border-b border-r border-gold/60" />

          <Reveal>
            <SectionLabel>Assalamu Alaikum</SectionLabel>
            <h2 className="mt-5 text-balance font-serif text-3xl font-light uppercase tracking-widest text-black sm:text-4xl md:text-5xl">
              WEDDING RECEPTION CEREMONY
            </h2>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.35em] text-gold font-medium sm:text-sm">
              {weddingData.hosts}
            </p>
            <GoldDivider className="mt-7" />
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-9 max-w-xl text-pretty font-serif text-lg leading-relaxed text-foreground/85 sm:text-xl">
              With great joy we invite you to grace the occasion of our son
            </p>

            <h3 className="mt-6 font-serif text-3xl font-medium uppercase tracking-wider text-black sm:text-4xl" style={{ color: '#000000' }}>
              {weddingData.groom.fullName}
            </h3>

            <p className="my-4 font-serif text-2xl italic text-black" style={{ color: '#000000' }}>With</p>

            <h3 className="font-serif text-3xl font-medium uppercase tracking-wider text-black sm:text-4xl" style={{ color: '#000000' }}>
              {weddingData.bride.fullName}
            </h3>

            <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-foreground/60">
              Daughter of
            </p>
            <p className="mt-2 font-serif text-xl font-medium tracking-wide text-foreground/80 sm:text-2xl">
              {weddingData.bride.father} &amp; {weddingData.bride.mother}
            </p>

            <div className="mt-12 border-t border-gold/25 pt-8">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.4em] text-gold font-semibold">
                BEST REGARD FROM
              </p>
              <p className="mt-3 font-serif text-base uppercase tracking-wider leading-relaxed text-foreground/85 sm:text-lg">
                {weddingData.bestRegards}
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <img
              src="/images/floral-branch.png"
              alt=""
              aria-hidden="true"
              width={520}
              height={180}
              className="blend-floral mx-auto mt-10 w-64 sm:w-80"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhotoBoxCard({ role, name, image }) {
  return (
    <div className="group relative border border-gold/30 bg-warm-white p-4 sm:p-5 text-center transition-all duration-500 hover:border-gold/70 hover:shadow-xl hover:shadow-burgundy/5">
      <span className="absolute left-2.5 top-2.5 size-5 border-l border-t border-gold/60 pointer-events-none" />
      <span className="absolute right-2.5 top-2.5 size-5 border-r border-t border-gold/60 pointer-events-none" />
      <span className="absolute bottom-2.5 left-2.5 size-5 border-b border-l border-gold/60 pointer-events-none" />
      <span className="absolute bottom-2.5 right-2.5 size-5 border-b border-r border-gold/60 pointer-events-none" />

      <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/20 bg-ivory">
        <img
          src={image}
          alt={`${role} - ${name}`}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 pb-1">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold font-medium">{role}</p>
        <h3 className="mt-1.5 font-serif text-xl font-medium uppercase tracking-wider text-black sm:text-2xl" style={{ color: '#000000' }}>{name}</h3>
      </div>
    </div>
  );
}

function CoupleSection() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <SectionLabel>The Blessed Union</SectionLabel>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light text-black sm:text-5xl" style={{ color: '#000000' }}>
            Two Hearts, One Journey
          </h2>
          <GoldDivider className="mt-7" />
        </Reveal>

        <div className="mt-14 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <Reveal delay={100}>
            <PhotoBoxCard
              role="The Groom"
              name={weddingData.groom.fullName}
              image={weddingData.groom.image}
            />
          </Reveal>
          <Reveal delay={200} className="flex justify-center">
            <span className="font-serif text-5xl italic text-black md:text-6xl" style={{ color: '#000000' }}>&amp;</span>
          </Reveal>
          <Reveal delay={300}>
            <PhotoBoxCard
              role="The Bride"
              name={weddingData.bride.fullName}
              image={weddingData.bride.image}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function calculateTimeLeft(targetTime) {
  const diff = Math.max(0, targetTime - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function CountdownSection() {
  const targetDate = new Date(weddingData.date).getTime();
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section className="relative overflow-hidden bg-beige-gold-section py-24 text-burgundy md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cg fill='none' stroke='%233a2e26' stroke-width='1'%3E%3Cpath d='M45 6c10 15 24 15 34 0M45 84c10-15 24-15 34 0M6 45c15-10 15-24 0-34M84 45c-15-10-15-24 0-34'/%3E%3Ccircle cx='45' cy='45' r='20'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "90px 90px"
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>Save the Date</SectionLabel>
          <h2 className="mt-5 text-balance font-serif text-4xl font-light text-black sm:text-5xl">
            Counting Down to Our Forever
          </h2>
          <GoldDivider className="mt-7" />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center border border-gold/40 bg-warm-white/80 px-4 py-7 backdrop-blur-md shadow-sm"
              >
                <span className="font-serif text-5xl font-light tabular-nums text-black sm:text-6xl">
                  {isMounted ? String(block.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-foreground/75 font-medium">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-10 font-serif text-xl italic text-black/90">
            {weddingData.dateLabel} — 5:00 PM COMMENCES
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden bg-warm-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="font-serif text-5xl font-light text-black sm:text-6xl">
            Our Story
          </h2>
          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60 sm:w-28" />
            <span className="text-gold text-xs">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60 sm:w-28" />
          </div>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-xl pl-8 sm:pl-12">
          <div className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-px bg-gold/40" />

          <div className="space-y-12">
            {storyTimeline.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 120} className="relative">
                <div className="absolute -left-8 sm:-left-12 top-1.5 flex size-5 sm:size-6 -translate-x-1/2 items-center justify-center rounded-full border border-gold/70 bg-warm-white shadow-sm">
                  <span className="size-2 rounded-full bg-gold" />
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium">
                    {item.number}
                  </p>
                  <h3 className="mt-1.5 font-serif text-3xl font-normal text-black sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-foreground/75 font-light">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden bg-beige-gold-section py-24 text-burgundy md:py-32">
      <div className="pointer-events-none absolute inset-0 arabesque opacity-50" />
      
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>Join Us At</SectionLabel>
          <h2 className="mt-4 font-serif text-5xl font-light capitalize leading-tight text-black sm:text-6xl md:text-7xl">
            VENUE <span className="font-serif italic text-gold font-normal">of</span> EVENT
          </h2>
          <GoldDivider className="mt-8" />
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-12 max-w-2xl border border-gold/40 bg-warm-white/85 p-8 sm:p-14 backdrop-blur-md shadow-md text-burgundy">
            
            <div className="py-4">
              <p className="font-sans text-lg uppercase tracking-[0.4em] font-medium text-black sm:text-xl">
                DECEMBER 25 , 2026
              </p>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="py-4">
              <p className="font-serif text-3xl uppercase tracking-widest text-black sm:text-4xl">
                AT AURORA CASTLE
              </p>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="py-4">
              <p className="font-sans text-base uppercase tracking-[0.35em] text-foreground/80 sm:text-lg">
                5:00 PM COMMENCES
              </p>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="py-4">
              <p className="font-sans text-base uppercase tracking-[0.35em] text-foreground/80 sm:text-lg">
                9:00 PM CONCLUDES
              </p>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="py-4">
              <p className="font-sans text-base uppercase tracking-[0.3em] font-medium text-black sm:text-lg">
                NALLAMKALLU EDAKKAZHIYUR
              </p>
            </div>

            <a
              href={weddingData.venue.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-lg border border-[#A88C66] bg-[#B79B74] hover:bg-[#B79B74] active:bg-[#B79B74] focus:bg-[#B79B74] px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#382D26] shadow-sm transition-all duration-300 hover:tracking-[0.4em]"
            >
              Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="relative mx-auto mt-12 max-w-2xl border border-gold/40 p-2 bg-warm-white/50 backdrop-blur-sm">
            <iframe
              title="Map showing Aurora Castle Edakkazhiyur"
              src="https://maps.google.com/maps?q=10.6283986,75.9924398&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full grayscale-[0.2] sm:h-80"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative min-h-[46rem] overflow-hidden bg-beige-gold-section py-24 text-center text-burgundy md:py-32">
      <img
        src="/images/couple-final.jpg"
        alt="Dr Mohammed Naveed & Dr Wiam Khadfy"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 max-h-[46rem] w-auto -translate-x-1/2 object-contain object-bottom opacity-85"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#FAF5EF]/40 via-[#FAF5EF]/75 to-[#FAF5EF]/95" />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="blend-floral pointer-events-none absolute -left-6 -top-6 w-40 opacity-70 sm:w-56"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="blend-floral pointer-events-none absolute -bottom-6 -right-6 w-40 -scale-x-100 -scale-y-100 opacity-70 sm:w-56"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <Reveal>
          <p dir="rtl" lang="ar" className="font-arabic text-xl leading-relaxed text-gold sm:text-2xl font-bold">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="mt-4 text-sm italic text-foreground/80">
            “May Allah bless you, and shower His blessings upon you, and join you together in goodness.”
          </p>
        </Reveal>

        <Reveal delay={150}>
          <GoldDivider className="mt-10" />
          <h2 className="mt-10 font-serif text-3xl font-light uppercase tracking-wider text-black sm:text-4xl md:text-5xl" style={{ color: '#000000' }}>
            {weddingData.groom.fullName}
            <span className="mx-3 italic text-black font-normal" style={{ color: '#000000' }}>&amp;</span>
            {weddingData.bride.fullName}
          </h2>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.4em] text-foreground/75 font-medium">
            {weddingData.dateLabel}
          </p>

          <p className="mt-10 font-serif text-lg leading-relaxed text-black sm:text-xl font-light italic tracking-wide">
            "Be a part of our memories we will cherish forever"
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.getElementById("invitation")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [isOpened]);

  return (
    <main className="relative">
      <AudioPlayer />
      <Navigation />
      <HeroSection onOpenInvitation={() => setIsOpened(true)} />
      {isOpened && (
        <>
          <InvitationSection />
          <CoupleSection />
          <CountdownSection />
          <StorySection />
          <VenueSection />
          <Footer />
        </>
      )}
    </main>
  );
}
