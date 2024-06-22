const Contact = () => {
  return (
    <div className="w-full h-[350px] mt-[100px] relative">
      <div className="w-full h-full bg-black/70 absolute top-0 left-0" />
      <img
        src="/contact.jpg"
        alt="image"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 flex justify-center items-center flex-col text-white  w-full h-full  gap-[10px]">
        <p className="font-medium text-[20px]">Call us today</p>
        <p className="text-[30px] lg:text-[40px] font-bold">+91-001737320013</p>
        <p className="w-[80%]  lg:w-[60%] text-center text-white/40">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat qui
          eum natus reiciendis quos nostrum vitae, distinctio. consectetur
          adipisicing elit. Fugiat qui eum natus reiciendis quos nostrum vitae
        </p>
      </div>
    </div>
  )
}

export default Contact
