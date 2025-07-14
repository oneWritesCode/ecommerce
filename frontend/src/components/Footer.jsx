import React from "react";
import { Github, Twitter, Linkedin, Instagram, Mail, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[var(--dark-color)] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Name and copyright */}
        <div className="text-center md:text-left">
          <div className="text-xl font-bold mb-1">build with {"<"}3 by Deepak</div>
          <div className="text-sm text-white">&copy; {new Date().getFullYear()} All rights reserved.</div>
        </div>
        {/* Center: Social Links */}
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <a href="https://github.com/onewritescode" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Github size={28} />
          </a>
          <a href="https://twitter.com/triordeep" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Twitter size={28} />
          </a>
          <a href="https://linkedin.com/in/deepak-singh-27a17a321" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Linkedin size={28} />
          </a>
          <a href="https://instagram.com/deepak._.126" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Instagram size={28} />
          </a>
          <a href="deepak.coding78@gmail.com" className="hover:text-gray-300 transition">
            <Mail size={28} />
          </a>
          <a href="https://deepak-port.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Globe size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 