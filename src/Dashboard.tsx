import NavBar from './components/navbar'
import { MagicText } from './components/magicText'
import { useEffect, useRef, useState } from 'react'
import Lottie from "lottie-react"
import formAndFun from "./assets/video/formandfun.json"
import BlueCube from "./assets/images/bluecube.png"
import PurpleCube from "./assets/images/purplecube.webp"
import GreenCube from "./assets/images/greencube.webp"

const gif = [
    "/bottle.mp4",
    "/bottle.mp4",
    "/bottle.mp4",
    "/bottle.mp4",
    "/bottle.mp4",
    "/bottle.mp4",
]

const media = [
    {
        video: "/bottle.mp4",
        title: "Bottle",
        description: "A cool bottle",
    },
    {
        video: "/bottle.mp4",
        title: "Bottle",
        description: "A cool bottle",
    },
    {
        video: "/bottle.mp4",
        title: "Bottle",
        description: "A cool bottle",
    },
    {
        video: "/bottle.mp4",
        title: "Bottle",
        description: "A cool bottle",
    },
]

const awards = [
    {
        id: 0o1,
        title: "Webby Awards",
        project: "Powerade Mind Zone",
        category: "AI, Immersive & Games",
        year: "2025",
    },
    {
        id: 0o2,
        title: "Clio Awards-Gold",
        project: "Oreo & Pacman Supermarcade",
        category: "Interactive/Experimental",
        year: "2025",
    },
]

const expertise = [
    {
        image: BlueCube,
        backgroundColor: "bg-blue-300",
        bgColorHover: "hover:bg-blue-200",
        title: "Technology",
        leftList: [
            "Spatial Computing (AR, VR, XR)",
            "AI Tools & Experiences",
            "Web Development",
            "WebGL Experiences"
        ],
        rightList: [
            "Web3/Blockchain",
            "Game Development",
            "Rapid Prototyping",
        ]
    },
    {
        image: PurpleCube,
        backgroundColor: "bg-purple-300",
        bgColorHover: "hover:bg-purple-200",
        title: "Technology",
        leftList: [
            "Spatial Computing (AR, VR, XR)",
            "AI Tools & Experiences",
            "Web Development",
            "WebGL Experiences"
        ],
        rightList: [
            "Web3/Blockchain",
            "Game Development",
            "Rapid Prototyping",
        ]
    },
    {
        image: GreenCube,
        backgroundColor: "bg-green-300",
        bgColorHover: "hover:bg-green-200",
        title: "Technology",
        leftList: [
            "Spatial Computing (AR, VR, XR)",
            "AI Tools & Experiences",
            "Web Development",
            "WebGL Experiences"
        ],
        rightList: [
            "Web3/Blockchain",
            "Game Development",
            "Rapid Prototyping",
        ]
    },
]


