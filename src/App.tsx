import { FormEvent, ReactNode, useEffect, useState } from "react";

type Page = "home" | "about" | "therapies" | "products" | "contact";
type IconName =
  | "arrow"
  | "brain"
  | "check"
  | "heart"
  | "mail"
  | "menu"
  | "phone"
  | "pin"
  | "shield"
  | "spark"
  | "users"
  | "x";

const researchImage =
  "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=1400&q=85";
const doctorImage =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=85";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0-1 5.5A3.5 3.5 0 0 0 9.5 17"/><path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1 1 5.5 3.5 3.5 0 0 1-5.5 4.5"/><path d="M9.5 4.5v15"/><path d="M14.5 4.5v15"/><path d="M6 9h3.5M14.5 9H18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <><path d="m12 3-1.4 4.1a5 5 0 0 1-3.1 3.1L3 12l4.5 1.8a5 5 0 0 1 3.1 3.1L12 21l1.4-4.1a5 5 0 0 1 3.1-3.1L21 12l-4.5-1.8a5 5 0 0 1-3.1-3.1Z"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const nav: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "therapies", label: "Therapeutic Areas" },
  { id: "products", label: "Products" },
  { id: "contact", label: "Contact" },
];

const therapies = [
  { icon: "brain" as IconName, number: "01", title: "Neurology", text: "Supporting healthcare professionals in the management of neurological conditions and improved patient outcomes." },
  { icon: "spark" as IconName, number: "02", title: "Psychiatry", text: "Addressing evolving mental health needs through reliable, quality-driven pharmaceutical solutions." },
  { icon: "users" as IconName, number: "03", title: "Orthopaedics", text: "Solutions focused on musculoskeletal health, mobility and a better quality of life." },
  { icon: "heart" as IconName, number: "04", title: "General Medicine", text: "Reliable solutions addressing a broad range of everyday and evolving healthcare needs." },
];

const values = [
  ["shield", "Quality First", "High standards of quality, safety and reliability."],
  ["heart", "Patient Focus", "Better healthcare and quality of life at the centre."],
  ["spark", "Scientific Excellence", "Continuous learning, knowledge and advancement."],
  ["check", "Integrity", "Transparent, ethical and responsible practices."],
  ["brain", "Innovation", "New ideas and better ways to meet healthcare needs."],
  ["users", "Trust", "Lasting relationships through consistency and reliability."],
] as [IconName, string, string][];

