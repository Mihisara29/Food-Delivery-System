import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-sm bg-white">
              <h2 className="text-center mb-4">Get in Touch</h2>
              <form 
                action="https://formsubmit.co/induwaramihisara@gmail.com" 
                method="POST"
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      name="firstName" 
                      className="form-control custom-input" 
                      placeholder="First Name" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      name="lastName" 
                      className="form-control custom-input" 
                      placeholder="Last Name" 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control custom-input" 
                      placeholder="Email Address" 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <textarea 
                      name="message" 
                      className="form-control custom-input" 
                      rows="5" 
                      placeholder="Your Message" 
                      required 
                    ></textarea>
                  </div>

                  {/* Hidden options for better behavior */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New message from portfolio contact form!" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
