import React from 'react';
import '../styles/footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__info">
        <div className="footer__founder">
          Founder: Smt. Jayashree Vinayak Hegde
        </div>
        <div className="footer__location">
          Location: Hegdekatta, Sirsi(U.K)-Karnataka-581403
        </div>
        <div className="footer__contact">
          <div>Phone: 944999918 / 8660669943</div>
          <div>Email: <a href="mailto:vinjai79@gmail.com">vinjai79@gmail.com</a></div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
