import Hero from "../components/Hero"
import Stats from "../components/Stats"
import { motion } from "framer-motion"
import WhyUs from "../components/WhyUs"
import Trainers from "../components/Trainers"
import Mentor from "../components/Mentor"

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hidden lg:block h-full w-[25%] 2xl:w-[30%] bg-[#1c1c13] absolute right-0 bottom-0"
        />
        <Hero />
      </div>
      <Stats />
      <WhyUs />
      <Trainers />
      <Mentor />
    </div>
  )
}

export default Home
