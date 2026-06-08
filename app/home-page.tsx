"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";

type IconName =
  | "arrow"
  | "heart"
  | "leaf"
  | "menu"
  | "search"
  | "shield"
  | "sparkle"
  | "whatsapp"
  | "x";

const heroSlides = [
  {
    eyebrow: "Made slowly. Savoured fully.",
    title: "Andhra flavours,\nmade like home.",
    description:
      "Small-batch pickles, podis and snacks crafted from family recipes and ingredients we know by name.",
    cta: "Explore the pantry",
  },
  {
    eyebrow: "From our family kitchen",
    title: "Tradition bottled\nwith care.",
    description:
      "Sun-cured mangoes, hand-ground spices and no shortcuts. Just honest food with a story in every spoonful.",
    cta: "Discover our story",
  },
];

const categories = [
  {
    title: "Pickles",
    subtitle: "Bold, traditional flavours",
    position: "25% 18%",
    className: "category-card--large",
    query: "pickle mango avakaya lemon",
  },
  {
    title: "Podis",
    subtitle: "Everyday blends",
    position: "78% 15%",
    query: "podi powder spice curry leaf",
  },
  {
    title: "Sweets",
    subtitle: "Festive favourites",
    position: "78% 82%",
    query: "sweet laddu festive",
  },
  {
    title: "Snacks",
    subtitle: "Crisp savoury bites",
    position: "20% 82%",
    query: "snack murukku savoury",
  },
];

const products = [
  {
    name: "Andhra Avakaya",
    detail: "Fiery mango pickle",
    price: "₹299",
    position: "20% 16%",
    tag: "Bestseller",
  },
  {
    name: "Karivepaku Podi",
    detail: "Aromatic curry leaf blend",
    price: "₹189",
    position: "78% 16%",
    tag: "Everyday",
  },
  {
    name: "Festive Laddu Box",
    detail: "Hand-rolled with pure ghee",
    price: "₹449",
    position: "78% 84%",
    tag: "Limited",
  },
  {
    name: "Classic Murukku",
    detail: "Golden, crisp and savoury",
    price: "₹229",
    position: "18% 84%",
    tag: "Fresh batch",
  },
];

const footerLinks = {
  Explore: ["Our story", "Shop all", "Journal", "Contact"],
  Help: ["Shipping", "Returns", "FAQs", "Privacy"],
};

