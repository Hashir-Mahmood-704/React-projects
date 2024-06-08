import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGoogle,
  FaPinterest,
} from "react-icons/fa"

const Contact = () => {
  return (
    <div className="flex justify-center items-center bg-blue-600 py-[25px] px-[15px] text-white">
      <div className="flex gap-[20px] lg:gap-0 flex-col lg:flex-row justify-center lg:justify-between items-center w-[60%]">
        <span>BE IN TOUCH WITH US</span>
        <div className="flex flex-col lg:flex-row items-center">
          <input
            placeholder="Enter here"
            type="text"
            className="outline-none h-[40px] lg:border-r lg:rounded-l-lg text-black px-3 rounded-lg lg:rounded-none"
          />
          <button className="bg-black h-[40px] px-3 rounded-lg lg:rounded-none mt-[14px] lg:mt-0 lg:rounded-r-lg">
            Join Us
          </button>
        </div>
        <div className="flex text-[20px] items-center gap-[8px]">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaGoogle />
          <FaPinterest />
        </div>
      </div>
    </div>
  )
}

export default Contact
