import Hero from "../components/Hero"
import Stats from "../components/Stats"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-full ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hidden lg:block h-full w-[25%] bg-[#1c1c13] absolute right-0 bottom-0"
        />
        <Hero />
      </div>
      <Stats />
    </div>
  )
}

export default Home
