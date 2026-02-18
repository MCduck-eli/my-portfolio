"use client";

import useScrolled from "@/hooks/scrolled";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Sidebar from "./sidebar";

export default function Navbar() {
    const scrolled = useScrolled();

    return (
        <div
            className={cn(
                "w-full sticky top-0 bg-black",
                scrolled && "border-b border-neutral-600/40",
            )}
        >
            <div className="w-full py-4 flex md:justify-between justify-center px-40 relative">
                <div className="absolute left-3 top-5 md:hidden block">
                    <Sidebar />
                </div>
                <h1 className="text-neon-green animate-flicker font-bold text-4xl">
                    CyberNaruto
                </h1>
                <div className="md:flex flex-row gap-10 text-2xl font-semibold hidden bg-neon-gradient bg-clip-text text-transparent">
                    <Link
                        href={"#home"}
                        className="hover:border-b-2 border-neon-green transition-all ease-in-out duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href={"#skills"}
                        className="hover:border-b-2 border-neon-green transition-all ease-in-out duration-200"
                    >
                        Skills
                    </Link>
                    <Link
                        href={"#"}
                        className="hover:border-b-2 border-neon-green transition-all ease-in-out duration-200"
                    >
                        Project
                    </Link>
                </div>
            </div>
        </div>
    );
}
