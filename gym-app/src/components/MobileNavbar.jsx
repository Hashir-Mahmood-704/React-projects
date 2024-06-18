import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

const MobileNavbar = () => {
  const [openSidebar, setopenSidebar] = useState(false)
  return (
    <div className="relative flex items-center h-[60px] px-[10px]  lg:hidden justify-between">
      <span className="z-[2]" onClick={() => setopenSidebar(true)}>
        <RxHamburgerMenu size={20} />
      </span>

      <div className="z-[1] absolute left-0 right-0 top-[5px] bottom-0">
        <img src="/gym-logo.png" alt="logo" className="h-[60px] m-auto" />
      </div>

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
              className="h-full bg-white w-[70%]"
            >
              <button onClick={() => setopenSidebar(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavbar
