import React, { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo/formandfun-logo.png";

interface NavBarProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const NavBar: React.FC<NavBarProps> = ({ targetRef }) => {
    const [showTitle, setShowTitle] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        if (!targetRef.current) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            const currentY = window.scrollY;

            // Scrolling down and section leaves → show Form&Fun
            if (!entry.isIntersecting && currentY > lastY.current) {
            setShowTitle(true);
            }

            // Scrolling up and section re-enters → hide Form&Fun
            if (entry.isIntersecting && currentY < lastY.current) {
            setShowTitle(false);
            }

            lastY.current = currentY;
        },
        { threshold: 0.1 }
        );

        observer.observe(targetRef.current);

        return () => {
        if (targetRef.current) observer.unobserve(targetRef.current);
        };
    }, [targetRef]);

    return (
        <div className="flex justify-between items-center w-[100vw] fixed top-0 bg-white z-20 px-6 py-3">
        <div>
            <img src={Logo} alt="logo.png" className="w-8 h-8" />
        </div>

        <div className="xl:flex xl:gap-32 hidden items-center">
            {/* only this one toggles visibility */}
            <h2
            className={`text-[16px] transition-all duration-500 ${
                showTitle ? " translate-y-0" : "hidden -translate-y-3"
            }`}
            >
            Form&Fun
            </h2>
            <h2 className="text-[16px]">Creative Technology Studio</h2>
        </div>

        <div className="flex gap-1 text-[16px] mr-4">
            <nav>Studio</nav>
            <nav>Contact</nav>
            <nav>Work</nav>
        </div>
        </div>
    );
};

export default NavBar;
