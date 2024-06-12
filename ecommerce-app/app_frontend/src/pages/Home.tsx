import Slider from "../components/slider"
import CategoriesSection from "../components/categoriesSection"
import FeaturedProducts from "../components/featuredProducts"
import Contact from "../components/contact"

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type="isFeatured" />
      <CategoriesSection />
      <FeaturedProducts type="isTrending" />
      <Contact />
    </div>
  )
}

export default Home
