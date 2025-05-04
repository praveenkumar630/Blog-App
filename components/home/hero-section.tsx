import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950">
      {/* Background gradient */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />

      <div className="container relative mx-auto flex flex-col items-center justify-center gap-10 px-6 py-20 md:flex-row md:py-32">
        
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Explore the World Through
            <span className="bg-gradient-to-r from-violet-400 bg-clip-text text-transparent">
              {" "}
              Words
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-gray-300 sm:text-lg md:mx-0 md:text-xl">
            Discover insightful articles, thought-provoking stories, and expert
            perspectives on technology, lifestyle, and innovation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Button className="rounded-full">Start Reading</Button>
            <Button className="rounded-full" variant="outline">
              Explore Topics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
            <div className="space-y-2">
              <div className="text-2xl font-bold">1k+</div>
              <div className="text-sm text-gray-400">Published articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-400">Expert Writers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">10M</div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div
            className={cn(
              "relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96",
              "rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent",
              "border backdrop-blur-lg shadow-indigo-500/10"
            )}
          >
            <Image
              src="https://media.istockphoto.com/id/2148178472/photo/hispanic-programmers-collaborating-on-software-development-in-a-modern-office-setting.jpg?s=1024x1024&w=is&k=20&c=xzs6VdSTc8PnbadofjuP8oZQLLZ2SusZFRbaBWCuM3o="
              alt="Hero Image"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
