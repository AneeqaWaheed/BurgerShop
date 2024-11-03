import React from "react";
import "../styles/contact.css";
const ContactForm = () => {
  return (
    <>
      <div className="overflow-x-hidden story-container my-4">
        <div className="story-img">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2274330387!2d74.00471844300722!3d31.483103656420948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1730634625829!5m2!1sen!2s"
            height={450}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="story-para bg-dark">
          <h1 className="text-white story-heading underlined-heading fs-2">
            Contact Us
          </h1>
          <form className=" contact-form">
            <div className="mb-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlTextarea1"
                className="text-white mb-2"
              >
                Your Message
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-danger mt-2 fw-bold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
