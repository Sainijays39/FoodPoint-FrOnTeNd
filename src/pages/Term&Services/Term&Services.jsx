import React from 'react';
import './Term&Services.css'; 
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="privacy-policy-container" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Terms of Service – FoodPoint Cafe</h1>
      <p><strong>Effective Date:</strong> 10 October 2025</p>

      <p>By accessing or using <strong>FoodPoint Cafe</strong> website and services, you agree to the following terms:</p>

      <h2>1. Use of Services</h2>
      <ul>
        <li>You must be 18 years or older to place orders.</li>
        <li>You agree to provide accurate and complete information during account creation and checkout.</li>
        <li>You are responsible for maintaining the confidentiality of your account login credentials.</li>
      </ul>

      <h2>2. Orders and Payments</h2>
      <ul>
        <li>All orders are subject to availability.</li>
        <li>Payment is processed securely via Razorpay or other authorized payment gateways.</li>
        <li>We do not store your card details.</li>
        <li>Prices, taxes, and delivery fees may vary and are displayed at checkout.</li>
      </ul>

      <h2>3. Delivery and Cancellation</h2>
      <ul>
        <li>Delivery times are estimates and may vary.</li>
        <li>You can not cancel orders after once you placed order.</li>
        <li>Refunds, if applicable, will follow our payment gateway policies.</li>
      </ul>

      <h2>4. User Conduct</h2>
      <ul>
        <li>You agree not to use the site for illegal purposes.</li>
        <li>You agree not to interfere with website functionality.</li>
        <li>You agree not to attempt unauthorized access to other accounts or systems.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>All content on the website, including logos, images, and text, is owned by <strong>FoodPoint Cafe</strong> or used with permission. You may not copy, reproduce, or distribute content without our written consent.</p>

      <h2>6. Limitation of Liability</h2>
      <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of the website. We strive to ensure accurate information but do not guarantee that the website is error-free at all times.</p>

      <h2>7. Changes to Terms</h2>
      <p>We may update these Terms of Service at any time. Updates will be posted on this page with the effective date. Continued use of the website constitutes acceptance of updated terms.</p>

      <h2>8. Contact Us</h2>
      <p>
        For questions or concerns about these terms, contact us at:<br/>
        Email: <strong>support@foodpoint.com</strong><br/>
        Phone: +91-8239304047
      </p>

      <button><Link to="/">Back to Home</Link></button>
    </div>
  );
};

export default TermsOfService;