function Brand({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? "brand-light" : ""}`}><span className="brand-mark"><span>U</span></span><span className="brand-copy"><strong>UNIGENE</strong><small>PHARMACEUTICALS</small></span></div>;
}

function ButtonLink({ children, onClick, secondary = false }: { children: ReactNode; onClick: () => void; secondary?: boolean }) {
  return <button className={`btn ${secondary ? "btn-secondary" : ""}`} onClick={onClick}>{children}<Icon name="arrow" size={18} /></button>;
}

function SectionTitle({ eyebrow, title, intro, centered = false }: { eyebrow: string; title: string; intro?: string; centered?: boolean }) {
  return <div className={`section-title ${centered ? "centered" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

function Header({ page, go }: { page: Page; go: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Advancing health. Enriching lives.</span><div><span><Icon name="mail" size={15}/> info@unigenepharma.com</span><span><Icon name="phone" size={15}/> +91 98940 52072</span></div></div></div>
    <header>
      <div className="container header-inner">
        <button className="logo-button" aria-label="Go to home" onClick={() => go("home")}><Brand /></button>
        <nav className={open ? "nav-open" : ""}>
          {nav.map((item) => <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => { go(item.id); setOpen(false); }}>{item.label}</button>)}
          <button className="nav-cta" onClick={() => { go("contact"); setOpen(false); }}>Send an enquiry</button>
        </nav>
        <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} /></button>
      </div>
    </header>
  </>;
}

function Footer({ go }: { go: (page: Page) => void }) {
  return <footer>
    <div className="container footer-main">
      <div className="footer-brand"><Brand light/><p>Quality-driven pharmaceutical solutions for evolving healthcare needs.</p><span className="founded">Established 2025 · Chennai, India</span></div>
      <div><h3>Explore</h3>{nav.slice(0, 4).map((item) => <button key={item.id} onClick={() => go(item.id)}>{item.label}</button>)}</div>
      <div><h3>Therapeutic Focus</h3><span>Neurology</span><span>Psychiatry</span><span>Orthopaedics</span><span>General Medicine</span></div>
      <div><h3>Get in touch</h3><span>237, 13th Cross Street,<br/>Nolambur Phase II, Chennai 600037</span><a href="tel:+919894052072">+91 98940 52072</a><a href="mailto:info@unigenepharma.com">info@unigenepharma.com</a></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Unigene Pharmaceuticals Private Limited.</span><span>For informational purposes only.</span></div>
  </footer>;
}

function Home({ go }: { go: (p: Page) => void }) {
  return <>
    <section className="hero">
      <div className="hero-art" aria-hidden="true"><div className="orb orb-one"/><div className="orb orb-two"/><div className="molecule m1"/><div className="molecule m2"/></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow light">Science with purpose</span>
          <h1>Better possibilities in <em>healthcare.</em></h1>
          <p>Progressive, quality-driven pharmaceutical solutions created to support healthcare professionals and improve patient outcomes.</p>
          <div className="hero-actions"><ButtonLink onClick={() => go("about")}>Discover our purpose</ButtonLink><button className="text-link" onClick={() => go("therapies")}>Explore therapeutic areas <Icon name="arrow" size={17}/></button></div>
          <div className="hero-proof"><span><strong>4</strong> Therapeutic areas</span><span><strong>2025</strong> Established</span><span><strong>100%</strong> Purpose-led</span></div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image"><img src={doctorImage} alt="Healthcare professional in a clinical setting" /></div>
          <div className="quality-card"><span><Icon name="shield"/></span><div><strong>Quality first</strong><small>Safety · Reliability · Trust</small></div></div>
        </div>
      </div>
    </section>

    <section className="intro-section container">
      <div className="intro-number">01</div>
      <div><span className="eyebrow">Who we are</span><h2>Building better possibilities in healthcare</h2></div>
      <div><p>Unigene Pharmaceuticals is a progressive company committed to delivering quality, affordable and reliable healthcare solutions.</p><button className="text-link dark" onClick={() => go("about")}>More about Unigene <Icon name="arrow" size={17}/></button></div>
    </section>

    <section className="therapy-section">
      <div className="container"><SectionTitle eyebrow="Our therapeutic focus" title="Focused care. Meaningful outcomes." intro="A growing portfolio designed around evolving healthcare needs." />
        <div className="therapy-grid">{therapies.map((item) => <article className="therapy-card" key={item.title}><span className="card-number">{item.number}</span><div className="therapy-icon"><Icon name={item.icon}/></div><h3>{item.title}</h3><p>{item.text}</p><button aria-label={`Learn about ${item.title}`} onClick={() => go("therapies")}><Icon name="arrow"/></button></article>)}</div>
      </div>
    </section>

    <section className="philosophy container">
      <div className="image-panel"><img src={researchImage} alt="Scientist working in a pharmaceutical laboratory"/><div className="image-caption"><Icon name="spark"/><span>Scientific excellence.<br/>Continuous improvement.</span></div></div>
      <div className="philosophy-copy"><SectionTitle eyebrow="Our philosophy" title="Healthcare is more than a product."/><p>Meaningful pharmaceutical progress begins with understanding real healthcare needs. We combine science, quality, responsibility and collaboration to create lasting value.</p>
        <div className="check-list"><span><Icon name="check"/> Ethical, responsible practices</span><span><Icon name="check"/> Quality-driven solutions</span><span><Icon name="check"/> Meaningful collaboration</span></div>
        <ButtonLink onClick={() => go("about")}>Our vision & values</ButtonLink>
      </div>
    </section>

    <Cta go={go}/>
  </>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><div className="page-hero-orb"/><div className="container"><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

function About({ go }: { go: (p: Page) => void }) {
  return <><PageHero eyebrow="About Unigene" title="Progress with purpose." text="A progressive approach to pharmaceutical healthcare, built on science, ethics and trust."/>
    <section className="story container"><div><SectionTitle eyebrow="Our story" title="Emerging today. Building for tomorrow."/><p>Established in 2025, Unigene Pharmaceuticals Private Limited is focused on addressing the evolving needs of healthcare professionals and patients through a growing portfolio across Neurology, Psychiatry, Orthopaedics and General Medicine.</p><p>As we grow, our aim is to establish Unigene as a trusted pharmaceutical company that creates lasting value for patients, professionals, partners, employees and society.</p></div><div className="story-image"><img src={researchImage} alt="Pharmaceutical researcher at work"/><div><strong>2025</strong><span>The beginning of our purposeful journey</span></div></div></section>
    <section className="vision-section"><div className="container vision-grid"><div><span className="eyebrow light">Our vision</span><h2>Building trust.<br/>Creating lasting value.</h2><p>To build a trusted and progressive pharmaceutical company that delivers quality, affordable and innovative healthcare solutions.</p></div><div><span className="eyebrow">Our mission</span><h2>Quality healthcare, with purpose.</h2><p>To provide reliable pharmaceutical solutions while advancing scientific excellence, ethical practices, customer trust and continuous improvement.</p></div></div></section>
    <section className="values container"><SectionTitle centered eyebrow="What guides us" title="Our core values" intro="Principles that shape every decision, relationship and solution."/><div className="values-grid">{values.map(([icon,title,text]) => <article key={title}><span><Icon name={icon}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <Cta go={go}/>
  </>;
}

function Therapies({ go }: { go: (p: Page) => void }) {
  return <><PageHero eyebrow="Therapeutic areas" title="Focused expertise. Broader impact." text="Four areas of focus united by one goal: supporting better healthcare and quality of life."/>
    <section className="therapy-detail container"><SectionTitle eyebrow="Our areas of focus" title="Responding to evolving healthcare needs." intro="Our growing portfolio reflects areas where consistent quality and dependable access can make a meaningful difference."/>
      <div className="detail-list">{therapies.map((item, index) => <article key={item.title}><div className="detail-number">{item.number}</div><div className="detail-icon"><Icon name={item.icon} size={30}/></div><div><h2>{item.title}</h2><p>{item.text}</p><span>{index === 0 ? "Neurological care" : index === 1 ? "Mental well-being" : index === 2 ? "Mobility & musculoskeletal health" : "Everyday healthcare needs"}</span></div></article>)}</div>
    </section>
    <section className="approach-band"><div className="container"><div><span className="eyebrow light">Our approach</span><h2>Every solution begins with understanding.</h2></div><p>We listen to healthcare professionals, stay attentive to changing needs, and pursue solutions grounded in quality, science and responsibility.</p></div></section>
    <Cta go={go}/>
  </>;
}

function Products({ go }: { go: (p: Page) => void }) {
  return <><PageHero eyebrow="Products" title="Quality you can rely on." text="A growing pharmaceutical portfolio developed around quality, affordability and evolving clinical needs."/>
    <section className="products-intro container"><div><SectionTitle eyebrow="Our portfolio" title="Designed around real healthcare needs."/><p>Unigene is building a focused portfolio across four key therapeutic areas. Product-specific information is intended for healthcare professionals and is available on request.</p><ButtonLink onClick={() => go("contact")}>Request product information</ButtonLink></div><div className="product-visual"><div className="pack pack-one"><Brand/><span>Quality healthcare,<br/>with purpose.</span></div><div className="pack pack-two"><span>UNIGENE</span><Icon name="spark" size={48}/></div></div></section>
    <section className="portfolio-section"><div className="container"><SectionTitle centered eyebrow="Portfolio coverage" title="Four areas. One quality commitment."/><div className="portfolio-grid">{therapies.map((item) => <article key={item.title}><Icon name={item.icon}/><h3>{item.title}</h3><p>{item.text}</p><span>Product details on request</span></article>)}</div><div className="disclaimer"><Icon name="shield"/><p><strong>Responsible information.</strong> Product information is provided in accordance with applicable regulations and is intended for qualified healthcare professionals where relevant.</p></div></div></section>
    <Cta go={go}/>
  </>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <><PageHero eyebrow="Contact us" title="Let’s connect." text="We’re here to connect, collaborate and grow together."/>
    <section className="contact-section container">
      <div className="contact-copy"><SectionTitle eyebrow="Get in touch" title="We would be happy to hear from you."/><p>Reach out for product information, business enquiries, collaborations or general enquiries.</p>
        <div className="contact-items">
          <div><span><Icon name="pin"/></span><p><strong>Visit us</strong>237, 13th Cross Street,<br/>Nolambur Phase II, Mogappair West,<br/>Chennai – 600037, Tamil Nadu, India</p></div>
          <div><span><Icon name="phone"/></span><p><strong>Call or WhatsApp</strong><a href="tel:+919894052072">+91 98940 52072</a><br/><a href="tel:+919894159027">+91 98941 59027</a></p></div>
          <div><span><Icon name="mail"/></span><p><strong>Email us</strong><a href="mailto:info@unigenepharma.com">info@unigenepharma.com</a></p></div>
        </div>
      </div>
      <form onSubmit={submit}><span className="eyebrow">Send an enquiry</span><h2>How can we help?</h2>
        {sent ? <div className="success"><span><Icon name="check"/></span><h3>Thank you for reaching out.</h3><p>Your enquiry has been received. Our team will get back to you soon.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div> : <>
          <div className="field-row"><label>Full name *<input required placeholder="Enter your name"/></label><label>Email address *<input type="email" required placeholder="name@company.com"/></label></div>
          <div className="field-row"><label>Phone number *<input type="tel" required placeholder="+91 00000 00000"/></label><label>Enquiry type<select defaultValue=""><option value="" disabled>Select a category</option><option>Product Enquiry</option><option>Business Enquiry</option><option>Partnership / Collaboration</option><option>Career Enquiry</option><option>General Enquiry</option></select></label></div>
          <label>Message *<textarea required rows={5} placeholder="Tell us how we can help"/></label><button className="btn submit" type="submit">Send message <Icon name="arrow" size={18}/></button>
        </>}
      </form>
    </section>
  </>;
}

function Cta({ go }: { go: (p: Page) => void }) {
  return <section className="cta-section"><div className="container"><div><span className="eyebrow light">Let’s build better possibilities</span><h2>Connect. Collaborate. Grow.</h2><p>Whether you are a healthcare professional, partner or customer, we would be happy to hear from you.</p></div><ButtonLink onClick={() => go("contact")}>Start a conversation</ButtonLink></div></section>;
}

export default function App() {
  const initial = (window.location.hash.replace("#/", "") || "home") as Page;
  const [page, setPage] = useState<Page>(nav.some((n) => n.id === initial) ? initial : "home");
  const go = (next: Page) => { setPage(next); window.location.hash = `/${next}`; window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => {
    const sync = () => { const next = window.location.hash.replace("#/", "") as Page; if (nav.some((n) => n.id === next)) setPage(next); };
    window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync);
  }, []);
  return <div><Header page={page} go={go}/><main>{page === "home" && <Home go={go}/>} {page === "about" && <About go={go}/>} {page === "therapies" && <Therapies go={go}/>} {page === "products" && <Products go={go}/>} {page === "contact" && <Contact/>}</main><Footer go={go}/></div>;
}
