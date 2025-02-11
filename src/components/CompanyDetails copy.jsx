import React, { useState, useEffect, useRef } from "react";

const companies = [
    {
        logo: "Bluebird.svg",
        head: "No port call is ever the same.",
        des: "We provide port agency services across all major UAE ports, Kochi, Ghana, and Togo."
    },
    // Add more company objects as needed
];

const CompanyDetails = () => {
    const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 items
    const listRef = useRef(null);

    const handleScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setVisibleCount((prev) => Math.min(prev + 3, companies.length));
            }
        }
    };

    useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener("scroll", handleScroll);
            return () => listElement.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="company-details-wrap">
            <div className="company-list-wrap" ref={listRef} style={{ maxHeight: "300px", overflowY: "auto" }}>
                {companies.slice(0, visibleCount).map((company, index) => (
                    <div key={index} className="company-item">
                        <img alt="c" className="logo" src={company.logo} />
                        <div className="head">{company.head}</div>
                        <div className="des">{company.des}</div>
                        <div className="more-btn">
                            Learn More
                            <img src="arrow_forward.svg" alt="arrow" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyDetails;
