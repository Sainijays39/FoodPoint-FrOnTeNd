// src/pages/PrivacyPolicy.jsx
import React from 'react';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Privacy Policy – FoodPoint Cafe</h1>
      <p><strong>Effective Date:</strong> 10 October 2025</p>

      <p>At <strong>FoodPoint Cafe</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email, phone number, and delivery address.</li>
        <li><strong>Account Information:</strong> If you create an account, we store your username and password.</li>
        <li><strong>Payment Information:</strong> Payment details are processed securely via Razorpay; we do not store your card information.</li>
        <li><strong>Usage Information:</strong> Pages visited, orders placed, and preferences.</li>
        <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process orders and payments.</li>
        <li>Deliver food and provide customer support.</li>
        <li>Send order updates and promotions (if opted in).</li>
        <li>Improve website and services.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>We do not sell your information. We may share with:</p>
      <ul>
        <li><strong>Payment Processors:</strong> Razorpay for secure payment processing.</li>
        <li><strong>Delivery Partners:</strong> To deliver your orders efficiently.</li>
        <li><strong>Legal Authorities:</strong> If required by law or to prevent fraud.</li>
      </ul>

      <h2>4. Cookies and Tracking</h2>
      <p>We use cookies to enhance your experience, remember preferences, and analyze traffic. You can disable cookies in your browser, but some features may not work properly.</p>

      <h2>5. Data Security</h2>
      <p>We implement industry-standard security measures, including encrypted communication (HTTPS) and secure password hashing.</p>

      <h2>6. Your Rights</h2>
      <p>You can access, correct, or request deletion of your data, and opt-out of marketing communications by contacting us at <strong>support@foodpoint.com</strong>.</p>

      <h2>7. Third-Party Links</h2>
      <p>We are not responsible for third-party website privacy practices. Please review their policies separately.</p>

      <h2>8. Children’s Privacy</h2>
      <p>Our services are not directed to children under 13, and we do not knowingly collect their data.</p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>We may update this policy; updated versions will be posted on this page.</p>

      <h2>10. Contact Us</h2>
      <p>For questions, contact: <br/>
      Email: <strong>support@foodpoint.com</strong><br/>
      Phone: +91-8239304047</p>

      <button><Link to="/">Back to Home</Link></button>
    </div>
  );
};

export default PrivacyPolicy;
