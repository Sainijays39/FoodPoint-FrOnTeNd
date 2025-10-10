import React from 'react';
import './Cancelation.css';
import { Link } from 'react-router-dom';

const CancellationRefund = () => {
  return (
    <div className='privacy-policy-container' style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Cancellation & Refund Policy – FoodPoint Cafe</h1>
      <p><strong>Effective Date:</strong> 10 October 2025</p>

      <h2>Order Cancellation</h2>
      <p>
        Once an order is placed, it <strong>cannot be canceled</strong>. 
        Please review your order carefully before confirming the payment.
      </p>

      <h2>Refund Policy</h2>
      <p>
        We strive to ensure all orders are delivered accurately and on time. 
        Refunds will only be issued in case of:
      </p>
      <ul>
        <li>Technical errors in payment processing (e.g., double charges)</li>
        <li>Incorrect or missing items in the delivered order</li>
        <li>Orders not delivered due to our fault</li>
      </ul>
      <p>
        If a refund is applicable, please contact us at <strong>support@foodpoint.com</strong> within 24 hours of delivery. 
        Refunds will be processed through the original payment method.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any concerns regarding your order, contact us at:<br/>
        Email: <strong>support@foodpoint.com</strong><br/>
        Phone: +91-8239304047
      </p>

      <button><Link to="/">Back to Home</Link></button>
    </div>
  );
};

export default CancellationRefund;
