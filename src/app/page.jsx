import Hero from '../../src/components/home/Hero'
import DiscoverCollection from '../../src/components/home/DiscoverCollection'
import OurPopularItems from '../../src/components/home/OurPopularItems'
import ShopStunning from '../../src/components/home/ShopStunning'
import Review from '../../src/components/home/Review'
export const metadata = {
  title: "Cathy’s Jewelry | Home",
  description: "Welcome to Cathy’s Jewelry, Chicago's trusted destination for custom designs, expert repairs, and fine jewelry.",
};
const Home = () => {
  
  return (
    
    <div >
      <Hero></Hero>
      <DiscoverCollection></DiscoverCollection>
      <OurPopularItems></OurPopularItems>
      <ShopStunning></ShopStunning>
      <Review></Review>
    </div>
  );
};

export default Home;


