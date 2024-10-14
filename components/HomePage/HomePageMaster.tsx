import HomeBanner from './BannerSection/HomeBanner';
import TopCategories from './PersonalizedCategories/TopCategories';
import BrandListing from './BrandSection/BrandListingMaster';
import CollectionsMaster from './FeaturedCollections/Collection/CollectionMaster';
import style from '../../styles/components/home.module.scss';
import TabbedCollectionMaster from './FeaturedCollections/TabbedFeaturedCollection/TabbedCollectionMaster';
import CountDownComponent from './FeaturedCollections/CountDown/CountDownComponent';
import CountDownWithProduct from './FeaturedCollections/CountDownWithProduct.tsx/CountDownWithProduct';

const HomePageMaster = () => {
  return (
    <>
      <HomeBanner />
      <div className={`row ps-lg-5 pe-lg-5 ${style.backgoundColor}`}>
        <TopCategories />
        <BrandListing />
        <CollectionsMaster />
        <TabbedCollectionMaster />
        <CountDownWithProduct />
      </div>
    </>
  );
};

export default HomePageMaster;
