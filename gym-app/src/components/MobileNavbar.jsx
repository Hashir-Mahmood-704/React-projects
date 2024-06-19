import { RxHamburgerMenu } from "react-icons/rx"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { navItems } from "../utils/navItems"
import { useState, useEffect } from "react"


const MobileNavbar = () => {
  const [openSidebar, setopenSidebar] = useState(false)
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
      className={`fixed w-full flex items-center h-[60px] px-[10px] lg:hidden justify-between z-[5] bg-white ${
        scrolled && "shadow-md"
      }`}
    >
      {/* left */}
      <span className="z-[2] relative" onClick={() => setopenSidebar(true)}>
        <RxHamburgerMenu size={20} />
      </span>

      {/* center */}
      <div className="z-[1] absolute left-0 right-0 top-[3px] bottom-0">
        <img src="/gym-logo.png" alt="logo" className="h-[55px] m-auto" />
      </div>

      {/* right */}
      <span className="z-[2] border bg-black text-white text-[12px] p-2 font-semibold rounded-[5px]">
        <Link to="/exercises">Exercises</Link>
      </span>
      <AnimatePresence>
        {openSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setopenSidebar(false)}
            className="z-10 absolute h-screen w-screen top-0 left-0 bg-black/70"
          >
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              exit={{ x: -400 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full bg-white w-[70%] relative flex flex-col justify-center items-center"
            >
              <span
                className="absolute right-[15px] top-[15px]"
                onClick={() => setopenSidebar(false)}
              >
                <IoIosCloseCircleOutline size={30} />
              </span>

              <div className="flex flex-col gap-[25px] items-center">
                {navItems.map((item) => (
                  <a
                    onClick={() => setopenSidebar(false)}
                    key={item.label}
                    href={item.to}
                    className="text-[24px] font-semibold"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MobileNavbar
