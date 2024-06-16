import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CategoriesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.2 }}
      className=" flex flex-col md:flex-row  gap-[10px] md:h-[80vh] mx-[10px] capitalize font-semibold"
    >
      {/* col1 */}
      <div className="flex flex-col flex-[1] gap-[10px]">
        {/* col1 row1 */}
        <div className=" h-[100px] flex  flex-[1] relative overflow-hidden">
          <img
            src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="image"
            className="w-full h-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.3 }}
            className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
          >
            <Link to="/products/all">Sale</Link>
          </motion.button>
        </div>
        {/* col1 row2 */}
        <div className="flex  flex-[1] relative overflow-hidden">
          <img
            src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="image"
            className="w-full h-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.3 }}
            className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
          >
            <Link to="/products/women">Women</Link>
          </motion.button>
        </div>
      </div>

      {/* col2 */}
      <div className="flex flex-col flex-[1] gap-[10px] ">
        {/* col2 row */}
        <div className="flex relative flex-[1] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="image"
            className="w-full h-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.3 }}
            className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
          >
            <Link to="/products/all">Season</Link>
          </motion.button>
        </div>
      </div>

      {/* col3 */}
      <div className="flex flex-col flex-[2] gap-[10px]">
        {/* col3 row1  */}
        <div className="flex gap-[10px] flex-[1] overflow-hidden">
          {/* col3 row1 col1 */}
          <div className="flex-[1]">
            {/* col3 row1 col1 row */}
            <div className="w-full h-full relative">
              <img
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="image"
                className="w-full h-full object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.3 }}
                className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
              >
                <Link to="/products/men">Men</Link>
              </motion.button>
            </div>
          </div>
          {/* col3 row1 col2 */}
          <div className="flex-[1]">
            {/* col3 row1 col2 row */}
            <div className="w-full h-full relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="image"
                className="w-full h-full object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.3 }}
                className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
              >
                <Link to="/products/all">Accessories</Link>
              </motion.button>
            </div>
          </div>
        </div>
        {/* col3 row2  */}
        <div className="flex  relative  flex-[1] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="image"
            className="w-full h-full object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.3 }}
            className="absolute bg-white rounded-md top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto  py-[10px] px-[20px] border-none"
          >
            <Link to="/products/all">Shoes</Link>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CategoriesSection
