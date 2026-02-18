import Image from "next/image";

export default function OrbitEffect() {
    return (
        <>
            <div className="relative flex items-center justify-center h-125 md:w-125  animate-slide-in-up -z-10">
                <div className="relative md:w-70 w-60 md:h-70 h-60 flex items-center justify-center z-20">
                    <div className="absolute rounded-full bg-transparent shadow-[0_0_1000px_120px_rgba(57,255,20,0.3)]"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-green-500">
                        <Image
                            src={"/im-m.png"}
                            alt="im"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="absolute border border-dashed border-gray-400 rounded-full md:w-96 w-80 md:h-96 h-80 animate-[spin_15s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-10">
                        <Image
                            src="/nextjs-icon.webp"
                            alt="next"
                            width={50}
                            height={50}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/nextjs-icon.webp"
                            alt="next"
                            width={40}
                            height={40}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>

                    <div className="absolute top-[80%] right-[5%] -translate-y-1/2 w-16 h-16 flex items-center justify-center z-10">
                        <Image
                            src="/node-iconn.png"
                            alt="node"
                            width={40}
                            height={40}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/node-iconn.png"
                            alt="node"
                            width={30}
                            height={30}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>

                    <div className="absolute top-[80%] left-[5%] -translate-y-1/2 w-16 h-16 flex items-center justify-center z-10">
                        <Image
                            src="/react.png"
                            alt="react"
                            width={50}
                            height={50}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/react.png"
                            alt="react"
                            width={40}
                            height={40}
                            className="animate-[spin_15s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>
                </div>

                <div className="absolute border border-dashed border-gray-500 rounded-full md:w-112.5 w-100 md:h-112.5 h-100 animate-[spin_25s_linear_infinite]">
                    <div className="absolute top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center z-10">
                        <Image
                            src="/tailwindcss-icon.png"
                            alt="tailwind"
                            width={70}
                            height={70}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/tailwindcss-icon.png"
                            alt="tailwind"
                            width={60}
                            height={60}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 flex items-center justify-center z-10">
                        <Image
                            src="/typescript.svg"
                            alt="typescript"
                            width={50}
                            height={50}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/typescript.svg"
                            alt="typescript"
                            width={40}
                            height={40}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>

                    <div className="absolute top-[10%] right-[10%] translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center z-10">
                        <Image
                            src="/mongo.webp"
                            alt="mongodb"
                            width={50}
                            height={50}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:block hidden"
                        />

                        <Image
                            src="/mongo.webp"
                            alt="mongodb"
                            width={40}
                            height={40}
                            className="animate-[spin_25s_linear_infinite_reverse] object-contain md:hidden block"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
