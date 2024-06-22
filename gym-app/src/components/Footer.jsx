const Footer = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full p-[30px] md:p-[50px] flex flex-col md:flex-row gap-[25px] justify-around items-start">
      <div className="md:w-[300px]">
        <img src="/footer-logo.png" alt="footer" className="w-[100px] " />
        <p className="text-gray-400 mt-[15px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, iusto in!
          Quam dignissimos id repellendus voluptate cupiditate quas ex minus
          ipsam harum, tenetur nobis similique impedit ipsa fugiat tempora odio.
        </p>
      </div>
      <div className="text-gray-400 flex flex-col items-start">
        <h3 className="text-black font-semibold text-[20px]">Menu</h3>
        <span>Home</span>
        <span>About</span>
        <span>Trainers</span>
        <span>Plans</span>
        <span>Reviews</span>
      </div>
      <div className="text-gray-400 flex flex-col items-start">
        <h3 className="text-black font-semibold text-[20px]">Social Media</h3>
        <span>LinkedIn</span>
        <span>Facebook</span>
        <span>Instagram</span>
        <span>Github</span>
      </div>
    </div>
  )
}

export default Footer
