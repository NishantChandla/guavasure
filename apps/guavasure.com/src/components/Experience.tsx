import React from 'react';

export function Experience() {
  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[2rem] text-gray-900 mb-4">
            Experience <span className="text-primary">Guava</span>
          </h2>
          <p className="text-[1.25rem] text-gray-600 max-w-2xl mx-auto">
            See how Guava works in action. Try our interactive demo right here.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="phone-mockup">
            <div className="phone-screen">
              <iframe
                src="https://a56p9x7fv6spx3c96hdv.share.dreamflow.app/"
                title="Guava App Demo"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-mockup {
          position: relative;
          width: 400px;
          height: 800px;
          border-radius: 40px;
          margin: 20px auto;
          overflow: hidden;
          box-shadow: 0 0 0 5px #eee, 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .phone-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .phone-screen iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .phone-mockup::before {
          content: '';
          display: block;
          padding-top: 160%;
        }

        .phone-mockup iframe {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 98%;
          height: 98%;
          border: none;
        }
      `}</style>
    </section>
  );
}
