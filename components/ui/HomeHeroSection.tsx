'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, animate, cubicBezier, HTMLMotionProps } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import {
  SiPinterest,
  SiX,
  SiYoutube,
  SiInstagram,
  SiReddit,
  SiDribbble,
  SiSpotify,
  SiTiktok,
  SiLinkedin,
} from 'react-icons/si'
import HeroHeader from './HeroHeader'
import { Footer } from './Footer'
import TypewriterText from './TypewriterText'
import { isBrowser } from '@/utils/browser'

const logos = [
  {
    name: 'Pinterest',
    icon: <SiPinterest className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'X',
    icon: <SiX className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'Youtube',
    icon: <SiYoutube className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'Instagram',
    icon: <SiInstagram className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'Reddit',
    icon: <SiReddit className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'Dribbble',
    icon: <SiDribbble className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'Spotify',
    icon: <SiSpotify className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'TikTok',
    icon: <SiTiktok className="text-2xl text-red-600 md:text-3xl" />,
  },
  {
    name: 'LinkedIn',
    icon: <SiLinkedin className="text-2xl text-red-600 md:text-3xl" />,
  },
]

const AnimatedSection: React.FC<{
  className: string
  scrollTo: number
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement | null>
}> = ({ className, scrollTo, children, containerRef }) => (
  <motion.div
    className={className}
    viewport={{ amount: 0.2 }}
    onViewportEnter={() => {
      if (containerRef.current) {
        animate(
          containerRef.current,
          { scrollTop: scrollTo },
          {
            duration: 2,
            ease: cubicBezier(0.16, 1, 0.3, 1),
            type: 'tween' as const,
          }
        )
      }
    }}
  >
    {children}
  </motion.div>
)

const SnapSection = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>((props, ref) => (
  <motion.div
    ref={ref}
    {...props}
    className="snap-y snap-mandatory scroll-smooth"
  >
    {props.children}
  </motion.div>
))
SnapSection.displayName = 'SnapSection'

const HomeHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    if (!isBrowser()) return;
    setWindowHeight(window.innerHeight)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SnapSection ref={containerRef}>
      <AnimatedSection
        className="h-[calc(100vh-50px)] z-10 w-full snap-start flex items-center overflow-hidden justify-center"
        scrollTo={0}
        containerRef={containerRef}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 flex flex-col justify-between h-full items-center"
        >
          <div className="w-full z-50">
            <HeroHeader />
          </div>
          <div className="relative flex flex-col items-center justify-center max-w-lg px-12 w-fit md:max-w-4xl pb-48 pt-12 md:pt-24">
            <div className="absolute md:w-[500px] w-[300px] -z-10 h-[400px] md:h-[600px]">
              <Image
                src="https://i.pinimg.com/736x/de/99/80/de9980f559e809137bbf96585c732777.jpg"
                alt="VPN Illustrasi"
                width={612}
                height={383}
                className="mix-blend-multiply object-cover w-full h-full blur-sm"
              />
            </div>
            <h1 className=" text-center text-4xl font-black md:text-6xl ">
              Organize Your <span className="text-red-500">Digital</span> World.
            </h1>

            <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-xl md:leading-relaxed">
              Links, Notes, and Ideas, All in One Place. Simplify your life by
              keeping all your links and notes in one secure, user-friendly app.
              Get Started
            </p>

            <Link href="/dashboard">
              <Button text={'Get Started'} css="max-md:w-[400px]" />
            </Link>
          </div>

          <section className=" -mt-2 -rotate-1 border-y-2 border bg-white">
            <div className="relative z-0 flex overflow-hidden">
              <motion.div
                className="flex px-2"
                animate={{
                  x: '-50%',
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
              >
                {logos.map((logo, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-center gap-4 px-4 py-2 md:py-4"
                  >
                    {logo.icon}
                    <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                      {logo.name}
                    </span>
                  </span>
                ))}
                {logos.map((logo, index) => (
                  <span
                    key={`dup-${index}`}
                    className="flex items-center justify-center gap-4 px-4 py-2 md:py-4"
                  >
                    {logo.icon}
                    <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                      {logo.name}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="relative z-0 flex overflow-hidden border-t-2 border">
              <motion.div
                className="flex px-2"
                animate={{
                  x: '50%',
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
              >
                {logos.map((logo, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-center gap-4 px-4 py-2 md:py-4"
                  >
                    {logo.icon}
                    <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                      {logo.name}
                    </span>
                  </span>
                ))}
                {logos.map((logo, index) => (
                  <span
                    key={`dup-${index}`}
                    className="flex items-center justify-center gap-4 px-4 py-2 md:py-4"
                  >
                    {logo.icon}
                    <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                      {logo.name}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-white to-white/0"></div>
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-white to-white/0"></div>
          </section>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection
        className="min-h-screen bg-red-400 w-full flex-col overflow-hidden snap-start flex items-center justify-start"
        scrollTo={windowHeight}
        containerRef={containerRef}
      >
        <span className="flex items-center gap-2 min-h-[50px] text-lg text-white font-medium">
          Here&apos;s how it works
          <svg
            className="size-3 stroke-black animate-bounce"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.16 6.65L12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21l11.34-11.2a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0Z"></path>
          </svg>
        </span>
        <motion.div className="flex-1 w-full max-w-7xl mx-auto md:px-4 flex flex-col items-center justify-center">
          <motion.div
            className="text-4xl md:text-6xl font-bold  text-center w-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <TypewriterText
              texts={[
                'Create a Recall: Save any link, note, or idea with just one click. Add tags and descriptions to stay organized.',
                'Search & Find: Use our powerful search to instantly find what you need. Filter by tags, dates, or content type.',
                'Share & Collaborate: Share your recalls with team members or make them public. Collaboration made simple.',
                'Organize & Manage: Create collections, set reminders, and keep your digital world tidy and accessible.',
              ]}
            />
          </motion.div>
        </motion.div>
        <div className="flex  py-10 gap-6">
          <Button text={'Get Started'} variant="primary" />
          <Button text={'Help ?'} variant="secondary" />
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="relative min-h-screen w-full snap-start bg-white flex items-center justify-center"
        scrollTo={windowHeight * 2}
        containerRef={containerRef}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#006B6C] text-6xl font-bold text-center"
          >
            Support Our Project
          </motion.h2>
          <p className="text-xl text-center max-w-2xl">
            If you find Recalll helpful, consider giving us a star on GitHub. It
            helps us grow and motivates us to keep improving!
          </p>
          <motion.a
            href="https://github.com/yourusername/recalll"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Github SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Star on GitHub
          </motion.a>
        </motion.div>
        <div className="absolute bottom-0 w-full z-[1000]">
          <Footer />
        </div>
      </AnimatedSection>
    </SnapSection>
  )
}

export default HomeHeroSection
