"use client"

import type React from "react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl mb-3">📧</div>
              <h3 className="font-semibold text-card-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">dkpucs@gmail.com</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-semibold text-card-foreground mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">Venkataramana Swamy College in Bantwal, Karnataka</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl mb-3">🕐</div>
              <h3 className="font-semibold text-card-foreground mb-2">Response Time</h3>
              <p className="text-muted-foreground text-sm">Within 24 hours</p>
            </div>
          </div>

          <div className="p-8 bg-card border border-border rounded-lg">
            <form action="https://formbold.com/s/oylYK" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary cursor-pointer text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
      </div>
    </div>
  )
}
