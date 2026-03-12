"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="py-1 px-3 inline-flex items-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                >
                    <Menu />
                </button>
            </div>

            <div
                className={`fixed top-0 start-0 bottom-0 z-50  w-64 bg-slate-900 border-e border-gray-800 transition-transform duration-300 transform 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 lg:static lg:block`}
            >
                <div className="relative flex flex-col h-full">
                    <header className="p-4 flex justify-end items-center">
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="flex justify-center items-center cursor-pointer size-8 bg-gray-800 text-gray-400 hover:text-white rounded-full"
                            >
                                <svg
                                    className="shrink-0 size-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                    </header>

                    <nav className="h-full px-4 overflow-y-auto flex flex-col gap-5 text-2xl">
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
                    </nav>
                </div>
            </div>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                ></div>
            )}
        </>
    );
}
