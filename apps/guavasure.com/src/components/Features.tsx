import React from 'react';
import {
  Zap,
  Heart,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Zap,
    title: 'Lightning-fast claims',
    description:
      'Upload your vet bill, get approved in minutes. Most claims paid the same day.',
  },
  {
    icon: DollarSign,
    title: 'Clear, honest pricing',
    description:
      'Slider-based quotes. What you see is what you pay. No hidden fees, ever.',
  },
  {
    icon: Shield,
    title: 'Comprehensive coverage',
    description:
      'Accidents, illnesses, surgeries. Add wellness, dental, and behavioral care if you want.',
  },
  {
    icon: Clock,
    title: 'Sign up in seconds',
    description:
      'No phone calls, no paperwork. Just a few taps and your pet is protected.',
  },
  {
    icon: Heart,
    title: 'Built for pet parents',
    description:
      'Plain English, real people, instant help. We get it your pet is family.',
  },
  {
    icon: CheckCircle,
    title: 'IRDAI approved',
    description:
      'Fully compliant, fully transparent. All our policies meet fairness standards.',
  },
];

export function Features() {
  return (
    <section id="insurance" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3.5rem] tracking-tight mb-4">
            Everything you need,
            <br />
            nothing you don't
          </h2>
          <p className="text-[1.125rem] text-foreground/70 max-w-2xl mx-auto">
            If your pet gets sick or hurt, we help pay the vet bill. That's it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-secondary/50 border-secondary hover:bg-secondary transition-colors duration-200 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[1.25rem] mb-2">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* What's not covered */}
        <div className="mt-12 p-8 bg-white rounded-lg border border-border">
          <h3 className="text-[1.25rem] mb-3">What's not covered</h3>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Pre-existing conditions, cosmetic procedures, breeding costs, and
            preventable diseases if vaccines weren't up to date. Waiting periods
            apply for certain conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
