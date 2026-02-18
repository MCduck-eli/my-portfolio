import styled from "styled-components";

const MobileSkills = () => {
    return (
        <StyledWrapper className="flex  md:flex-row flex-col gap-6 items-center py-10 ">
            {carItem.map((item, indx) => (
                <div className="outer -z-10" key={indx}>
                    <div className="dot" />
                    <div className="card">
                        <div className="ray" />
                        <div className="text">{item.title}</div>
                        <div className="description">{item.description}</div>
                        <div className="line topl" />
                        <div className="line leftl" />
                        <div className="line bottoml" />
                        <div className="line rightl" />
                    </div>
                </div>
            ))}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .outer {
        width: 400px;
        height: 280px; /* Matn sig'ishi uchun balandlik oshirildi */
        border-radius: 10px;
        padding: 1px;
        background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
        position: relative;
    }

    .card {
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 9px;
        background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-direction: column;
        color: #fff;
        padding: 20px; /* Ichki bo'shliq qo'shildi */
        text-align: center;
    }

    .card .text {
        font-weight: bolder;
        font-size: 2.5rem; /* 4rem juda katta edi, 2.5rem ga tushirildi */
        background: linear-gradient(45deg, #000000 4%, #fff, #000);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 10px;
    }

    /* YANGI DESCRIPTION STILI */
    .description {
        font-size: 0.9rem;
        line-height: 1.4;
        color: #cccccc;
        padding: 0 10px;
        z-index: 2;
        max-width: 100%;
        word-wrap: break-word; /* Uzun so'zlarni bo'laklash uchun */
    }

    /* Boshqa animatsiya va line stillari o'zgarishsiz qoladi */
    .dot {
        width: 5px;
        aspect-ratio: 1;
        position: absolute;
        background-color: #fff;
        box-shadow: 0 0 10px #ffffff;
        border-radius: 100px;
        z-index: 2;
        right: 10%;
        top: 10%;
        animation: moveDot 6s linear infinite;
    }

    @keyframes moveDot {
        0%,
        100% {
            top: 10%;
            right: 10%;
        }
        25% {
            top: 10%;
            right: calc(100% - 35px);
        }
        50% {
            top: calc(100% - 30px);
            right: calc(100% - 35px);
        }
        75% {
            top: calc(100% - 30px);
            right: 10%;
        }
    }

    .line {
        position: absolute;
        background-color: #2c2c2c;
    }
    .topl {
        top: 10%;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
    }
    .bottoml {
        bottom: 10%;
        width: 100%;
        height: 1px;
    }
    .leftl {
        left: 10%;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, #747474 30%, #222424 70%);
    }
    .rightl {
        right: 10%;
        width: 1px;
        height: 100%;
    }
`;

const carItem = [
    {
        title: "NEXT",
        description:
            "Building high-performance, SEO-optimized, and scalable Full-Stack applications using Next.js.",
    },
    {
        title: "TYPE",
        description:
            "Developing robust and maintainable web applications with strong static typing in TypeScript.",
    },
    {
        title: "NODE",
        description:
            "Building high-performance, scalable back-end services and RESTful APIs using Node.js.",
    },
];

export default MobileSkills;
