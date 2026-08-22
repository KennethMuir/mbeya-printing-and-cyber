"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CloudUpload,
  Copy,
  FileText,
  Layers3,
  Menu,
  MessageCircle,
  Package,
  Printer,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";

type Service = {
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
};

type CyberService = {
  title: string;
  description: string;
};

type FAQ = {
  question: string;
  answer: string;
};

const images: string[] = [
  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=85",
];

const services: Service[] = [
  {
    title: "Business Cards",
    category: "Business",
    price: "From KSh 500",
    description:
      "Sharp, premium cards built for memorable first impressions.",
    image: images[0],
  },
  {
    title: "Flyers",
    category: "Marketing",
    price: "From KSh 300",
    description:
      "High-impact promotional prints for campaigns and events.",
    image: images[1],
  },
  {
    title: "Certificates",
    category: "Documents",
    price: "From KSh 100",
    description:
      "Professional certificates for schools, businesses and events.",
    image: images[2],
  },
  {
    title: "Brochures",
    category: "Marketing",
    price: "From KSh 500",
    description:
      "Elegant folded print materials for brands and organizations.",
    image: images[3],
  },
  {
    title: "Booklets",
    category: "Documents",
    price: "From KSh 800",
    description:
      "Training manuals, programmes, reports and compact publications.",
    image: images[4],
  },
  {
    title: "Letterheads",
    category: "Business",
    price: "From KSh 500",
    description:
      "Professional stationery that makes every document official.",
    image: images[5],
  },
  {
    title: "Reports",
    category: "Documents",
    price: "From KSh 10/page",
    description:
      "Clean and reliable document printing for work and school.",
    image: images[6],
  },
  {
    title: "Invitations",
    category: "Events",
    price: "From KSh 500",
    description:
      "Beautiful invitations for weddings, celebrations and events.",
    image: images[7],
  },
  {
    title: "Posters",
    category: "Marketing",
    price: "From KSh 300",
    description:
      "Large-format promotional paper prints with strong visual impact.",
    image: images[8],
  },
];

const cyberServices: CyberService[] = [
  {
    title: "eCitizen",
    description: "Government service assistance",
  },
  {
    title: "KRA",
    description: "Online tax and account assistance",
  },
  {
    title: "NTSA",
    description: "Vehicle and licensing assistance",
  },
  {
    title: "HELB",
    description: "Application and account assistance",
  },
  {
    title: "Online Applications",
    description: "Forms and online submissions",
  },
  {
    title: "CV Services",
    description: "Professional CV typing and formatting",
  },
  {
    title: "Typing",
    description: "Fast document typing and preparation",
  },
  {
    title: "Scanning",
    description: "Physical documents converted to digital",
  },
];

const faqs: FAQ[] = [
  {
    question: "Can I send my document online?",
    answer:
      "Yes. Use the Upload & Print section to submit your document and specify what you need.",
  },
  {
    question: "Can I order only one copy?",
    answer:
      "Yes. Single-document printing is supported. Larger quantities can also receive bulk pricing.",
  },
  {
    question: "Do you provide cyber services?",
    answer:
      "Yes. Mbeya combines paper printing with digital and online assistance.",
  },
  {
    question: "Can you design my document?",
    answer:
      "Yes. You can request design assistance for flyers, cards, certificates, invitations and other print materials.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Use the order tracking section and enter your order reference number.",
  },
];

const categories: string[] = [
  "All",
  "Business",
  "Marketing",
  "Documents",
  "Events",
];

const processSteps = [
  ["01", "CHOOSE", "Select what you want printed."],
  ["02", "CONFIGURE", "Tell us your size, paper and finish."],
  ["03", "UPLOAD", "Send your artwork or document."],
  ["04", "CONFIRM", "Review your requirements and price."],
  ["05", "PRODUCE", "Mbeya processes your order."],
  ["06", "COLLECT", "Collect or arrange delivery."],
];

