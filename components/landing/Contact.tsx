'use client';
import AnimatedTitle from "@/components/landing/AnimatedTitle";
import Button from "@/components/landing/Button";

const Contact = () => {
  return (
    <div id="contact" className="py-24 w-full px-5 sm:px-10 bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto rounded-none border border-border/50 bg-card/20 backdrop-blur-sm p-8 md:p-16 overflow-hidden">
        {/* Tech decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 p-4 opacity-30 hidden md:block">
          <div className="text-[10px] font-mono text-primary uppercase leading-tight">
            System.Connect<br />
            Port: 8080<br />
            Status: Listening
          </div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="inline-block mb-6 px-3 py-1 border border-primary/30 bg-primary/5">
            <p className="text-xs font-mono uppercase text-primary tracking-widest">Communication Uplink</p>
          </div>

          <p className="mb-8 font-mono text-lg md:text-xl uppercase tracking-widest text-muted-foreground">
            Get in Touch
          </p>

          <AnimatedTitle
            title="Have questions? <br /> We are here to help."
            containerClass="special-font !md:text-6xl w-full !text-4xl !font-bold !leading-tight tracking-tighter mb-10"
          />

          <Button
            title="INITIALIZE CONTACT"
            href="/contact"
            containerClass="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent hover:border-primary/50"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
