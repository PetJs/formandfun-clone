import React, { useEffect,  useState } from "react";
import Logo from "../assets/logo/formandfun-logo.png"

interface NavBarProps {
    targetRef: React.RefObject<HTMLDivElement | null>
}

const NavBar: React.FC<NavBarProps> = ({targetRef}) => {
    const [isVisble, setIsVisble] = useState(false)

    useEffect(() => {
        if (!targetRef.current) return;

        const obs = new IntersectionObserver(
            ([entry]) => setIsVisble(entry.isIntersecting),
            { threshold: 0.5 } 
        )

        obs.observe(targetRef.current)
        
        return () => {
            if (targetRef.current) obs.unobserve(targetRef.current)
        }
    }, [targetRef])


    return(
        <div className="flex justify-between items-center w-[100vw] fixed top-0 bg-white z-20 ">
            <div className="">
                <img src={Logo} alt="logo.png" className="w-8 h-8" />
            </div>
            <div className="flex  justify-between hidden md:block xl:block">
                <h2 ref={targetRef} className={`text-16px ${isVisble ? "" : "hidden"}`}>Form&Fun</h2>
                <h2 className="text-[16px]">Creative Technology Studio</h2> 
            </div>
            
            <div className="flex gap-1 text-[16px] mr-4">
                <nav>Studio</nav>
                <nav>Contact</nav>
                <nav>Work</nav>
            </div>
        </div>
    )
}

export default NavBar;