import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-r from-secondary to-primary py-10 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex justify-center space-x-6">
          <Link href="#" className="text-white/80 transition-colors hover:text-white" aria-label="GitHub">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-white/80 transition-colors hover:text-white" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-white/80 transition-colors hover:text-white" aria-label="Twitter">
            <Twitter className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} LearNova. Empowering minds through quality education.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
