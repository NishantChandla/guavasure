import React from 'react';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <div
              className="text-[1.5rem] mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Guavasure
            </div>
            <p className="text-background/70 leading-relaxed text-[0.95rem]">
              Radically simple pet insurance. Fast claims, clear pricing, big
              heart.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[1.125rem] mb-4">Products</h3>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Pet Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[1.125rem] mb-4">Company</h3>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[1.125rem] mb-4">Support</h3>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="mailto:prapanch@tallexit.com"
                  className="hover:text-background transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        {/* Legal & Compliance */}
        {/* <div className="space-y-4 text-background/60 text-[0.85rem]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Grievance Redressal</a>
            <a href="#" className="hover:text-background transition-colors">IRDAI Guidelines</a>
          </div>

          <div className="leading-relaxed">
            <p className="mb-2">
              <strong>Guava Insurance Services Private Limited</strong>
            </p>
            <p className="mb-1">
              IRDAI Registration No.: IRDAI/DB/123/2024 | CIN: U66000MH2024PTC123456
            </p>
            <p className="mb-1">
              UIN: GUAVA/PET/2025/001 | Valid until: 31 March 2026
            </p>
            <p className="mb-3">
              Registered Office: 123 MG Road, Bangalore, Karnataka 560001 | Email: help@getguava.in | Phone: 1800-123-4567
            </p>
            <p className="text-[0.8rem]">
              Insurance is subject to underwriting and policy terms. All claims are subject to policy exclusions, waiting periods, and sub-limits as per the Policy Wording. 
              For more details on risk factors, terms and conditions, please read the sales brochure and policy document carefully before concluding a sale. 
              Guava Insurance Services is a licensed corporate agent and does not guarantee claim approval or timeline. 
              This website is not meant for the collection of personally identifiable information (PII) or sensitive personal data. 
              Visit <a href="#" className="underline hover:text-background">www.irdai.gov.in</a> to learn about insurance and verify our credentials.
            </p>
          </div>

          <p className="text-center pt-4">
            © 2025 Guava Insurance Services Pvt. Ltd. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
}
