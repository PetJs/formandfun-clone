import NavBar from './components/navbar'
import { MagicText } from './components/magicText'
import { useEffect, useRef, useState } from 'react'
import Lottie from "lottie-react"
import formAndFun from "./assets/video/formandfun.json"
import FormAndFun from "./assets/images/FormFun.svg"
import { media, expertise, awards, gif, brands } from './constants'
import Logo from "./assets/logo/formandfun-logo.png"



const Dashboard = () => {
    const studioRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const ANIMATION_MS = 2000; // <-- tweak to match your Lottie duration (ms)
    const [overlayVisible, setOverlayVisible] = useState(true);
    const [active, setActive] = useState(brands.map(() => 0));
    const [hovered, setHovered] = useState<number | null>(null);

    const duration = 3000;
    useEffect(() => {
        const intervals = brands.map((brand, i) => 
            setInterval(() => {
                setActive((prev) => {
                    const copy = [...prev];
                    copy[i] = (copy[i] + 1) % brand.logos.length;
                    return copy;
                })
            }, duration)
        )

        return () => intervals.forEach((id) => clearInterval(id));
    }, [brands, duration]);

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

    const [transformX, setTransformX] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    
    const SPEED_FACTOR = 0.5; 

    useEffect(() => {
        // Function to update the translation based on scroll position
        const handleScroll = () => {
            // Get the current vertical scroll position
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            
            // Calculate the new translation value. 
            // We use the negative scroll position multiplied by the speed factor 
            // to achieve the desired effect relative to the content's position on the screen.
            setTransformX(scrollY * SPEED_FACTOR);
        };

        // Attach the scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const contentDuplicates = Array(15).fill(0);
    

    return(
        <div className='p-2 h-screen'>
            {overlayVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="w-[70vw] max-w-[900px]">
                    <Lottie animationData={formAndFun} loop={false} autoplay className="w-full" />
                    </div>
                </div>
            )}

            <div className={`transition-opacity space-y-12 duration-500 ${overlayVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <NavBar targetRef={studioRef}/>

                <div className='flex justify-center items-center xl:h-[60vh] h-[20vh] w-full' ref={studioRef}>
                    <Lottie 
                        animationData={formAndFun}
                        loop={false}
                        className='xl:w-[50vw] w-[40vw]'
                    />
                </div>
                

                <section className='' >
                    <video 
                        src="https://res.cloudinary.com/dm7vlpslq/video/upload/v1759604931/formandfunsizzle_k1h5n4.mp4"
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
                            className="w-[75vw] h-[45vh] xl:w-[25vw] xl:h-[60vh] object-cover rounded-xl"
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

                <section className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2'>
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
                            <video 
                                src={item.video}  
                                loop 
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}
                                className='rounded-lg h-full sm:h-[50vh] object-cover'
                            />
                            <div className='xl:group-hover:absolute xl:hidden xl:group-hover:block xl:group-hover:top-0 xl:group-hover:left-0 xl:group-hover:text-white xl:group-over:flex xl:group-hover:justify-between p-2'>
                                <p className='font-semibold'>{item.title}</p>
                                <span className='font-medium'>{item.description}</span>
                                <span className='text-xl hidden xl:group-hover:block'>+</span>
                            </div>
                        </div>
                    ))} 
                </section>

                <section className='overflow-x-hidden'>
                    <div ref={trackRef} className=" flex gap-12"
                        style={{ 
                            transform: `translateX(-${transformX}px)`,
                            transition: "1s linear",
                            width: 'max-content',
                        }}
                    >
                        {contentDuplicates.map((_, idx) => (
                            <div key={idx} className='flex  gap-12 items-center flex-shrink-0'>
                                <img src={FormAndFun} alt="formFun.svg" className='w-[30vw]' />
                                <div className='text-center flex flex-col text-[10px] xl:text-[16px]'>
                                    <p>CREATIVE</p>
                                    <p>TECHNOLOGY</p>
                                    <p>STUDIO</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className='mb-12'>
                    <p>Expertise & Capabilities</p>
                    <div className=' flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory'>
                        {expertise.map((exp, idx) => (
                            <div
                                key={idx}
                                className={` ${exp.bgColorHover} w-full rounded-lg`} 
                            >
                                <div className='hover:scale-90 flex flex-col gap-24 transform duration-800 p-2 xl:gap-12'>
                                    <div className={`flex justify-center items-center rounded-lg h-84 sm:w-[85vw] xl:w-full  mb-8`} >
                                        <video src={exp.image} 
                                            loop 
                                            onMouseEnter={(e) => e.currentTarget.play()}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.pause();
                                                e.currentTarget.currentTime = 0;
                                            }}
                                            className='mt-4'
                                        />
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
                    <h2 className='w-[75vw] xl:text-8xl text-4xl mb-8'>AN AWARD WINNING STUDIO</h2>
                    <div className='flex gap-12 md:flex-col xl:flex-col overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory'>
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

                <section>
                    <h2 className='text-2xl xl:text-6xl font-semibold w-[75vw] mb-6'>Trusted by the world's leading brands</h2>
                    <div className='flex space-x-2 justify-between mb-6'>
                        {brands.map((item, idx) => {
                            const activeLogo = item.logos[active[idx]];
                            const isHovered = hovered === idx;
                            const bgColor = isHovered
                                ? activeLogo.bg
                                : "#f9f9f9";
                            
                            return (
                                <div 
                                    className={`relative overflow-hidden bg-gray-50 rounded-lg flex justify-center transition-all ease-in-out duration-700 space-x-4 items-center xl:w-[25vw] xl:h-[35vh] w-[40vw] h-[15vh]`} 
                                    style={{ backgroundColor: bgColor }}
                                    onMouseEnter={() => setHovered(idx)}
                                    onMouseLeave={() => setHovered(null)}
                                    key={idx}
                                >
                                    <div className="absolute top-0 left-0 w-full transition-transform duration-700 ease-in-out"
                                        style={{
                                            height: `${item.logos.length * 100}%`,
                                            transform: `translateY(-${active[idx] * (100 / item.logos.length)}%)`,
                                        }}
                                    >
                                        {item.logos.map((logo, index) => (
                                            <div key={index} className="w-full xl:h-[35vh] h-[15vh] flex justify-center items-center  ">
                                                <img 
                                                    src={isHovered ? logo.white : logo.black} alt="" className='transition-transform duration-700' 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className='flex justify-between'>
                    <div>
                        <img src={Logo} alt="" className='w-16 h-16' />
                    </div>
                    <div className='flex xl:flex-row flex-col xl:gap-24 gap-6 mr-24 xl:mr-36'>
                        <div className='flex xl:gap-36 gap-12'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-gray-400'>Menu</p>
                                <ul className='flex flex-col gap-2'>
                                    <li>Studio</li>
                                    <li>Contact</li>
                                    <li>Work</li>
                                </ul>
                            </div>
                            
                            <div className=''>
                                <p className='text-gray-400'>Social</p>
                                <ul className=''>
                                    <li>Instagram</li>
                                    <li>Linkedin</li>
                                    <li>Behance</li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-gray-400'>Business enquiries</p>
                                <span>hi@formandfun.co</span>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <p className='text-gray-400'>Join our team</p>
                                <span>apply@formandfun.co</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div >
                    <Lottie 
                        animationData={formAndFun}
                        loop={false}
                        className='w-full'
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard