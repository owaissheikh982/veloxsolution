import React, { useState, useEffect } from "react";
import { Page } from "./types";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SolutionsPage from "./components/SolutionsPage";
import CapabilityMatrixPage from "./components/CapabilityMatrixPage";
import CaseStudiesPage from "./components/CaseStudiesPage";
import CareersPage from "./components/CareersPage";
import ContactPage from "./components/ContactPage";
import AIChatbot from "./components/AIChatbot";
import { VeloxLogoIcon } from "./components/VeloxLogo";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Mail, Globe, Shield, ArrowUpRight, Github, Linkedin, MessageSquareCode } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Automatically scroll to top smoothly when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#05070c] selection:bg-sky-500/30 selection:text-white">
      
      {/* Dynamic Nav Header */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        toggleChat={toggleChat}
        isChatOpen={isChatOpen}
      />

      {/* Main View Content Switcher with animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === Page.LANDING && (
              <LandingPage setCurrentPage={setCurrentPage} toggleChat={toggleChat} />
            )}
            
            {currentPage === Page.SOLUTIONS && (
              <SolutionsPage />
            )}
            
            {currentPage === Page.MATRIX && (
              <CapabilityMatrixPage />
            )}

            {currentPage === Page.CASE_STUDIES && (
              <CaseStudiesPage />
            )}

            {currentPage === Page.CAREERS && (
              <CareersPage />
            )}

            {currentPage === Page.CONTACT && (
              <ContactPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Messenger-style AI Concierge chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <AIChatbot 
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating sticky chatbot trigger button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            key="chat-trigger-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-cyber-dark/90 backdrop-blur-xl border border-sky-500/40 text-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.35)] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] cursor-pointer hover:border-sky-400 transition-all animate-float animate-pulse-ring"
            title="Chat with AI Concierge"
          >
            <MessageSquareCode className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer layout */}
      <footer className="border-t border-gray-900 bg-[#020306] pt-16 pb-12 px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-12">
            
            {/* Column 1: Brand & Identity */}
            <div className="space-y-4">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => setCurrentPage(Page.LANDING)}
              >
                <VeloxLogoIcon className="h-10 w-10 text-white" />
                <div>
                  <span className="font-display text-xl font-bold tracking-wider text-white">
                    VELOX<span className="text-sky-400">.</span>
                  </span>
                  <span className="block font-mono text-[8px] tracking-widest text-emerald-400/80">
                    EST. 2026
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-sans">
                Full-service software house & bespoke AI agency. Delivering premium, secure, and production-ready enterprise systems.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 rounded-lg border border-gray-800 bg-gray-950/40 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-700 transition-all"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 rounded-lg border border-gray-800 bg-gray-950/40 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-700 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button 
                  onClick={toggleChat}
                  className="h-8 w-8 rounded-lg border border-sky-500/20 bg-sky-500/5 flex items-center justify-center text-sky-400 hover:text-sky-300 hover:border-sky-500/40 transition-all cursor-pointer"
                  title="Contact AI Concierge"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Solutions Navigation */}
            <div>
              <p className="font-mono text-[10px] text-gray-500 tracking-wider uppercase mb-4">Core Competencies</p>
              <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.SOLUTIONS)} 
                    className="hover:text-sky-400 transition-all flex items-center space-x-1 group text-left cursor-pointer"
                  >
                    <span>Enterprise AI Systems</span>
                    <ArrowUpRight className="h-3 w-3 text-gray-600 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.SOLUTIONS)} 
                    className="hover:text-sky-400 transition-all flex items-center space-x-1 group text-left cursor-pointer"
                  >
                    <span>Bespoke Full-Stack Software</span>
                    <ArrowUpRight className="h-3 w-3 text-gray-600 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.SOLUTIONS)} 
                    className="hover:text-sky-400 transition-all flex items-center space-x-1 group text-left cursor-pointer"
                  >
                    <span>Custom Mobile & Web Apps</span>
                    <ArrowUpRight className="h-3 w-3 text-gray-600 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.SOLUTIONS)} 
                    className="hover:text-sky-400 transition-all flex items-center space-x-1 group text-left cursor-pointer"
                  >
                    <span>Autonomous Automation Loops</span>
                    <ArrowUpRight className="h-3 w-3 text-gray-600 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Directory */}
            <div>
              <p className="font-mono text-[10px] text-gray-500 tracking-wider uppercase mb-4">Company Directory</p>
              <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.CASE_STUDIES)} 
                    className="hover:text-sky-400 transition-all text-left cursor-pointer"
                  >
                    Case Studies &amp; Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.MATRIX)} 
                    className="hover:text-sky-400 transition-all text-left cursor-pointer"
                  >
                    Capability Matrix Index
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.CAREERS)} 
                    className="hover:text-sky-400 transition-all text-left cursor-pointer"
                  >
                    Careers &amp; Open Slots
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage(Page.CONTACT)} 
                    className="hover:text-sky-400 transition-all text-left cursor-pointer"
                  >
                    Get in Touch
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Platform Telemetry */}
            <div className="space-y-4 font-mono text-[11px] text-gray-400">
              <p className="font-mono text-[10px] text-gray-500 tracking-wider uppercase mb-2">Systems Telemetry</p>
              <div className="space-y-2 bg-gray-950/40 border border-gray-900 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">OPERATIONAL STATUS</span>
                  <span className="flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 text-[10px]">OPTIMAL</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">SYSTEM LATENCY</span>
                  <span className="text-white text-[10px] font-mono">14 MS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">ACTIVE INFERENCE</span>
                  <span className="text-white text-[10px] font-mono">NODE_V4.2</span>
                </div>
              </div>
            </div>

          </div>

          {/* Solid Divider */}
          <div className="border-t border-gray-900/80 my-8" />

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[11px] text-gray-500">
            {/* Copyright Statement */}
            <div className="flex items-center space-x-2 text-center sm:text-left">
              <Cpu className="h-3.5 w-3.5 text-sky-500" />
              <span>© {new Date().getFullYear()} VELOX SOLUTIONS. ALL RESILIENT PROTOCOLS ASSIGNED.</span>
            </div>

            {/* Micro Badges & Security */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-1.5">
                <Shield className="h-3.5 w-3.5 text-gray-600" />
                <span>SOC2 TYPE II Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Globe className="h-3.5 w-3.5 text-gray-600" />
                <span>Enterprise Grade Hosting</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
