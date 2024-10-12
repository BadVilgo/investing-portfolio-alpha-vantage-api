// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

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
          <div className="col-md-6">
            <h1>Empower Your Investment Journey</h1>
            <p className="lead">
              Seamlessly track and manage your stock portfolio with our
              intuitive dashboard.
            </p>
            <Link to="/dashboard" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Dashboard Preview"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section container text-white my-5">
        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Feature 1"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h3>Real-Time Tracking</h3>
            <p>Get up-to-the-minute updates on your portfolio's performance.</p>
          </div>
        </div>
        {/* Other feature sections omitted for brevity */}
      </div>

      {/* Q&A Section */}
      <div className="faq-section container my-5 text-white">
        <h2 className="text-center">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
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
          {/* Additional questions can be added here */}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container my-5 text-center text-white">
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
