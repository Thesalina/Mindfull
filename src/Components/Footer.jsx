export default function Footer() {
  return (
    <footer className="bg-mint-light text-purple-800 py-4 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* Links Section */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
          <a 
            href="#"
            className="hover:text-purple-600 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="#"
            className="hover:text-purple-600 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a 
            href="#"
            className="hover:text-purple-600 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm mt-2 md:mt-0">
          &copy; 2025 Mindful. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
