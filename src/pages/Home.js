import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import dashboardImage from "../assets/images/Dashboard.jpeg";
import realTimeImage from "../assets/images/real-time-update.jpg";
import visualInsightsImage from "../assets/images/visual-insights.jpeg";
import portfolioManagementImage from "../assets/images/portfolio-management.jpeg";
import investmentAnalysis from "../assets/images/investment-analysis.jpeg";

function Home() {
  return (
    <div className="home-background">
      {/* Moving Circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>

      {/* Hero Section */}
      <div className="container text-white hero-section">
        <div className="row align-items-center min-vh-100">
          <div className="hero-copy col-md-6 order-on-mobile-2">
            <h1>Empower Your Investment Journey</h1>
            <p className="lead">
              Seamlessly track and manage your stock portfolio with our
              intuitive dashboard.
            </p>
            <Link to="/dashboard" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <div className="hero-img col-md-6 order-on-mobile-1">
            <img
              src={dashboardImage}
              alt="Dashboard Preview"
              className="hero-img img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section container text-white ">
        <div className="row align-items-center ">
          {/* Feature 1 */}
          <div className="col-md-6  feature">
            <img
              src={realTimeImage}
              alt="Real-Time Stock Updates"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 feature mb-5 mb-md-0">
            <h3>Real-Time Stock Updates</h3>
            <p>
              Keep your finger on the pulse of the market. Our platform pulls
              live data directly from reliable APIs, ensuring that your stock
              prices and portfolio values are always up to date.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="col-md-6 feature order-on-mobile-2 ">
            <h3>Effortless Portfolio Management</h3>
            <p>
              Add, remove, and update your stocks with just a few clicks. Track
              the number of shares, stock prices, and monitor the value of each
              holding with ease.
            </p>
          </div>
          <div className="col-md-6 feature order-on-mobile-1 ">
            <img
              src={visualInsightsImage}
              alt="Effortless Portfolio Management"
              className="img-fluid"
            />
          </div>

          {/* Feature 3 */}
          <div className="col-md-6 feature">
            <img
              src={portfolioManagementImage}
              alt="Visual Insights at a Glance"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 feature mb-5 mb-md-0">
            <h3>Visual Insights at a Glance</h3>
            <p>
              Get a clear view of your portfolio breakdown with a dynamic
              circular diagram. Instantly see how each stock contributes to your
              overall investment strategy.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="col-md-6 feature order-on-mobile-1 mb-5 mb-md-0">
            <h3>Personalized Investment Analysis</h3>
            <p>
              Monitor the percentage of each stock in your portfolio and make
              adjustments to maintain balance or shift your strategy as market
              conditions change.
            </p>
          </div>
          <div className="col-md-6 feature order-on-mobile-1">
            <img
              src={investmentAnalysis}
              alt="Personalized Investment Analysis"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Other feature sections omitted for brevity */}
      </div>

      {/* Q&A Section */}
      <div className="faq-section container  text-white">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion w-75" id="faqAccordion">
          {/* Question 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
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
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Use our search feature to find stocks by ticker symbol and add
                them to your portfolio.
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How does the platform calculate the value of my portfolio?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The value of your portfolio is calculated based on the current
                stock prices from our integrated API and the amount of each
                stock in your portfolio.
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Can I update the number of shares for a stock in my portfolio?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, you can easily update the number of shares for any stock by
                clicking on the stock in the table and adjusting the share
                amount.
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
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
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, we provide real-time stock data by pulling information
                directly from a reliable market API to ensure your portfolio
                reflects the most current market prices.
              </div>
            </div>
          </div>

          {/* Question 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                How do I visualize my portfolio's breakdown?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The circular diagram on the right side of the dashboard shows
                the percentage each stock contributes to your overall portfolio,
                giving you a quick visual reference.
              </div>
            </div>
          </div>

          {/* Question 6 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
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
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, you can remove any stock by selecting it in the table and
                clicking the "Remove" button, which will delete it from your
                portfolio view.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section container text-center text-white">
        <h2>Ready to Transform Your Investment Strategy?</h2>
        <p>Join us today and take control of your financial future.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Access Your Dashboard
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer mb-4">
        <div className=" d-flex justify-content-between align-items-center mx-4">
          <a href="#top" className="btn btn-link ">
            <i className="bi bi-arrow-up-circle-fill"></i> Back to Top
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
