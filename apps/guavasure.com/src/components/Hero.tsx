import React from 'react';
import { Button } from './ui/button';
import { Heart, ChevronDown } from 'lucide-react';
import Lottie from 'lottie-react';
import PetsAnimation from './lottie/pets.json';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/30 to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1
          className="text-[3rem] md:text-[4.5rem] leading-[1.1] tracking-tight mb-6"
          style={{ color: '#1C1C1C' }}
        >
          Smart protection for your furry family
        </h1>

        <p className="text-[1.25rem] md:text-[1.5rem] text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Comprehensive coverage that grows with your pet&apos;s needs. No
          surprises, just peace of mind.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => {
              const experienceSection = document.getElementById('experience');
              if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-[1.125rem] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Start protecting today
          </Button>

          <div className="flex items-center gap-2 text-foreground/60">
            <Heart className="w-4 h-4 fill-accent text-accent" />
            <span>Save 15% with annual billing</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-foreground/30" />
        </div>
      </div>
      <div className="absolute bottom-[-300px] left-0 w-full h-[800px]">
        <Lottie
          animationData={PetsAnimation}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
