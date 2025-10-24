import React from 'react';
import { Button } from './ui/button';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <a
              href="/"
              className="text-[2rem] tracking-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Guavasure
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#insurance"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Pet Insurance
              </a>
              <a
                href="#faqs"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQs
              </a>
            </div>
          </div>

          <Button
            onClick={() => {
              const experienceSection = document.getElementById('experience');
              if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            variant="ghost"
            className="hidden md:inline-flex"
          >
            Get a quote
          </Button>
        </div>
      </div>
    </nav>
  );
}
