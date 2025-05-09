import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-800/90 text-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} ChirpComposer</p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ekaone/chirp-composer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-yellow-300 transition-colors"
          >
            <span>GitHub</span>
          </a>
          <div className="flex items-center text-yellow-300">
            <span className="mr-1">Made with</span>
            <Heart className="h-4 w-4 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