const reveal = {
  hidden: { opacity: 0, y: 34, scale: 0.985, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

function Icon({
  name,
  size = 22,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    leaf: (
      <>
        <path d="M20.8 3.4C13.4 3.2 6.1 5.7 4 12.1c-1 3.1.5 6.1 3.2 7.1 3.8 1.4 7.5-1.1 9.4-4.5 2.1-3.7 2.7-7.6 4.2-11.3Z" />
        <path d="M4.6 20.6c2.4-4.3 6.2-7.8 11.3-10.2" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
        <path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
        <path d="M8.2 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.8 1.8c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4 0 .7.7 1.2 1.6 2.1 2.8 2.7.3.2.5.1.7-.1l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.2.4.3.4.5 0 .3-.2 1.5-.9 2.1-.6.5-1.4.8-2.2.6-1-.2-2.8-.8-4.8-2.6-1.6-1.4-2.7-3.2-3-4.3-.3-1.1 0-2 .3-2.5Z" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand--light" : ""}`} href="#home">
      <span className="brand-mark">V</span>
      <span>
        <strong>Vabhaa</strong>
        <small>FOODS</small>
      </span>
    </a>
  );
}

function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % heroSlides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return categories;
    return categories.filter((category) =>
      `${category.title} ${category.subtitle} ${category.query}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main id="home">
        <div className="announcement">
          <p>Free shipping on orders above ₹799</p>
          <span>Fresh batches dispatched every week</span>
        </div>

        <header className="site-header">
          <div className="shell header-inner">
            <button
              className="icon-button menu-button"
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? "x" : "menu"} />
            </button>

            <BrandMark />

            <nav
              className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`}
            >
              {["Categories", "Our story", "Shop", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace("our story", "about").replace("shop", "products")}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="header-actions">
              <a
                className="icon-button"
                href="#"
                aria-label="Search products"
              >
                <Icon name="search" />
              </a>
              <a
                className="whatsapp-button"
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with vabhaa Foods on WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        <section
          className="hero"
          aria-roledescription="carousel"
          aria-label="Featured collections"
        >
          <Image
            className="hero-image"
            src="/images/hero-andhra-pantry.png"
            alt="Handcrafted Andhra pickles, spice powders, and fresh ingredients"
            fill
            priority
            sizes="100vw"
          />

          <div className="hero-overlay" />

          <div className="shell hero-inner">
            <AnimatePresence mode="wait">
              <motion.div
                className="hero-copy"
                key={slide}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
              >
                <motion.p
                  className="eyebrow eyebrow--light"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.25 },
                    },
                  }}
                >
                  {heroSlides[slide].eyebrow}
                </motion.p>

                <motion.h1
                  variants={{
                    hidden: {},
                    visible: {},
                    exit: {},
                  }}
                >
                  {heroSlides[slide].title.split("\n").map((line, index) => (
                    <motion.span
                      key={line}
                      style={{ display: "block" }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -15,
                          transition: { duration: 0.25 },
                        },
                      }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  className="hero-description"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.25 },
                    },
                  }}
                >
                  {heroSlides[slide].description}
                </motion.p>

                <motion.a
                  className="button button--cream"
                  href={slide === 0 ? "#categories" : "#about"}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.25 },
                    },
                  }}
                >
                  {heroSlides[slide].cta}
                  <Icon name="arrow" size={19} />
                </motion.a>
              </motion.div>
            </AnimatePresence>

            <div className="slider-controls">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={
                    index === slide
                      ? "slider-dot slider-dot--active"
                      : "slider-dot"
                  }
                  onClick={() => setSlide(index)}
                  aria-label={`Show slide ${index + 1}: ${item.title.replace(
                    "\n",
                    " ",
                  )}`}
                  aria-current={index === slide}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Our promises">
          <div className="shell trust-grid">
            {[
              ["heart", "Quality ingredients"],
              ["shield", "Traditional recipes"],
              ["sparkle", "No added preservatives"],
            ].map(([icon, label]) => (
              <div key={label} className="trust-item">
                <Icon name={icon as IconName} size={25} />
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={reveal}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {label}
                </motion.span>
              </div>
            ))}
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="shell">
            <TextReveal className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">A pantry full of stories</p>
                <h2>Explore by category</h2>
              </div>
              <p>
                Familiar flavours, prepared in thoughtful small batches for
                everyday meals and generous tables.
              </p>
            </TextReveal>

            <div className="category-search">
              <Icon name="search" size={24} />
              <label className="sr-only" htmlFor="category-search">
                Search food categories
              </label>
              <input
                id="category-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pickles, podis, sweets..."
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <Icon name="x" size={18} />
                </button>
              )}
            </div>

            <motion.div layout className="category-grid">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((category, index) => (
                  <motion.a
                    layout
                    key={category.title}
                    href="#products"
                    className={`category-card ${category.className ?? ""}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -7 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <Image
                      src="/images/food-collection.png"
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      style={{
                        objectPosition: category.position,
                        transformOrigin: category.position,
                      }}
                    />
                    <span className="card-shade" />
                    <motion.span
                      className="category-copy"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.65 }}
                      variants={reveal}
                      transition={{
                        duration: 0.72,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <strong>{category.title}</strong>
                      <span>{category.subtitle}</span>
                    </motion.span>
                    <span className="round-arrow">
                      <Icon name="arrow" size={18} />
                    </span>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
            {filteredCategories.length === 0 && (
              <p className="empty-state">
                No category found for “{query}”. Try pickle, podi, sweets, or
                snacks.
              </p>
            )}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="shell about-grid">
            <div className="about-image-wrap">
              <Image
                src="/images/about-pickle-making.png"
                alt="Traditional mango pickle being prepared by hand in a brass bowl"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className="about-stamp">
                <span>Small batch</span>
                <strong>Made with care</strong>
              </div>
            </div>
            <TextReveal className="about-copy" delay={0.1}>
              <p className="eyebrow">Rooted in home</p>
              <h2>Recipes that remember where they came from.</h2>
              <p>
                vabhaa began with the aromas of a family kitchen in coastal
                Andhra: mangoes drying in the sun, spices roasting slowly, and
                jars lined up for the season ahead.
              </p>
              <p>
                We still make food with that same patience. Every batch is
                prepared in small quantities using trusted ingredients and
                time-honoured methods.
              </p>
              <div className="about-values">
                <span>
                  <Icon name="leaf" size={20} /> Responsibly sourced
                </span>
                <span>
                  <Icon name="heart" size={20} /> Family recipes
                </span>
              </div>
              <a className="text-link" href="#contact">
                Meet the family behind vabhaa <Icon name="arrow" size={18} />
              </a>
            </TextReveal>
          </div>
        </section>

        <section className="section product-section" id="products">
          <div className="shell">
            <TextReveal className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">From this week’s kitchen</p>
                <h2>Food worth passing around</h2>
              </div>
              <a className="text-link desktop-only" href="#contact">
                View all products <Icon name="arrow" size={18} />
              </a>
            </TextReveal>
            <div className="product-grid">
              {products.map((product, index) => (
                <div className="product-card" key={product.name}>
                  <a
                    className="product-image"
                    href="#contact"
                    aria-label={`Enquire about ${product.name}`}
                  >
                    <Image
                      src="/images/food-collection.png"
                      alt={product.name}
                      fill
                      sizes="(max-width: 600px) 50vw, 25vw"
                      style={{
                        objectPosition: product.position,
                        transformOrigin: product.position,
                      }}
                    />
                    <span className="product-tag">{product.tag}</span>
                    <span className="product-arrow">
                      <Icon name="arrow" size={18} />
                    </span>
                  </a>
                  <TextReveal className="product-info" delay={index * 0.07}>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.detail}</p>
                    </div>
                    <strong>{product.price}</strong>
                  </TextReveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-grid">
            <TextReveal className="contact-copy">
              <p className="eyebrow eyebrow--light">Let’s talk food</p>
              <h2>Planning a feast or looking for something special?</h2>
              <p>
                Message us for bulk orders, gifting, custom hampers, or help
                choosing the right flavours for your table.
              </p>
              <a
                className="button button--whatsapp"
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" size={21} />
                Chat on WhatsApp
              </a>
            </TextReveal>

            <div className="contact-card">
              {submitted ? (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span>
                    <Icon name="heart" size={28} />
                  </span>
                  <h3>Thank you!</h3>
                  <p>
                    We’ve received your note and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      Your name
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Full name"
                      />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="+91 98765 43210"
                      />
                    </label>
                  </div>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </label>
                  <label>
                    How can we help?
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us what you’re looking for..."
                    />
                  </label>
                  <button className="button button--dark" type="submit">
                    Send enquiry <Icon name="arrow" size={19} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="shell">
            <div className="footer-grid">
              <TextReveal className="footer-brand">
                <BrandMark light />
                <p>
                  Honest Andhra food, made in small batches and shared with
                  warmth.
                </p>
                <a href="mailto:hello@vabhaafoods.com">hello@vabhaafoods.com</a>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </TextReveal>
              {Object.entries(footerLinks).map(([heading, links], index) => (
                <TextReveal
                  className="footer-links"
                  key={heading}
                  delay={index * 0.06}
                >
                  <h3>{heading}</h3>
                  {links.map((link) => (
                    <a href="#home" key={link}>
                      {link}
                    </a>
                  ))}
                </TextReveal>
              ))}
              <TextReveal className="newsletter" delay={0.12}>
                <p className="eyebrow eyebrow--light">Join the table</p>
                <h3>Recipes, new batches, and a little kitchen news.</h3>
                <form onSubmit={(event) => event.preventDefault()}>
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to our newsletter"
                  >
                    <Icon name="arrow" size={19} />
                  </button>
                </form>
              </TextReveal>
            </div>
            <div className="footer-bottom">
              <p>
                © {new Date().getFullYear()} vabhaa Foods. Made with care in
                Andhra Pradesh.
              </p>
              <div>
                <a href="#home">Instagram</a>
                <a href="#home">Facebook</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
