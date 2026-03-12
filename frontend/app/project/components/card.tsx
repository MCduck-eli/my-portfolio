"use client";
import { IBlogTypes } from "@/types/blog-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface CardProps {
    item: IBlogTypes;
}

export default function ProjectCard({ item }: CardProps) {
    return (
        <StyledWrapper>
            <Link href={item.link} className="cursor-pointer" target="_blank">
                <div className="card">
                    <div className="card-bg">
                        {item.image && (
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                                unoptimized
                            />
                        )}
                    </div>
                    <b />
                    <div className="content">
                        <div className="title-container">
                            <p className="title">
                                {item.title}
                                <span className="description">
                                    {item.description}
                                </span>
                            </p>
                        </div>
                        <ul className="sci">
                            <li>
                                <Link
                                    href="https://github.com/MCduck-eli"
                                    target="_blank"
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/eldorjon-abdukholikov/?locale=ru"
                                    target="_blank"
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 448 512"
                                        fill="currentColor"
                                    >
                                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.instagram.com/eldor.halikov/"
                                    target="_blank"
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 448 512"
                                        fill="currentColor"
                                    >
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Link>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .card {
        position: relative;
        width: 300px;
        height: 354px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
        overflow: hidden;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(315deg, #39ff14, #39ff81);
    }

    .card::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(315deg, #39ff14, #39ff81);
        filter: blur(30px);
    }

    .card b {
        position: absolute;
        inset: 6px;
        background: rgba(0, 0, 0, 0.85);
        z-index: 2;
    }

    .card-bg {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        z-index: 3;
        overflow: hidden;
        opacity: 0.4;
        transition: 0.5s ease-in-out;
    }

    .card:hover .card-bg {
        opacity: 1;
        transform: translateY(-85px) scale(0.6);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card .content {
        position: absolute;
        z-index: 4;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: scale(0);
        transition: 0.5s ease-in-out;
        padding: 15px;
        max-height: 160px;
    }

    .card:hover .content {
        transform: scale(1);
        bottom: 15px;
    }

    .title-container {
        width: 100%;
        overflow: hidden;
    }

    .content .title {
        color: #fff;
        font-weight: 600;
        line-height: 1.2em;
        font-size: 0.95em;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .content .description {
        font-weight: 400;
        font-size: 0.75em;
        text-transform: none;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top: 8px;
        opacity: 0.8;
        line-height: 1.4;
    }

    .content .sci {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-top: 10px;
        padding: 0;
        list-style: none;
    }

    .sci li a {
        color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.1);
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: 0.3s;
    }

    .sci li a:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-3px);
    }
`;
