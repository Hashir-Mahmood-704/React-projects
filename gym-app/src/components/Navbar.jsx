import { Link } from "react-router-dom"
import { navItems } from "../utils/navItems"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      if (scrollY > 0) setScrolled(true)
      else setScrolled(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`hidden lg:flex fixed top-0 left-0 right-0 justify-between h-[75px] transition-all ease-in-out duration-[0.5s] items-center px-[40px] z-50 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* left */}
      <div>
        <Link to="/">
          <motion.img
            whileHover={{ scale: 1.2 }}
            src="/gym-logo.png"
            alt="logo"
            className="h-[70px]"
          />
        </Link>
      </div>
      {/* middle */}
      <div className="flex gap-[40px]">
        {navItems.map((item) => (
          <motion.a whileHover={{ scale: 1.2 }} href={item.to} key={item.label}>
            <span className="font-semibold text-[18px]">{item.label}</span>
          </motion.a>
        ))}
      </div>
      {/* right */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="bg-black text-white font-semibold rounded-[5px] py-2 px-3"
      >
        <Link to="/exercises">Exercises</Link>
      </motion.div>
    </motion.div>
  )
}

export default Navbar
