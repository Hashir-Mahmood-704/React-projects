const Mentor = () => {
  return (
    <div className="px-[20px] lg:px-[40px] pt-[120px] flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full gap-[40px]">
      {/* left */}
      <div className="flex-[1] flex gap-[10px] lg:gap-[20px]">
        <img
          src="/coach-1.jpg"
          alt="coach-1"
          className="h-[250px] md:h-[300px] object-cover flex-[1] rounded-[15px]"
        />
        <img
          src="/coach-2.jpg"
          alt="coach-2"
          className="h-[250px] md:h-[300px] object-cover flex-[1.5] rounded-[15px]"
        />
      </div>

      {/* right */}
      <div className="flex-[1.5] flex flex-col justify-between items-start">
        <p className="font-medium text-[18px] lg:text-[22px] text-[#1c1c13]">
          Are you looking for a mentor?
        </p>
        <h3 className="text-[30px] my-[10px] lg:text-[40px] font-bold">COACHES</h3>
        <p className="text-[14px] lg:text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          itaque dolor tempore consequatur aperiam voluptates. Quae, alias!
          Tempora itaque rem vitae sunt at quae, sit perferendis cumque,
          obcaecati, est cupiditate? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Esse maxime ducimus
        </p>
        <button className="mt-[20px] bg-black text-white font-semibold rounded-[10px] py-3 lg:px-6 px-4 text-[14px] lg:text-[18px]">
          Explore more
        </button>
      </div>
    </div>
  )
}

export default Mentor
