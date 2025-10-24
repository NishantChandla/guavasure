import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How fast do you actually pay claims?',
    answer:
      "Most straightforward claims (vet invoices with clear diagnosis) are approved in under 2 hours during business hours. Complex cases might take 3-5 days. We'll always give you a clear timeline upfront.",
  },
  {
    question: "What's the catch with pricing?",
    answer:
      "No catch. Your premium depends on your pet's age, breed, location, and the coverage/deductible you pick. Older pets and certain breeds cost more we show you exactly why. Multi-pet discount is 10% off the second pet.",
  },
  {
    question: 'Are pre-existing conditions covered?',
    answer:
      "No. If your pet was diagnosed or showed symptoms before your policy started, it's not covered. This is standard across all pet insurers and required by IRDAI regulations.",
  },
  {
    question: 'What about waiting periods?',
    answer:
      "Accidents: covered immediately. Illnesses: 14-day waiting period. Hip dysplasia & cruciate ligament issues: 6 months. We're required to have these it prevents fraud and keeps premiums fair.",
  },
  {
    question: 'Can I use any vet?',
    answer:
      'Yes. Any licensed veterinarian in India. You pay the vet, submit the bill, we reimburse you. No network restrictions.',
  },
  {
    question: 'Do you cover routine checkups and vaccines?',
    answer:
      "Not in the base plan. That's for accidents and illnesses. But you can add our Wellness Rider for ₹200/month, which covers annual exams, vaccines, flea/tick prevention, and dental cleanings.",
  },
  {
    question: 'How do deductibles work?',
    answer:
      'You pick a deductible (₹5k, ₹10k, or ₹15k). You pay that amount first, then we cover the rest up to your annual limit. Higher deductible = lower monthly premium.',
  },
  {
    question: 'Is Guava legit? Who regulates you?',
    answer:
      "We're registered with the Insurance Regulatory and Development Authority of India (IRDAI). Our registration number is XYZ123456. All policies meet IRDAI fairness and disclosure standards.",
  },
];

export function FAQ() {
  return (
    <section id="faqs" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3.5rem] tracking-tight mb-4">
            Questions? We've got you.
          </h2>
          <p className="text-[1.125rem] text-foreground/70">
            Plain answers, no dodging.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-border rounded-lg px-6 data-[state=open]:bg-secondary/20"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-[1.125rem]">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-foreground/70 mb-4">Still have questions?</p>
          <a
            href="mailto:prapanch@tallexit.com"
            className="text-primary hover:underline text-[1.125rem]"
          >
            Chat with us →
          </a>
        </div>
      </div>
    </section>
  );
}