const Dashboard = () => {
    const studioRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const ANIMATION_MS = 2000; // <-- tweak to match your Lottie duration (ms)
    const [overlayVisible, setOverlayVisible] = useState(true);

    useEffect(() => {
    const t = window.setTimeout(() => setOverlayVisible(false), ANIMATION_MS);
    return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        let animationFrame: number;
        const scroll = () => {
            if (!isDragging && containerRef.current) {
                containerRef.current.scrollLeft += 1; // Adjust scroll speed here
                if(
                    containerRef.current.scrollLeft >=
                    containerRef.current.scrollWidth / 2
                ) {
                    containerRef.current.scrollLeft = 0;
                }
            }
            animationFrame = requestAnimationFrame(scroll);
        }
        scroll();
        return () => cancelAnimationFrame(animationFrame);
    },[isDragging])

    const handleMouseDown = (e: React.MouseEvent) => {
        if(!containerRef.current) return;
        setIsDragging(true)
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
        setScrollLeft(containerRef.current?.scrollLeft || 0)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 1.5; //scroll-fast
        containerRef.current.scrollLeft = scrollLeft - walk;
    }
    

    return(
        <div className='p-2 h-screen'>
            {overlayVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="w-[70vw] max-w-[900px]">
                    <Lottie animationData={formAndFun} loop={false} autoplay className="w-full" />
                    </div>
                </div>
            )}

            <div className={`transition-opacity duration-500 ${overlayVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <NavBar targetRef={studioRef}/>

                <div className='flex justify-center items-center h-[60vh]' ref={studioRef}>
                    <Lottie 
                        animationData={formAndFun}
                        loop={false}
                        className='w-[50vw]'
                    />
                </div>
                

                <section className='' >
                    <video 
                        src="/sizzle.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className='w-full h-full object-cover rounded-xl'
                    />
                </section>

                <section className='mb-' >
                    <p className=''>The Studio</p>
                    <MagicText
                    text={" We are a global creative tech studio forging delightful experiences by blending design, technology, and storytelling. Driven to create value for people and brands through interaction. "}
                    />
                </section>

                <section className='flex gap-2 overflow-x-auto hide-scrollbar spin'>
                    {gif.map((link, idx) => (
                        <video 
                            src={link} 
                            key={idx}
                            autoPlay
                            loop
                            muted
                            className=" w-[75vw] h-[45vh] xl:w-[25vw] xl:h-[60vh] object-cover rounded-xl"
                        />
                    ))}
                </section>

                <section>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-8xl'>WORK</h2>
                        <div className='hidden xl:block' >
                            <p>Selected Work</p>
                            <span className='text-gray-600 flex flex-col text-right'>(22-25)</span>
                        </div>
                    </div>

                    <div 
                        ref={containerRef}
                        className="flex overflow-x-hidden hide-scrollbar cursor-grab active:cursor-grabbing select-none"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {["DIGITAL","EXPERIMENTAL","MOTION","SPATIAL","VR","GEN-AI","AR","GAMING","VIRTUAL-FASHION","IMMERSIVE","BRAND"].map(
                            (item, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 text-7xl font-semibold text-gray-300 whitespace-nowrap"
                            >
                                {item}
                            </span>
                            )
                        )}
                        {["DIGITAL","EXPERIMENTAL","MOTION","SPATIAL","VR","GEN-AI","AR","GAMING","VIRTUAL-FASHION","IMMERSIVE","BRAND"].map(
                            (item, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 text-7xl font-semibold text-gray-300 whitespace-nowrap"
                            >
                                {item}
                            </span>
                            )
                        )}
                    </div>    
                </section>        

                <section className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-2'>
                    {media.map((item, index) => (
                        <div 
                            key={index}
                            className={`
                                relative flex flex-col gap-2 rounded-lg group 
                                ${index === 0 ? "xl:col-span-2" : ""}
                                ${index === 2 ? "xl:col-span-1 " : ""}
                                ${index === 3 ? "xl:col-span-2 " : ""}
                            `}
                        >
                            <video src={item.video} autoPlay loop className='rounded-lg h-full object-cover'/>
                            <div className='xl:group-hover:absolute xl:hidden xl:group-hover:block xl:group-hover:top-0 xl:group-hover:left-0 xl:group-hover:text-white p-2'>
                                <p>{item.title}</p>
                                <span>{item.description}</span>
                            </div>
                        </div>
                    ))} 
                </section>

                <section className='mb-12'>
                    <p>Expertise & Capabilities</p>
                    <div className=' flex gap-4 overflow-x-hidden'>
                        {expertise.map((exp, idx) => (
                            <div
                                key={idx}
                                className={` ${exp.bgColorHover} w-full rounded-lg`} 
                            >
                                <div className='hover:scale-90 transform duration-800'>
                                    <div className={`flex justify-center items-center ${exp.backgroundColor} rounded-lg h-84 mb-8`} >
                                        <img src={exp.image} alt={exp.image} className='w-64 h-64' />
                                    </div>
                                    <div className='flex flex-col gap-3 '>
                                        <h3 className='text-4xl'>{exp.title}</h3>
                                        <div className='flex gap-6'>
                                            <div>
                                                {exp.leftList.map((item, index) => (
                                                    <li key={index} className='flex flex-col'>{item}</li>
                                                ))}
                                            </div>
                                            <div>
                                                {exp.rightList.map((itemm, idex) => (
                                                    <li key={idex} className='flex flex-col'>{itemm}</li>
                                                ))}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className='w-[75vw] text-8xl mb-8'>AN AWARD WINNING STUDIO</h2>
                    <div className='flex gap-12 md:flex-col xl:flex-col overflow-x-hidden'>
                        {awards.map((award) => (
                            <div
                                key={award.id}
                                className='flex flex-col  '
                            >
                                <hr className='w-full mb-2 text-gray-300'/>
                                <div className='flex flex-col md:flex-row xl:flex-row justify-between '>
                                    <div className='flex gap-10 items-center xl:justify-between md:justify-between md:w-[35vw] xl:w-[35vw]'>
                                        <p>{award.id}</p>
                                        <h3 className='text-2xl text-left w-[15vw]'>{award.title}</h3>
                                    </div>
                                    <div className='flex flex-col xl:flex-row md:flex-row xl:gap-6 justify-between w-[50vw]'>
                                        <div className='flex flex-col w-full '>
                                            <p className='text-gray-300 text-sm'>Project</p>
                                            <p className='text-sm max-w-sm break-words'>{award.project}</p>
                                        </div>
                                        <div className='flex flex-col w-full text-left'>
                                            <p className='text-gray-300 text-sm'>Category</p>
                                            <p className='text-sm max-w-xs break-words'>{award.category}</p>
                                        </div>
                                        <div className='flex flex-col w-full text-right'>
                                            <p className='text-gray-300 text-sm'>Year</p>
                                            <p className='text-sm'>{award.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard