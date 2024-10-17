import React from "react";
import "./Dashboard.css";

function ContactUs() {
  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h2 className="text-center mb-4">Get in Touch with Us</h2>
        <p className="text-center mb-5">
          Have questions or feedback? We'd love to hear from you. Fill out the
          form below and we'll get back to you as soon as possible.
        </p>
        <form
          action="https://formspree.io/f/your-form-id"
          method="POST"
          className="mx-auto w-75"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="_replyto" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              className="form-control"
              id="_replyto"
              name="_replyto"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
