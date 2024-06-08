import Slider from "../components/slider"
import CategoriesSection from "../components/categoriesSection"
import FeaturedProducts from "../components/featuredProducts"

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type="featured" />
      <CategoriesSection />
      <FeaturedProducts type="trending" />
    </div>
  )
}

export default Home
