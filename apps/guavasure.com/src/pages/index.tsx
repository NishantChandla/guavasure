import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { Features } from '@/components/Features';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Guavasure - Smart protection for your furry family</title>
        <meta
          name="description"
          content="Guavasure - Smart protection for your furry family"
        />
        <meta name="keywords" content="Guavasure" />
        <meta name="author" content="Guavasure" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen">
          <Navigation />
          <Hero />
          <Experience />
          <Features />
          <FAQ />
          <Footer />
        </div>
      </main>
    </>
  );
}
