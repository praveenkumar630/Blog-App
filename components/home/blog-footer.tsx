"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter, ChevronUp } from "lucide-react";
import { useState } from "react";

export function BlogFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate submission or call API here
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Branding */}
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Byte
              </span>
              <span className="text-foreground">Code</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Where ideas meet innovation. Dive into a world of insightful 
              articles written by passionate thinkers and industry experts.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-blue-500">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-gray-600">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-blue-700">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">All Articles</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Topics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Authors</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Podcasts</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Licenses</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <Button type="submit" className="w-full">
                {submitted ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center relative">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ByteCode. All rights reserved.
          </p>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={scrollToTop}
            className="absolute right-4 top-0 hover:text-indigo-500"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
