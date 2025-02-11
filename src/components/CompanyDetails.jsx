'use client';

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

const CompanyDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const companyItemsRef = useRef([]);
    const containerRef = useRef(null);
    const stickyRef = useRef(null);

    useEffect(() => {
        let bodyScrollBar = Scrollbar.init(document.body, {
            damping: 0.1,
            delegateTo: document,
        });

        ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            },
        });

        bodyScrollBar.addListener(ScrollTrigger.update);

        gsap.set(".company-item", { opacity: 0, y: 50 });

        gsap.utils.toArray(".company-item").forEach((item, i) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    scroller: containerRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: true,
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            bodyScrollBar.destroy();
        };
    }, []);

    return (
        <div ref={containerRef} className="company-details-wrap scroller">
            <div ref={stickyRef} className="company-list-wrap">
                {[1, 1, 1].map((_, index) => (
                    <div
                        key={index}
                        className={`company-item ${activeIndex === index ? "active" : ""}`}
                        ref={(el) => (companyItemsRef.current[index] = el)}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <img alt="c" className="logo" src="Bluebird.svg" />
                        <div className="head">No port call is ever the same.</div>
                        <div className="des">
                            We provide port agency services across all major UAE ports, Kochi, Ghana, and Togo.
                        </div>
                        <div className="more-btn">
                            Learn More
                            <img src="arrow_forward.svg" alt="arrow" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="right-section-wrap">
                <div className="img-box">
                    <img className="cover-img" src="895 2.jpg" alt="cover" />
                    <img className="cover-img" src="5581 1.png" alt="cover" />
                    <img className="cover-img" src="6931 1.png" alt="cover" />
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
