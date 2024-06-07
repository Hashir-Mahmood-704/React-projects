const Footer = () => {
  return (
    <div className=" lg:mt-[100px] lg:mx-[150px] lg:mb-[20px] mt-[20px]">
      {/* top */}
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[50px] text-gray-700 px-[15px] ">
        {/* column 1 */}
        <div className="flex flex-col gap-[4px] lg:gap-[10px] items-start flex-1 text-[14px]">
          <h1 className="font-bold text-[18px] text-[#555]">Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>

        {/* column 2 */}
        <div className="flex flex-col gap-[4px] lg:gap-[10px] items-start flex-1 text-[14px]">
          <h1 className="font-bold text-[18px] text-[#555]">Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>

        {/* column 3 */}
        <div className="flex-1">
          <h1 className="font-bold text-[18px] text-[#555]">About</h1>
          <span className="text-justify text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            odit beatae assumenda expedita cupiditate sed magni quis eveniet
            nostrum, asperiores deleniti possimus ullam aliquid accusantium
            maxime modi. Ipsum, voluptatibus earum.
          </span>
        </div>

        {/* column 4 */}
        <div className="flex-1">
          <h1 className="font-bold text-[18px]">Contact</h1>
          <span className="text-justify text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            odit beatae assumenda expedita cupiditate sed magni quis eveniet
            nostrum, asperiores deleniti possimus ullam aliquid accusantium
            maxime modi. Ipsum, voluptatibus earum.
          </span>
        </div>
      </div>
      {/* bottom */}
      <div className="flex flex-col items-center justify-between mt-[50px]">
        {/* left */}
        <div className="flex items-center">
          <span className="font-bold text-[#2879fe] text-[20px] lg:text-[24px]">
            My Store
          </span>
          <span className="text-gray ml-[20px] text-[14px]">
            Copyright 2023. All rights reserved
          </span>
        </div>
        {/* right */}
        <div>
          <img
            src="/payment.png"
            alt="payment"
            className="h-[40px] lg:h-[60px]"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
