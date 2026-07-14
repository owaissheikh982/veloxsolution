import React, { useState } from "react";
import { Page } from "../types";
import { VeloxLogoIcon } from "./VeloxLogo";
import { 
  Terminal, 
  Cpu, 
  LayoutDashboard, 
  MessageSquareCode, 
  FolderGit2, 
  Briefcase, 
  Mail,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  toggleChat: () => void;
  isChatOpen: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, toggleChat, isChatOpen }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: Page.LANDING, label: "Home", icon: Terminal },
    { id: Page.SOLUTIONS, label: "Solutions", icon: Cpu },
    { id: Page.CASE_STUDIES, label: "Cases", icon: FolderGit2 },
    { id: Page.MATRIX, label: "Matrix", icon: LayoutDashboard },
    { id: Page.CAREERS, label: "Careers", icon: Briefcase },
    { id: Page.CONTACT, label: "Contact", icon: Mail }
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-cyber-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 gap-4">
        
        {/* Logo Section */}
        <div 
          className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer flex-shrink-0" 
          onClick={() => handleNavClick(Page.LANDING)}
        >
          <VeloxLogoIcon className="h-9 w-9 sm:h-12 sm:w-12" />
          <div>
            <span className="font-display text-lg sm:text-2xl font-bold tracking-wider text-white">
              VELOX<span className="text-sky-400">.</span>
            </span>
            <span className="block font-mono text-[8px] sm:text-[9px] tracking-widest text-emerald-400/80">
              SOFTWARE_HOUSE
            </span>
          </div>
        </div>

        {/* Desktop & Tablet Row Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-1 py-1.5 px-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-gray-800/60 text-white border-b-2 border-sky-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* AI Assistant Activator & Lead Prompt */}
          <button
            id="nav-cta-chat"
            onClick={toggleChat}
            className={`btn-cyber flex items-center space-x-1 sm:space-x-2 rounded-lg px-2 sm:px-3.5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
              isChatOpen 
                ? "bg-sky-500 text-black border-sky-400 hover:bg-sky-400" 
                : "text-sky-400 border-sky-500/40 hover:border-sky-400"
            }`}
          >
            <MessageSquareCode className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="font-mono hidden sm:inline">AI CONCIERGE</span>
          </button>

          {/* Mobile Menu Toggle (Visible only below md) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4.5 w-4.5 text-sky-400 animate-fadeIn" />
            ) : (
              <Menu className="h-4.5 w-4.5 animate-fadeIn" />
            )}
          </button>
        </div>
        
      </div>

      {/* Animated Dropdown Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-800 bg-cyber-dark/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-1.5">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-sky-500/10 text-sky-400 border-l-2 border-sky-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
