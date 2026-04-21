export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <p>
          Copyright &copy; 2025 <span>Unsha Sattar</span>. All rights reserved.
        </p>
        <p style={{ marginTop: '4px', fontSize: '0.78rem' }}>
          Built with passion and lots of coffee.
        </p>
      </div>
      <div className="footer-socials">
        <a href="#" title="GitHub"><i className="fa-brands fa-github"></i></a>
        <a href="#" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" title="Twitter"><i className="fa-brands fa-twitter"></i></a>
        <a href="#" title="Facebook"><i className="fa-brands fa-facebook"></i></a>
      </div>
    </footer>
  );
}