"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string;
    bullets?: string[]; // ← optional bullet points shown below the quote
}
interface Colors {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
}
interface FontSizes {
    name?: string;
    designation?: string;
    quote?: string;
}
interface CircularTestimonialsProps {
    testimonials: Testimonial[];
    autoplay?: boolean;
    colors?: Colors;
    fontSizes?: FontSizes;
}

function calculateGap(width: number) {
    if (width < 640) return width * 0.2;
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 40;
    const maxGap = 70;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.04 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
}: CircularTestimonialsProps) => {
    // Color & font config
    const colorName = colors.name ?? "#000";
    const colorDesignation = colors.designation ?? "#6b7280";
    const colorTestimony = colors.testimony ?? "#4b5563";
    const colorArrowBg = colors.arrowBackground ?? "#141414";
    const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
    const fontSizeName = fontSizes.name ?? "1.5rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

    // Responsive container width
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay — ⚠ animation untouched
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    // Keyboard navigation — ⚠ animation untouched
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, testimonialsLength]);

    // Navigation — ⚠ animation untouched
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    // Image transforms — ⚠ animation untouched
    function getImageStyle(index: number): React.CSSProperties {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.6;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
        const isRight = (activeIndex + 1) % testimonialsLength === index;

        if (isActive) {
            return {
                zIndex: 3, opacity: 1, pointerEvents: "auto",
                transform: `translateX(-50%) translateY(0px) scale(1) rotateY(0deg)`,
                left: "50%",
                width: containerWidth < 768 ? "90%" : "85%",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2, opacity: 0.8, pointerEvents: "auto",
                transform: `translateX(calc(-50% - ${gap}px)) translateY(-${maxStickUp}px) scale(0.8) rotateY(15deg)`,
                left: "50%",
                width: containerWidth < 768 ? "90%" : "85%",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2, opacity: 0.8, pointerEvents: "auto",
                transform: `translateX(calc(-50% + ${gap}px)) translateY(-${maxStickUp}px) scale(0.8) rotateY(-15deg)`,
                left: "50%",
                width: containerWidth < 768 ? "90%" : "85%",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        return {
            zIndex: 1, opacity: 0, pointerEvents: "none",
            transform: `translateX(-50%) scale(0.5)`,
            left: "50%", width: "85%",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    // Quote word-blur animation — ⚠ untouched
    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="testimonial-container">
            <div className="testimonial-grid">

                {/* ── Images (left column) ── */}
                <div className="image-container" ref={imageContainerRef}>
                    {testimonials.map((testimonial, index) => (
                        <img
                            key={testimonial.src}
                            src={testimonial.src}
                            alt={testimonial.name}
                            className="testimonial-image"
                            data-index={index}
                            style={getImageStyle(index)}
                        />
                    ))}
                </div>

                {/* ── Text content (right column) ── */}
                <div className="testimonial-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {/* Feature name */}
                            <h3 className="name" style={{ color: colorName, fontSize: fontSizeName }}>
                                {activeTestimonial.name}
                            </h3>

                            {/* Designation/subtitle */}
                            <p className="designation" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                                {activeTestimonial.designation}
                            </p>

                            {/* Quote — word-by-word blur animation (untouched) */}
                            <motion.p className="quote" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                                {activeTestimonial.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ filter: "blur(10px)", opacity: 0, y: 3 }}
                                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>

                            {/* ── Bullet points — below the quote, above arrows ── */}
                            {activeTestimonial.bullets && activeTestimonial.bullets.length > 0 && (
                                <ul className="feature-bullets">
                                    {activeTestimonial.bullets.map((bullet, i) => (
                                        <motion.li
                                            key={bullet}
                                            className="feature-bullet"
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.28, delay: 0.3 + i * 0.07 }}
                                        >
                                            <span className="feature-bullet-icon" aria-hidden="true">›</span>
                                            {bullet}
                                        </motion.li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Arrow buttons */}
                    <div className="arrow-buttons">
                        <button
                            className="arrow-button prev-button"
                            onClick={handlePrev}
                            style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
                            onMouseEnter={() => setHoverPrev(true)}
                            onMouseLeave={() => setHoverPrev(false)}
                            aria-label="Previous"
                        >
                            <FaArrowLeft size={22} color={colorArrowFg} />
                        </button>
                        <button
                            className="arrow-button next-button"
                            onClick={handleNext}
                            style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
                            onMouseEnter={() => setHoverNext(true)}
                            onMouseLeave={() => setHoverNext(false)}
                            aria-label="Next"
                        >
                            <FaArrowRight size={22} color={colorArrowFg} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        /* ── Container ── */
        .testimonial-container {
          width: 100%;
          max-width: 72rem;
          padding: 1rem;
          margin: 0 auto;
        }

        /* ── Grid (mobile-first: single column) ── */
        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        /* ── Image panel ── */
        .image-container {
          position: relative;
          width: 100%;
          /* Responsive height: small on phone, grows on bigger screens */
          height: clamp(14rem, 45vw, 30rem);
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-image {
          position: absolute;
          height: 100%;
          object-fit: cover;
          border-radius: clamp(1rem, 2vw, 2rem);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          will-change: transform, opacity;
        }

        /* ── Text panel ── */
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          padding: 0 0.5rem;
        }
        .name {
          font-weight: 800;
          margin-bottom: 0.4rem;
          line-height: 1.2;
        }
        .designation {
          margin-bottom: 1rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }
        .quote {
          line-height: 1.6;
          max-width: 40rem;
          margin: 0 auto;
        }

        /* ── Bullet points ── */
        .feature-bullets {
          list-style: none;
          padding: 0;
          margin: 1.25rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-width: 40rem;
          text-align: left;
        }
        .feature-bullet {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: clamp(0.8rem, 1.5vw, 0.9375rem);
          color: #475569;
          line-height: 1.6;
        }
        .feature-bullet-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          background: #ede9fe;
          color: #7c3aed;
          font-size: 1rem;
          font-weight: 900;
          line-height: 1;
          margin-top: 0.1rem;
        }

        /* ── Arrows ── */
        .arrow-buttons {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          padding-top: 2rem;
        }
        .arrow-button {
          width: clamp(2.5rem, 5vw, 3.5rem);
          height: clamp(2.5rem, 5vw, 3.5rem);
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .arrow-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        /* ── Tablet (≥ 640px) ── */
        @media (min-width: 640px) {
          .testimonial-container {
            padding: 1.5rem;
          }
          .image-container {
            height: clamp(18rem, 40vw, 28rem);
          }
        }

        /* ── Desktop (≥ 1024px): side-by-side ── */
        @media (min-width: 1024px) {
          .testimonial-container {
            padding: 2rem;
          }
          .testimonial-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 5rem;
            text-align: left;
          }
          .image-container {
            height: clamp(22rem, 35vw, 30rem);
          }
          .testimonial-content {
            text-align: left;
            padding: 0;
          }
          .quote {
            margin: 0;
          }
          .feature-bullets {
            margin: 1.25rem 0 0;
          }
          .arrow-buttons {
            justify-content: flex-start;
          }
        }

        /* ── Large desktop (≥ 1280px) ── */
        @media (min-width: 1280px) {
          .testimonial-grid {
            gap: 6rem;
          }
          .image-container {
            height: clamp(24rem, 30vw, 32rem);
          }
        }

        /* ── XL screens / 4K (≥ 1536px) ── */
        @media (min-width: 1536px) {
          .image-container {
            height: 34rem;
          }
        }
      `}</style>
        </div>
    );
};

export default CircularTestimonials;
