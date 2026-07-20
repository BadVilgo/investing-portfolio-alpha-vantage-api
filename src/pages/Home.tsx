import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import { useCountUp } from "../hooks/useCountUp";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatCurrency } from "../lib/format";

const HERO_SPARK_POINTS = "0,40 20,36 40,38 60,30 80,33 100,24 120,27 140,18 160,22 180,12 200,15 220,6";

const HERO_CHIPS = [
  { ticker: "NVDA", change: "+72.8%", gain: true },
  { ticker: "AMZN", change: "+38.8%", gain: true },
  { ticker: "IBM", change: "-2.4%", gain: false },
];

const FEATURES = [
  {
    icon: "bi-lightning-charge",
    color: "feature-icon-blue",
    title: "Live prices",
    text: "Quotes and daily change pulled straight from the market, refreshed while you watch.",
  },
  {
    icon: "bi-graph-up-arrow",
    color: "feature-icon-green",
    title: "Real gain and loss",
    text: "Set what you paid and see profit on every position - green when you're up, red when you're down.",
  },
  {
    icon: "bi-pie-chart",
    color: "feature-icon-purple",
    title: "Allocation at a glance",
    text: "One chart shows where your money is concentrated, with a gentle nudge when a single stock dominates.",
  },
];

const STEPS = [
  {
    title: "Open the demo",
    text: "One click with the demo account - no signup needed.",
  },
  {
    title: "Add your stocks",
    text: "Search any ticker and set the price you paid.",
  },
  {
    title: "See the full picture",
    text: "Value, profit and allocation update live on your dashboard.",
  },
];

function HeroCard() {
  const totalValue = useCountUp(11887.2, 1200);

  return (
    <div className="hero-card fade-item fade-delay-3">
      <div className="hero-card-label">Total value</div>
      <div className="hero-card-value tabular-nums">{formatCurrency(totalValue)}</div>
      <div className="hero-card-gain tabular-nums">+$2,787.20 (+30.6%) all time</div>
      <svg
        viewBox="0 0 220 48"
        className="hero-spark"
        role="img"
        aria-label="Sample portfolio value rising over time"
      >
        <polyline
          points={HERO_SPARK_POINTS}
          pathLength={100}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="hero-chips">
        {HERO_CHIPS.map((chip) => (
          <span key={chip.ticker} className="hero-chip">
            {chip.ticker}
            <span className={chip.gain ? "chip-gain" : "chip-loss"}>{chip.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  usePageMeta(
    "Stock Dashboard - Track and Manage Your Investment Portfolio",
    "Track and manage your stock portfolio in real time. Live prices, gain and loss per holding, and a clear view of your allocation. Free demo, no signup."
  );

  useEffect(() => {
    AOS.init({
      duration: 750,
      once: true,
      mirror: false,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <div className="home-background">
      <section className="hero-dark">
        <div className="container">
          <div className="row align-items-center gy-4 py-5">
            <div className="col-lg-6">
              <span className="hero-badge fade-item fade-delay-0">
                <span className="pulse-dot" aria-hidden="true"></span>
                Live market data - free demo
              </span>
              <h1 className="hero-title fade-item fade-delay-1">
                Know what your portfolio is really worth
              </h1>
              <p className="hero-lead fade-item fade-delay-2">
                Track all your stocks in one dashboard - live prices, gain and loss on every
                position, and a clear view of where your money sits.
              </p>
              <div className="d-flex flex-wrap gap-2 fade-item fade-delay-2">
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Try the live demo
                </Link>
                <a
                  href="https://github.com/BadVilgo/investing-portfolio-2"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-lg btn-hero-ghost"
                >
                  <i className="bi bi-github" aria-hidden="true"></i> View code
                </a>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
              <HeroCard />
            </div>
          </div>
        </div>
        <div className="hero-strip">
          <div className="container d-flex flex-wrap justify-content-center gap-4">
            <span><strong>Live</strong> quotes</span>
            <span><strong>30 days</strong> of history</span>
            <span><strong>100%</strong> free demo</span>
            <span><strong>Light + dark</strong> mode</span>
          </div>
        </div>
      </section>

      <section className="container section-block" id="features" data-aos="fade-up">
        <h2 className="section-title text-center">Everything a first portfolio needs</h2>
        <div className="row g-3 mt-2">
          {FEATURES.map((feature, index) => (
            <div className="col-md-4" key={feature.title} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="app-card feature-card h-100">
                <i className={`bi ${feature.icon} ${feature.color}`} aria-hidden="true"></i>
                <h3 className="h6 mt-3 mb-2">{feature.title}</h3>
                <p className="small text-app-muted mb-0">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block" id="how-it-works" data-aos="fade-up">
        <h2 className="section-title text-center">Up and running in three steps</h2>
        <div className="row g-4 mt-2">
          {STEPS.map((step, index) => (
            <div className="col-md-4" key={step.title} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="d-flex gap-3">
                <span className="step-number">{index + 1}</span>
                <div>
                  <h3 className="h6 mb-1">{step.title}</h3>
                  <p className="small text-app-muted mb-0">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section container section-block" data-aos="fade-up">
        <h2 className="section-title text-center mb-4">Frequently asked questions</h2>
        <div className="accordion faq-accordion" id="faqAccordion">
          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                How do I add stocks to my portfolio?
              </button>
            </h3>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Use the search bar on the dashboard to find stocks by ticker or company name and
                add them to your portfolio with one click.
              </div>
            </div>
          </div>

          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How is the value of my portfolio calculated?
              </button>
            </h3>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The dashboard multiplies the number of shares you hold by the current market price
                of each stock, then adds everything up and shows how it changed over time.
              </div>
            </div>
          </div>

          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Where does the gain and loss number come from?
              </button>
            </h3>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                You set the buy price for each position. The dashboard compares it with the live
                market price and shows your profit or loss in dollars and percent.
              </div>
            </div>
          </div>

          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Is the stock data live?
              </button>
            </h3>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes. Prices and daily changes come from a live market data API, and each holding
                shows a 30-day price trend.
              </div>
            </div>
          </div>

          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Do I need an account to try it?
              </button>
            </h3>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                No. A demo account with sample data is ready on the login page, so you can explore
                the full dashboard without signing up.
              </div>
            </div>
          </div>

          <div className="accordion-item" data-aos="fade-up">
            <h3 className="accordion-header" id="headingSix">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Can I remove stocks from my portfolio?
              </button>
            </h3>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes. Every holding has a remove button, and there is an undo option in case you
                change your mind.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block" data-aos="fade-up">
        <div className="why-note">
          <p className="mb-2">
            <strong>Why I built this - </strong>
            I started investing and had no idea if I was actually making money. Spreadsheets felt
            like homework, and broker apps hide the numbers I care about. So I built a dashboard
            that answers one question honestly: how is my portfolio really doing?
          </p>
          <span className="small text-app-muted">Adam - frontend developer</span>
        </div>
      </section>

      <section className="cta-section container text-center section-block" data-aos="fade-up">
        <h2 className="section-title">Ready to see your portfolio clearly?</h2>
        <p className="text-app-muted">Open the dashboard and try it with the demo account.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Open the live demo
        </Link>
      </section>

      <footer className="footer" data-aos="fade-up">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mx-4">
          <a href="#top" className="btn btn-link">
            <i className="bi bi-arrow-up-circle-fill" aria-hidden="true"></i> Back to Top
          </a>
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <Link to="/">Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
