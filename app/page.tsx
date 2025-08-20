"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import {
  Moon,
  Sun,
  Linkedin,
  Instagram,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  Send,
  Menu,
  X,
  ArrowDown,
  Check,
  Github,
  Code,
  Server,
  Shield,
  Database,
  Globe,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import MinimalSplash from "../components/splash-screen/minimal-splash"

// Typing Animation Component
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * 20,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 400)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-blue-600 dark:text-blue-400"
      >
        _
      </motion.span>
    </span>
  )
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const { scrollYProgress } = useScroll()

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  useEffect(() => {
    document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease"
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"

    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced intersection observer with better debugging
  useEffect(() => {
    const sections = ["hero", "about", "skills", "education", "experience", "certifications", "contact"]

    // Function to determine which section is currently active based on scroll position
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i])
            return
          }
        }
      }

      // If we're at the very top, set hero as active
      if (window.scrollY < 100) {
        setActiveSection("hero")
      }
    }

    // Initial check
    updateActiveSection()

    // Add scroll listener
    const handleScroll = () => {
      updateActiveSection()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Also use intersection observer as backup
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                setActiveSection(sectionId)
              }
            })
          },
          {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: "-10% 0px -10% 0px",
          },
        )
        observer.observe(element)
        return observer
      }
      return null
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [showSplash]) // Add showSplash dependency to reinitialize after splash

  const skillCategories = [
    {
      title: "Web Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: ["Tailwind CSS", "Framer Motion", "MERN", "Wordpress", "Firebase"],
    },
    
    {
      title: "Cybersecurity & Networking",
      icon: Shield,
      color: "from-red-500 to-rose-500",
      skills: ["Kali Linux", "Burp Suite", "NMap", "WireShark", "PuTTY"],
    },
    {
      title: "Programming Languages",
      icon: Code,
      color: "from-indigo-500 to-blue-500",
      skills: ["C++", "Java", "Python"],
    },
    {
      title: "Other Tools & Utilities",
      icon: Wrench,
      color: "from-gray-500 to-slate-500",
      skills: ["Launch 4J", "Postman", "REST Api", "Git and Github"],
    },
  ]

  const navItems = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleThemeToggle = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    document.documentElement.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
    document.body.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
    setDarkMode(!darkMode)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const { sendEmail } = await import("../lib/emailjs")

      const templateParams = {
        from_name: formData.get("name"),
        from_email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        to_name: "Nikhil Garg",
        to_email: "Official.nikhilgarg@gmail.com",
      }

      const result = await sendEmail(templateParams)

      if (result.success) {
        setFormStatus("sent")
        form.reset()
      } else {
        throw new Error("Failed to send email")
      }

      setTimeout(() => {
        setFormStatus("idle")
      }, 4000)
    } catch (error) {
      console.error("Email sending error:", error)
      setFormStatus("error")
      setTimeout(() => {
        setFormStatus("idle")
      }, 4000)
    }
  }

  const handleDownloadCV = () => {
    const driveLink = "https://drive.google.com/uc?export=download&id=1jkJOfkLWTtUeT-rZZZFfFtY87WHD0803"
    window.open(driveLink, "_blank")
  }

  // Debug: Add this to see what's happening
  useEffect(() => {
    console.log("Active section:", activeSection)
  }, [activeSection])

  return (
    <>
      {showSplash && <MinimalSplash onComplete={handleSplashComplete} duration={2500} />}
      {!showSplash && (
        <div className={`min-h-screen transition-all duration-300 ease-in-out ${darkMode ? "dark" : ""}`}>
          {/* Theme Toggle */}
          <motion.div
            className="fixed top-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              onClick={handleThemeToggle}
              disabled={isTransitioning}
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-blue-600" />}
              </motion.div>
            </Button>
          </motion.div>

          {/* Mobile Navigation Toggle */}
          <motion.div
            className="fixed top-6 left-6 z-50 md:hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200"
            >
              <motion.div initial={false} animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-blue-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-blue-600 dark:text-gray-300" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Mobile Navigation Menu */}
          <motion.div
            className="fixed top-20 left-6 z-40 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: mobileMenuOpen ? 1 : 0,
              y: mobileMenuOpen ? 0 : -20,
            }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
          >
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-gray-100 transition-colors duration-150 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    x: mobileMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Desktop Navigation - Fixed with better active detection */}
          <motion.nav
            className="hidden md:flex fixed top-1/2 right-8 transform -translate-y-1/2 z-40 flex-col space-y-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {[{ name: "Hero", id: "hero" }, ...navItems].map((item, index) => (
              <motion.div key={item.name} className="relative flex items-center justify-center w-4 h-4">
                <motion.button
                  onClick={() => {
                    const element = document.getElementById(item.id)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                      // Immediately set active section for better UX
                      setActiveSection(item.id)
                    }
                  }}
                  className="relative w-full h-full flex items-center justify-center group"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={item.name}
                >
                  {activeSection === item.id ? (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 shadow-lg"
                      initial={{ scale: 0.5 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 0 8px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    />
                  ) : (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gray-400/60 dark:bg-gray-500/60 group-hover:bg-blue-400/80 dark:group-hover:bg-blue-400/80 transition-all duration-200"
                      whileHover={{ scale: 1.5 }}
                    />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.nav>

          {/* Hero Section */}
          <section
            id="hero"
            className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <TypingAnimation text="Nikhil Garg" delay={100} />
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
              >
                Full Stack Developer
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.5, ease: "easeOut" }}
              >
                Creating beautiful, functional, and user-centered digital experiences with modern technologies and
                innovative design solutions.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.8, ease: "easeOut" }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-blue-600 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <a href="https://www.linkedin.com/in/nikhil-garg8982/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="border-2 border-gray-700 text-gray-700 bg-transparent hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 hover:text-white hover:border-gray-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <a href="https://github.com/Nikhilgarg0" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 hover:text-white hover:border-pink-500 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <a href="https://www.instagram.com/__nikhil.notfound/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-5 h-5 mr-2" />
                      Instagram
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleDownloadCV}
                    className="border-2 border-slate-600 text-slate-600 bg-transparent hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:border-slate-600 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollY < 100 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() => scrollToSection("#about")}
                  className="text-blue-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-gray-300 transition-colors duration-200"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <motion.section
            id="about"
            className="py-20 px-6 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6 mb-16"
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I've always been the person who needs to know how things really work. What started as a hobby tinkering with HTML and CSS quickly became an obsession. I wasn't just satisfied building a website; I wanted to build the entire engine behind it.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  That drive led me to full-stack Java development, where I'm learning to architect and build complete applications using Spring Boot and Node.js. But for me, the code is only half the story. Getting my hands dirty with Cisco routers during my CCNA training was a game-changer. Suddenly, I could see the hidden infrastructure that makes the internet possible, and it sparked a new fascination with securing those systems.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Now, my interests lie at the intersection of creation and defense. I'm captivated by cybersecurity, ethical hacking, and building secure cloud infrastructure. Whether I'm mastering a new framework or trying to understand a vulnerability, my goal is the same: go deeper than the surface. I believe the best way to build something is to first understand how to break it.
                </p>
                
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/20 dark:to-gray-600/20 rounded-2xl p-6 border border-blue-100 dark:border-gray-600/30 h-fit">
                    <h4 className="font-semibold text-blue-700 dark:text-gray-200 mb-2">Current Focus</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Java Full Stack Development & Backend Technologies
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-gray-600/20 dark:to-gray-700/20 rounded-2xl p-6 border border-indigo-100 dark:border-gray-600/30 h-fit">
                    <h4 className="font-semibold text-indigo-700 dark:text-gray-200 mb-2">Interests</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Cybersecurity, DevOps, Cloud Platforms, REST APIs
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/20 dark:to-gray-600/20 rounded-2xl p-6 border border-slate-100 dark:border-gray-600/30 h-fit">
                    <h4 className="font-semibold text-slate-700 dark:text-gray-200 mb-2">Goal</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Become a competent and confident full-stack developer
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Skills & Technologies
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, categoryIndex) => {
                  const IconComponent = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-100 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300 h-full">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <CardTitle className="text-lg text-gray-800 dark:text-gray-100">{category.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                viewport={{ once: true }}
                              >
                                <Badge className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 dark:hover:from-gray-600 dark:hover:to-gray-700 hover:text-white hover:border-transparent text-gray-700 dark:text-gray-200 px-3 py-1 text-xs font-medium transition-all duration-200 hover:shadow-md">
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            className="py-20 px-6 bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Education
              </motion.h2>

              <div className="space-y-8">
                {[
                  {
                    institution: "Medicaps University",
                    degree: "B.Tech - Computer Science & Engineering",
                    period: "2022 - 2026",
                    grade: "CGPA: 6.47 / 10",
                    delay: 0,
                  },
                  {
                    institution: "Holy Angels High Secondary School, Kurawar",
                    degree: "12th - MPBSE",
                    period: "2021 - 2022",
                    grade: "Percentage: 71 / 100",
                    delay: 0.1,
                  },
                  {
                    institution: "Holy Angels High Secondary School, Kurawar",
                    degree: "10th - MPBSE",
                    period: "2019 - 2020",
                    grade: "Percentage: 81 / 100",
                    delay: 0.2,
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: edu.delay }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/10 dark:to-gray-600/10 border border-blue-100 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-600 dark:to-gray-700 rounded-full">
                              <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
                                {edu.institution}
                              </CardTitle>
                              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                                {edu.degree}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 border border-blue-200 dark:border-gray-600">
                            {edu.period}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">{edu.grade}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            id="experience"
            className="py-20 px-6 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Experience
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-r from-blue-50 to-slate-50 dark:from-gray-700/10 dark:to-gray-600/10 border border-blue-100 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-slate-500 dark:from-gray-600 dark:to-gray-700 rounded-full">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-800 dark:text-gray-100">CISCO</CardTitle>
                          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                            IT / Computers - Software Intern
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 border border-blue-200 dark:border-gray-600">
                        07 Jun, 2025 - 04 Jul, 2025
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-gray-200 border border-indigo-200 dark:border-gray-600">
                        Networking
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      During my CCNA internship, I gained practical experience in networking concepts and Cisco device
                      configuration. I worked with routers and switches to set up and troubleshoot real and simulated
                      network environments. The internship enhanced my understanding of core networking principles such
                      as IP addressing, subnetting, VLAN configuration, and routing protocols like RIP and OSPF.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            id="certifications"
            className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Certifications
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700/10 dark:to-gray-600/10 border border-indigo-100 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-gray-600 dark:to-gray-700 rounded-full">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-800 dark:text-gray-100">How to CSS</CardTitle>
                            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                              CodeKaro
                            </CardDescription>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 font-medium"
                          >
                            <a
                              href="https://codekaro.in/course-certificate/230e2cff851509019"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Certificate
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Badge className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 border border-blue-200 dark:border-gray-600">
                          CSS
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Comprehensive CSS certification covering modern styling techniques and best practices.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700/10 dark:to-gray-600/10 border border-blue-100 dark:border-gray-600/30 hover:shadow-lg transition-all duration-200 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-gray-600 dark:to-gray-700 rounded-full">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
                              CCNA: Enterprise Networking, Security, and Automation
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                              Cisco
                            </CardDescription>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 font-medium"
                          >
                            <a
                              href="https://drive.google.com/file/d/14qboPZx3Owx4CQlIbuEy9W-cZfauQYR4/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Certificate
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge className="bg-cyan-100 dark:bg-gray-700 text-cyan-800 dark:text-gray-200 border border-cyan-200 dark:border-gray-600">
                          Networking
                        </Badge>
                        <Badge className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 border border-blue-200 dark:border-gray-600">
                          Security
                        </Badge>
                        <Badge className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-gray-200 border border-indigo-200 dark:border-gray-600">
                          Automation
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Advanced networking certification covering enterprise networking, security protocols, and
                        network automation technologies.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Contact Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-100 dark:border-gray-600/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-gray-800 dark:text-gray-100">
                      Let's Work Together
                    </CardTitle>
                    <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300">
                      Have a project in mind? Let's discuss how we can bring your ideas to life.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 dark:text-gray-200 font-medium">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            className="bg-white/50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-gray-500 transition-all duration-200 dark:text-gray-100"
                            disabled={formStatus === "sending"}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-white/50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-gray-500 transition-all duration-200 dark:text-gray-100"
                            disabled={formStatus === "sending"}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 dark:text-gray-200 font-medium">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="inquiry subject"
                          className="bg-white/50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-gray-500 transition-all duration-200 dark:text-gray-100"
                          disabled={formStatus === "sending"}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700 dark:text-gray-200 font-medium">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your query..."
                          rows={5}
                          className="bg-white/50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-gray-500 transition-all duration-200 dark:text-gray-100"
                          disabled={formStatus === "sending"}
                          required
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: formStatus === "idle" ? 1.02 : 1 }}
                        whileTap={{ scale: formStatus === "idle" ? 0.98 : 1 }}
                      >
                        <Button
                          type="submit"
                          disabled={formStatus !== "idle"}
                          className={`w-full py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 ${
                            formStatus === "sent"
                              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                              : formStatus === "error"
                                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          } text-white border-0`}
                        >
                          <motion.div
                            className="flex items-center justify-center"
                            animate={{
                              scale: formStatus === "sending" ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: 0.3,
                              repeat: formStatus === "sending" ? Number.POSITIVE_INFINITY : 0,
                            }}
                          >
                            {formStatus === "idle" && (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                              </>
                            )}
                            {formStatus === "sending" && (
                              <>
                                <motion.div
                                  className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                />
                                Sending...
                              </>
                            )}
                            {formStatus === "sent" && (
                              <>
                                <Check className="w-5 h-5 mr-2" />
                                Message Sent!
                              </>
                            )}
                            {formStatus === "error" && (
                              <>
                                <X className="w-5 h-5 mr-2" />
                                Try Again
                              </>
                            )}
                          </motion.div>
                        </Button>
                      </motion.div>
                    </form>

                    {formStatus === "sent" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center"
                      >
                        <p className="text-green-700 dark:text-green-300 font-medium">
                          Thank you for your message! I'll get back to you soon.
                        </p>
                      </motion.div>
                    )}

                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center"
                      >
                        <p className="text-red-700 dark:text-red-300 font-medium">
                          Something went wrong. Please try again or contact me directly.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="py-12 px-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-t border-blue-100 dark:border-gray-600/30 transition-all duration-300">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6">© 2025 Nikhil Garg. All rights reserved.</p>
                <div className="flex justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      asChild
                      size="icon"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-full"
                    >
                      <a href="https://www.linkedin.com/in/nikhil-garg8982/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      asChild
                      size="icon"
                      className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border-0 rounded-full"
                    >
                      <a href="https://github.com/Nikhilgarg0" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      asChild
                      size="icon"
                      className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-blue-200 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-gray-800/20 text-blue-600 dark:text-gray-400 rounded-full"
                    >
                      <a href="https://www.instagram.com/__nikhil.notfound/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