const businessServices: string[] = [
  "Company Profiles",
  "Reports",
  "Proposals",
  "Training Manuals",
  "Business Cards",
  "Letterheads",
  "Receipt Books",
  "Certificates",
  "Booklets",
  "Corporate Stationery",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  const [quantity, setQuantity] = useState<number>(1);
  const [paper, setPaper] = useState<string>("Standard");
  const [colour, setColour] = useState<string>("Black & White");
  const [finish, setFinish] = useState<string>("None");

  const [faq, setFaq] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState<string>("");

  const filteredServices = useMemo<Service[]>(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        category === "All" || service.category === category;

      const matchesSearch =
        normalizedSearch === "" ||
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.category.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const basePrice = 10;

  const paperExtra =
    paper === "Premium" ? 10 : paper === "Glossy" ? 15 : 0;

  const colourExtra = colour === "Colour" ? 15 : 0;

  const finishExtra =
    finish === "Lamination"
      ? 30
      : finish === "Binding"
        ? 50
        : 0;

  const estimate =
    (basePrice + paperExtra + colourExtra + finishExtra) * quantity;

  const whatsappMessage = encodeURIComponent(
    "Hello Mbeya Printing & Cyber Services. I would like to make an enquiry."
  );

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      {/* =========================================================
          ANNOUNCEMENT
          ========================================================= */}

      <div className="announcement">
        <span>MBEYA PRINTING & CYBER SERVICES</span>
        <span className="announcement-dot" />
        <span>PRINT. PROCESS. CONNECT.</span>
        <span className="announcement-link">ORDER ONLINE →</span>
      </div>

      {/* =========================================================
          NAVIGATION
          ========================================================= */}

      <header className="navbar">
        <a href="#" className="brand" onClick={closeMobileMenu}>
          <span className="brand-mark">M</span>

          <span>
            <strong>MBEYA</strong>
            <small>PRINTING & CYBER</small>
          </span>
        </a>

        <nav
          className={
            menuOpen ? "nav-links mobile-open" : "nav-links"
          }
        >
          <a href="#print" onClick={closeMobileMenu}>
            PRINT
          </a>

          <a href="#cyber" onClick={closeMobileMenu}>
            CYBER
          </a>

          <a href="#process" onClick={closeMobileMenu}>
            HOW IT WORKS
          </a>

          <a href="#business" onClick={closeMobileMenu}>
            BUSINESS
          </a>

          <a href="#contact" onClick={closeMobileMenu}>
            CONTACT
          </a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <Search size={19} />
          </button>

          <a href="#upload" className="start-order">
            START AN ORDER
            <ArrowRight size={16} />
          </a>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* =========================================================
          SEARCH
          ========================================================= */}

      {searchOpen && (
        <div className="search-panel">
          <Search size={20} />

          <input
            autoFocus
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search printing services..."
            aria-label="Search printing services"
          />

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSearchOpen(false);
            }}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            MBEYA / PRINT SYSTEM 01
          </div>

          <h1>
            PRINT
            <br />
            <span>WITHOUT</span>
            <br />
            LIMITS<span className="lime">.</span>
          </h1>

          <p>
            Premium paper printing, document processing and cyber
            services designed for people, businesses, students and
            institutions.
          </p>

          <div className="hero-buttons">
            <a href="#print" className="button button-primary">
              EXPLORE SERVICES
              <ArrowDownRight size={18} />
            </a>

            <a href="#upload" className="button button-outline">
              UPLOAD A DOCUMENT
              <Upload size={17} />
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>01</strong>
              <span>PRINT</span>
            </div>

            <div>
              <strong>02</strong>
              <span>CYBER</span>
            </div>

            <div>
              <strong>03</strong>
              <span>DELIVER</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" />

          <div className="paper-column column-one">
            {[...images, ...images].map((image, index) => (
              <div
                className="floating-paper"
                key={`one-${index}`}
              >
                <img
                  src={image}
                  alt="Printed paper product"
                />

                <span>MBEYA / PRINT</span>
              </div>
            ))}
          </div>

          <div className="paper-column column-two">
            {[
              ...images.slice(3),
              ...images,
              ...images.slice(0, 3),
            ].map((image, index) => (
              <div
                className="floating-paper"
                key={`two-${index}`}
              >
                <img
                  src={image}
                  alt="Printed paper product"
                />

                <span>DOCUMENT / SYSTEM</span>
              </div>
            ))}
          </div>

          <div className="paper-column column-three">
            {[
              ...images.slice(6),
              ...images,
              ...images.slice(0, 6),
            ].map((image, index) => (
              <div
                className="floating-paper"
                key={`three-${index}`}
              >
                <img
                  src={image}
                  alt="Printed paper product"
                />

                <span>PAPER / OBJECT</span>
              </div>
            ))}
          </div>

          <div className="visual-label label-top">
            PAPER / 001
          </div>

          <div className="visual-label label-bottom">
            DIGITAL / 002
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SERVICES
          ========================================================= */}

      <section className="quick-services">
        {[
          ["PRINT A DOCUMENT", FileText],
          ["PHOTOCOPY", Copy],
          ["SCAN", CloudUpload],
          ["BIND", Layers3],
          ["LAMINATE", ShieldCheck],
          ["CYBER SERVICE", Sparkles],
          ["GET A QUOTE", Send],
        ].map(([label, Icon]) => {
          const ServiceIcon =
            Icon as typeof FileText;

          return (
            <a href="#services" key={String(label)}>
              <ServiceIcon size={17} />
              {String(label)}
              <ArrowRight size={14} />
            </a>
          );
        })}
      </section>

      {/* =========================================================
          INTRO
          ========================================================= */}

      <section className="intro-section">
        <div className="section-number">/ 001</div>

        <div>
          <div className="eyebrow">
            THE MBEYA SYSTEM
          </div>

          <h2>
            EVERYTHING
            <br />
            <span>PAPER.</span>
          </h2>
        </div>

        <div className="intro-text">
          <p>
            From the first document to the final printed page,
            Mbeya brings professional printing and digital
            assistance together under one roof.
          </p>

          <a href="#print" className="text-link">
            EXPLORE THE PAPER LIBRARY
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* =========================================================
          PRINT LIBRARY
          ========================================================= */}

      <section className="paper-library" id="print">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              PRINT / CATALOGUE
            </div>

            <h2>THE PAPER LIBRARY</h2>
          </div>

          <p>
            Choose a service, configure your requirements and
            send your order to Mbeya.
          </p>
        </div>

        <div className="filter-row">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="service-grid" id="services">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <article
                className="service-card"
                key={service.title}
              >
                <div className="service-image">
                  <img
                    src={service.image}
                    alt={service.title}
                  />

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    aria-label={`Open ${service.title}`}
                  >
                    <ArrowUpRight />
                  </button>
                </div>

                <div className="service-meta">
                  <div>
                    <span>{service.category}</span>
                    <h3>{service.title}</h3>
                  </div>

                  <strong>{service.price}</strong>
                </div>

                <p>{service.description}</p>
              </article>
            ))
          ) : (
            <div className="no-results">
              <Search size={28} />
              <h3>No services found</h3>
              <p>
                Try another search term or select a different
                category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CONFIGURATOR
          ========================================================= */}

      <section className="configurator">
        <div className="config-copy">
          <div className="eyebrow">
            PRINT / CONFIGURE
          </div>

          <h2>
            BUILD
            <br />
            YOUR
            <br />
            PRINT<span className="lime">.</span>
          </h2>

          <p>
            Configure a basic print job and get an instant
            estimated price. Final pricing can be confirmed by
            Mbeya before production.
          </p>
        </div>

        <div className="config-panel">
          <div className="config-header">
            <span>PRINT CONFIGURATOR</span>
            <span>LIVE ESTIMATE</span>
          </div>

          <div className="config-field">
            <label htmlFor="product">
              PRODUCT
            </label>

            <div className="select-like" id="product">
              DOCUMENT PRINTING
              <ChevronDown size={17} />
            </div>
          </div>

          <div className="config-two">
            <div className="config-field">
              <label htmlFor="paper">
                PAPER
              </label>

              <select
                id="paper"
                value={paper}
                onChange={(event) =>
                  setPaper(event.target.value)
                }
              >
                <option>Standard</option>
                <option>Premium</option>
                <option>Glossy</option>
              </select>
            </div>

            <div className="config-field">
              <label htmlFor="colour">
                COLOUR
              </label>

              <select
                id="colour"
                value={colour}
                onChange={(event) =>
                  setColour(event.target.value)
                }
              >
                <option>Black &amp; White</option>
                <option>Colour</option>
              </select>
            </div>
          </div>

          <div className="config-two">
            <div className="config-field">
              <label htmlFor="finish">
                FINISH
              </label>

              <select
                id="finish"
                value={finish}
                onChange={(event) =>
                  setFinish(event.target.value)
                }
              >
                <option>None</option>
                <option>Lamination</option>
                <option>Binding</option>
              </select>
            </div>

            <div className="config-field">
              <label>QUANTITY</label>

              <div className="quantity">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="estimate">
            <span>ESTIMATED PRICE</span>
            <strong>
              KSh {estimate.toLocaleString("en-KE")}
            </strong>
          </div>

          <a
            href="#upload"
            className="button button-primary full"
          >
            CONTINUE TO UPLOAD
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* =========================================================
          UPLOAD
          ========================================================= */}

      <section className="upload-section" id="upload">
        <div className="upload-inner">
          <div>
            <div className="eyebrow">
              UPLOAD / PRINT
            </div>

            <h2>
              GOT A
              <br />
              FILE<span className="lime">?</span>
            </h2>

            <p>
              Send your document to Mbeya and tell us exactly
              what you need.
            </p>
          </div>

          <label className="upload-box">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(event) =>
                setUploaded(
                  event.target.files?.[0]?.name || ""
                )
              }
            />

            <CloudUpload size={42} />

            <strong>
              {uploaded || "DROP YOUR FILE HERE"}
            </strong>

            <span>
              PDF &middot; DOCX &middot; JPG &middot; PNG
            </span>

            <small>
              Click to browse your computer
            </small>
          </label>
        </div>

        <div className="upload-options">
          <div>
            <span>SERVICE</span>
            <strong>PRINT</strong>
          </div>

          <div>
            <span>COLOUR</span>
            <strong>{colour}</strong>
          </div>

          <div>
            <span>QUANTITY</span>
            <strong>{quantity}</strong>
          </div>

          <div>
            <span>FINISH</span>
            <strong>{finish}</strong>
          </div>

          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            SEND TO MBEYA
            <Send size={17} />
          </a>
        </div>
      </section>

      {/* =========================================================
          CYBER
          ========================================================= */}

      <section className="cyber-section" id="cyber">
        <div className="cyber-grid">
          <div className="cyber-copy">
            <div className="eyebrow">
              DIGITAL / SERVICES 002
            </div>

            <h2>
              YOUR
              <br />
              DIGITAL
              <br />
              DESK<span className="lime">.</span>
            </h2>

            <p>
              Need more than printing? Mbeya also provides
              practical cyber and online document assistance.
            </p>

            <div className="cyber-terminal">
              <span className="terminal-dot" />
              <span>MBEYA DIGITAL SERVICES</span>
              <span className="terminal-status">
                ONLINE
              </span>
            </div>
          </div>

          <div className="cyber-services">
            {cyberServices.map(
              (service, index) => (
                <a
                  href="#contact"
                  className="cyber-card"
                  key={service.title}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <ArrowUpRight />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
          ========================================================= */}

      <section
        className="process-section"
        id="process"
      >
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              THE PROCESS
            </div>

            <h2>FROM IDEA TO PAPER.</h2>
          </div>

          <p>
            A simple workflow built to make printing less
            complicated.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map(
            ([number, title, text]) => (
              <div
                className="process-card"
                key={number}
              >
                <span>{number}</span>

                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <ArrowRight size={17} />
              </div>
            )
          )}
        </div>
      </section>

      {/* =========================================================
          EXPRESS
          ========================================================= */}

      <section className="express">
        <div className="express-number">
          / 003
        </div>

        <div className="express-content">
          <div className="eyebrow">
            EXPRESS PRINT
          </div>

          <h2>
            NEED IT
            <br />
            <span>NOW?</span>
          </h2>

          <p>
            When timing matters, tell us your deadline and we
            will confirm the fastest available production
            option.
          </p>

          <a
            href="#contact"
            className="button button-light"
          >
            REQUEST EXPRESS PRINT
            <Zap size={17} />
          </a>
        </div>

        <div className="speed-lines">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>

      {/* =========================================================
          BUSINESS
          ========================================================= */}

      <section
        className="business-section"
        id="business"
      >
        <div className="business-copy">
          <div className="eyebrow">
            BUSINESS / CORPORATE
          </div>

          <h2>
            YOUR BRAND.
            <br />
            YOUR PAPER.
            <br />
            CONSISTENTLY.
          </h2>

          <p>
            Professional printing for companies, schools,
            institutions, events and organizations that need
            reliable documents at scale.
          </p>

          <a
            href="#contact"
            className="text-link"
          >
            REQUEST A BUSINESS QUOTE
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="business-list">
          {businessServices.map(
            (item, index) => (
              <div key={item}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{item}</strong>

                <ArrowUpRight size={17} />
              </div>
            )
          )}
        </div>
      </section>

      {/* =========================================================
          TRACKING
          ========================================================= */}

      <section className="tracking-section">
        <div className="tracking-copy">
          <div className="eyebrow">
            ORDER / TRACKING
          </div>

          <h2>
            KNOW
            <br />
            WHERE IT
            <br />
            IS<span className="lime">.</span>
          </h2>

          <p>
            Enter your order reference to check its current
            production stage.
          </p>
        </div>

        <div className="tracking-panel">
          <div className="tracking-input">
            <Package size={19} />

            <input
              placeholder="MBY-00000"
              aria-label="Order reference"
            />

            <button type="button">
              TRACK
            </button>
          </div>

          <div className="tracking-line">
            <div className="tracking-step active">
              <Check size={15} />
              <span>REQUEST</span>
            </div>

            <div className="tracking-step active">
              <Check size={15} />
              <span>VERIFIED</span>
            </div>

            <div className="tracking-step current">
              <Printer size={15} />
              <span>PRINTING</span>
            </div>

            <div className="tracking-step">
              <Layers3 size={15} />
              <span>FINISHING</span>
            </div>

            <div className="tracking-step">
              <Check size={15} />
              <span>READY</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CUSTOM QUOTE
          ========================================================= */}

      <section className="quote-section">
        <div>
          <div className="eyebrow">
            CUSTOM REQUEST
          </div>

          <h2>
            CAN&apos;T FIND
            <br />
            WHAT YOU
            <br />
            NEED<span className="lime">?</span>
          </h2>
        </div>

        <div className="quote-form">
          <div className="form-row">
            <input
              placeholder="Your name"
              aria-label="Your name"
            />

            <input
              placeholder="Phone number"
              aria-label="Phone number"
            />
          </div>

          <div className="form-row">
            <input
              placeholder="What do you need printed?"
              aria-label="What do you need printed?"
            />

            <input
              placeholder="Quantity"
              aria-label="Quantity"
            />
          </div>

          <textarea
            placeholder="Tell us about your requirements..."
            aria-label="Your requirements"
          />

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              "Hello Mbeya Printing & Cyber Services. I would like to request a custom printing quote."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            REQUEST A QUOTE
            <Send size={17} />
          </a>
        </div>
      </section>

      {/* =========================================================
          FAQ
          ========================================================= */}

      <section className="faq-section">
        <div className="faq-heading">
          <div className="eyebrow">
            FAQ / SUPPORT
          </div>

          <h2>
            QUESTIONS.
            <br />
            ANSWERED.
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              className="faq-item"
              key={item.question}
            >
              <button
                type="button"
                onClick={() =>
                  setFaq(
                    faq === index ? null : index
                  )
                }
                aria-expanded={faq === index}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{item.question}</strong>

                <ChevronDown
                  className={
                    faq === index
                      ? "rotate"
                      : ""
                  }
                  size={20}
                />
              </button>

              {faq === index && (
                <p>{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          CTA
          ========================================================= */}

      <section className="cta-section">
        <div className="cta-orbit orbit-one" />
        <div className="cta-orbit orbit-two" />

        <div className="eyebrow">
          MBEYA / PRINTING & CYBER
        </div>

        <h2>
          PAPER MEETS
          <br />
          <span>POSSIBILITY.</span>
        </h2>

        <p>
          Bring us your document, design, idea or digital
          task.
        </p>

        <div className="hero-buttons">
          <a
            href="#upload"
            className="button button-primary"
          >
            START AN ORDER
            <ArrowRight size={17} />
          </a>

          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="button button-outline"
          >
            <MessageCircle size={17} />
            CHAT WITH US
          </a>
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}

      <footer id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark">
                M
              </span>

              <span>
                <strong>MBEYA</strong>
                <small>
                  PRINTING & CYBER
                </small>
              </span>
            </div>

            <p>
              Premium printing, paper services and cyber
              assistance.
            </p>
          </div>

          <div className="footer-column">
            <span>PRINT</span>

            <a href="#print">
              Business Cards
            </a>

            <a href="#print">
              Flyers
            </a>

            <a href="#print">
              Certificates
            </a>

            <a href="#print">
              Brochures
            </a>

            <a href="#print">
              Documents
            </a>
          </div>

          <div className="footer-column">
            <span>CYBER</span>

            <a href="#cyber">
              eCitizen
            </a>

            <a href="#cyber">
              KRA
            </a>

            <a href="#cyber">
              NTSA
            </a>

            <a href="#cyber">
              HELB
            </a>

            <a href="#cyber">
              Online Services
            </a>
          </div>

          <div className="footer-column">
            <span>CONTACT</span>

            <a href="tel:+254700000000">
              +254 700 000 000
            </a>

            <a href="mailto:info@mbeyaprinting.co.ke">
              info@mbeyaprinting.co.ke
            </a>

            <span className="footer-location">
              Kenya
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 MBEYA PRINTING & CYBER SERVICES
          </span>

          <span>
            BUILT FOR PAPER / BUILT FOR PEOPLE
          </span>
        </div>
      </footer>

      {/* =========================================================
          WHATSAPP
          ========================================================= */}

      <a
        href={`https://wa.me/?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp"
        aria-label="Chat with Mbeya"
      >
        <MessageCircle size={19} />
        <span>CHAT WITH MBEYA</span>
      </a>
    </main>
  );
}