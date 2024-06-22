import { SlSocialFacebook } from "react-icons/sl"
import { FaInstagram } from "react-icons/fa"
import { CiLinkedin } from "react-icons/ci"
import { FiGithub } from "react-icons/fi"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative pt-[130px] 2xl:mt-[100px] flex lg:gap-[20px] px-[20px] lg:pl-[40px] max-w-[1400px] mx-auto"
    >
      {/* left */}
      <motion.div
        className="flex-[1]"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-bold lg:text-[50px]  text-[36px]">
          ELEVATE YOUR <br /> WORKOUT
        </h1>
        <p className="text-gray-400 text-[16px] lg:text-[18px] mt-[14px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          aspernatur sint quos saepe eligendi distinctio magni voluptatum alias,
          eveniet pariatur porro dignissimos temporibus sit similique doloribus
          consequuntur fuga blanditiis? Dignissimos.
        </p>

        <motion.button
          whileHover={{ scale: 1.2 }}
          className="my-[30px] lg:my-[35px] bg-black text-white font-semibold rounded-[10px] py-2  lg:px-6 px-4"
        >
          Get Started
        </motion.button>

        {/* icons */}
        <div className="flex gap-[20px] text-[25px] lg:text-[30px] cursor-pointer">
          <motion.span whileHover={{ scale: 1.2 }}>
            <SlSocialFacebook />
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <FaInstagram />
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <CiLinkedin />
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>
            <FiGithub />
          </motion.span>
        </div>
      </motion.div>

      {/* right */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex flex-[1]  justify-end relative"
      >
        <img
          src="/hero-image.png"
          alt="image"
          className="w-[600px] h-[550px] object-cover"
        />
      </motion.div>
    </div>
  )
}

export default Hero
