// frontend/src/components/common/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'; // React Icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-starnox-dark text-starnox-text-light py-8 mt-auto border-t border-starnox-primary shadow-inner">
      <div className="container mx-auto px-4">
        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Section 1: StarNox Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-starnox-secondary mb-3 font-hero tracking-wide">StarNox</h3>
            <p className="text-sm leading-relaxed">
              Your ultimate destination for superhero-themed apparel and more!
            </p>
            <p className="text-xs mt-3">
              &copy; {currentYear} StarNox. All rights reserved.
            </p>
            <p className="text-xs">
              Made with <span role="img" aria-label="heart">❤️</span> for a better shopping experience.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold text-starnox-light mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200 text-sm">About Us</a></li>
              <li><a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200 text-sm">Contact</a></li>
              <li><a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200 text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Section 3: Get In Touch */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold text-starnox-light mb-3">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p>Email: <a href="mailto:support@starnox.com" className="hover:text-starnox-secondary">support@starnox.com</a></p>
              <p>Phone: <a href="tel:+11234567890" className="hover:text-starnox-secondary">+1 (123) 456-7890</a></p>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-4 text-2xl">
              <a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200"><FaFacebook /></a>
              <a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200"><FaInstagram /></a>
              <a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200"><FaTwitter /></a>
              <a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200"><FaLinkedin /></a>
              <a href="#" className="text-starnox-text-light hover:text-starnox-secondary transition-colors duration-200"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-6 border-t border-starnox-primary text-center">
          <h4 className="text-lg font-semibold text-starnox-light mb-3">Stay Connected!</h4>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates, exclusive offers, and superhero news!</p>
          <form className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Your Email *"
              className="p-3 rounded-lg border border-starnox-primary bg-starnox-dark text-starnox-text-light focus:outline-none focus:ring-2 focus:ring-starnox-secondary w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-starnox-primary hover:bg-starnox-secondary text-starnox-text-light hover:text-starnox-dark font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-hero-glow focus:outline-none focus:ring-2 focus:ring-starnox-secondary focus:ring-opacity-75 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-8 pt-4 text-center text-xs text-starnox-text-light opacity-80">
          <p>Designed with passion by the StarNox Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;