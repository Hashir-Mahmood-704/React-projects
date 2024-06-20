import { trainerData } from "../utils/data"

const TrainerCard = ({ item }) => {
  return (
    <div className="w-[250px] h-[350px] 2xl:w-[300px] 2xl:h-[400px] rounded-[20px] overflow-hidden shadow-xl relative">
      <img src={item.image} alt="" className="object-cover h-full w-full " />

      <div className="p-[25px] w-full h-full bg-black/60 absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-100 transition-all ease-in-out duration-500 text-white">
        <h3 className="font-semibold text-[22px] lg:text-[25px]">
          {item.title}
        </h3>
        <p className="mt-[20px] text-[14px] lg:text-[16px]">
          {item.description}
        </p>
      </div>
    </div>
  )
}

const Trainers = () => {
  return (
    <div
      id="trainers"
      className="pt-[100px] px-[20px] lg:px-[40px] max-w-[1400px] mx-auto"
    >
      <h1 className="font-bold text-[30px] lg:text-[40px] text-center">
        Meet Our Trainers
      </h1>
      <p className="text-[14px] my-[20px] lg:text-[16px] text-gray-500 text-center lg:w-[80%] mx-auto">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
        molestias fugit, iste repudiandae adipisci necessitatibus ullam placeat.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat
        magnam, quo quidem
      </p>

      <div className="mt-[100px] flex flex-col items-center lg:flex-row justify-between gap-[40px] lg:gap-0">
        {trainerData.map((item) => (
          <TrainerCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Trainers
