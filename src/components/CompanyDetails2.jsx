'use client'

import React, { useEffect, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Scrollbar from "smooth-scrollbar";

const CompanyDetails2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    console.log(activeIndex);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let bodyScrollBar = Scrollbar.init(document.body, {
            damping: 0.1,
            delegateTo: document,
        });

        ScrollTrigger.scrollerProxy(".scroller", {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            },
        });

        bodyScrollBar.addListener(ScrollTrigger.update);

        gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

        let images = gsap.utils.toArray(".panel:not(.purple)");
        let companyItems = gsap.utils.toArray(".company-item");

        images.forEach((image, i) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "section.black",
                    scroller: ".scroller",
                    start: () => `top -${window.innerHeight * (i + 0.5)}`,
                    end: () => "+=" + window.innerHeight,
                    scrub: true,
                    toggleActions: "play none reverse none",
                    invalidateOnRefresh: true,
                    onEnter: (e) => {
                        console.log(e, image, i);

                        setActiveIndex(i + 1)
                    },
                    onEnterBack: () => setActiveIndex(i),
                },
            });

            tl.to(image, { yPercent: -100 });
        });

        ScrollTrigger.create({
            trigger: "section.black",
            scroller: ".scroller",
            scrub: true,
            // markers: true,
            pin: true,
            start: () => "top top",
            end: () => `+=${(images.length + 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            bodyScrollBar.destroy();
        };
    }, []);

    return (
        <div className="scroller">
            <section className="orange">
                <div className="text">This is some text inside of a div block.</div>
            </section>

            <section className="black company-details-wrap">
                <div className="text-wrap company-list-wrap">
                    {["Bluebird.svg", "Bluebird.svg", "Bluebird.svg"].map((logo, i) => (
                        <div key={i} className={`company-item ${activeIndex === i ? "active" : ""}`}>
                            <img alt="c" className="logo" src={logo} />
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

                <div className="p-wrap right-section-wrap">
                    {["895 2.jpg", "5581 1.png", "6931 1.png"].map((img, i) => (
                        <img key={i} className={`panel cover-img ${i === 2 ? "purple" : ""}`} src={img} alt="cover" />
                    ))}
                </div>
            </section>

            <section className="blue"></section>
        </div>
    );
};

export default CompanyDetails2;
