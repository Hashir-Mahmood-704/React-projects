import Slider from "../components/slider"
import CategoriesSection from "../components/categoriesSection"
import FeaturedProducts from "../components/featuredProducts"
import Contact from "../components/contact"

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type="featured" />
      <CategoriesSection />
      <FeaturedProducts type="trending" />
      <Contact />
    </div>
  )
}

export default Home
