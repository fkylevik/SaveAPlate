function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} SaveAPlate. All rights reserved.</p>
            <nav>
                <a href="/about">About Us</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/contact">Contact Us</a>
            </nav>
        </footer>
    );
}


export default Footer;