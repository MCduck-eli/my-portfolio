"use client";

import MobileSkills from "@/components/mobile-skills";
import OrbitEffect from "@/components/orbit-effect";
import { useTypewriter } from "@/hooks/useTypewriter";
import NeonButton from "@/lib/neon-button";
import Link from "next/link";
import { useEffect, useState } from "react";

const textOptions = ["Full-Stack", "Front-End", "Back-End"];

export default function IndexPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const line1 = useTypewriter(
        "Bridging the gap between functional code and stunning user experiences.",
        50,
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % textOptions.length,
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="w-full md:py-17 py-15 md:px-25 px-5 overflow-x-hidden">
                <div className="flex md:justify-between justify-center md:flex-row flex-col">
                    <div className="flex flex-col">
                        <p className="flex flex-col md:text-4xl text-2xl font-semibold bg-neon-gradient bg-clip-text text-transparent mb-5">
                            <span>Hi!</span>
                            <span className="font-bold md:text-6xl text-4xl">
                                I'm Eldor Khalikov
                            </span>

                            <span className="mt-8 md:max-w-150 max-w-full leading-relaxed text-wrap">
                                {line1}
                            </span>
                        </p>

                        <div className="relative h-20 md:h-25 overflow-hidden">
                            {textOptions.map((text, index) => (
                                <h1
                                    key={text}
                                    className={`absolute inset-0 bg-neon-gradient bg-clip-text text-transparent font-bold md:text-6xl text-4xl mb-10 transition-all duration-500 ease-in-out
                        ${
                            index === currentIndex
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                                >
                                    {text}
                                </h1>
                            ))}
                        </div>
                        <h1 className="bg-neon-gradient bg-clip-text text-transparent font-bold md:text-6xl text-4xl">
                            Developer
                        </h1>
                        <div className="mt-10 w-50 md:block hidden">
                            <Link
                                href={"https://github.com/MCduck-eli"}
                                target="_blank"
                            >
                                <NeonButton />
                            </Link>
                        </div>
                    </div>

                    <div className="md:block mt-10 md:mt-0 flex justify-center overflow-visible">
                        <OrbitEffect />
                    </div>
                </div>

                <div className="mt-10 flex justify-center" id="skills">
                    <MobileSkills />
                </div>
            </div>
        </>
    );
}
