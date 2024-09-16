import { useState } from 'react';
import dynamic from 'next/dynamic';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import ProductDetailImageGallery from './ProductDetailImageGallery';
import ProductDetailDescribtionSection from './ProductDetailDescribtionSection';
import ProductDetailSpecsAndTech from './ProductDetailSpecsAndTech';
import BreadCrumbs from '../BreadCrumbs';
import ProductDetailSkeleton from './ProductDetailSkeleton';
const ReviewMaster = dynamic(() => import('../Reviews/ReviewMaster'));
const MatchingProducts = dynamic(() => import('./MatchingProducts'));
import styles from '../../styles/components/productDetail.module.scss';
import StockAvailabilityTable from './StockAvailabilityTable';

function ProductPageMaster() {
  const {
    productDetailData,
    productVariantData,
    isLoading,
    errorMessage,
    handleMultipleQtyChange,
    itemList,
    qty,
    handleQtyModificationOnInputEdit,
    handleQtyModificationOnButtonClick,
    handleStockAvailabilityData,
    stockAvailabilityData,
  } = useProductDetail();
  const [pinCode, setPinCode] = useState('');
  const [tab, setTab] = useState('SPECIFICATION');

  if (isLoading) {
    return (
      <div className={`container ${styles.detailContainer} `}>
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (Object?.keys(productDetailData)?.length > 0) {
    return (
      <div className={`container-fluid ${styles.detailContainer} w-100 ps-lg-5 pe-lg-5 `}>
        <div className="my-2">
          <BreadCrumbs />
        </div>
        <div className="row">
          <div className="col-lg-6 p-4">
            <div className="">{productDetailData?.slide_img && <ProductDetailImageGallery data={productDetailData?.slide_img} />}</div>
          </div>
          <div className="col-lg-6 p-4">
            <ProductDetailDescribtionSection
              productDetailData={productDetailData}
              pinCode={pinCode}
              handleQtyModificationOnInputEdit={handleQtyModificationOnInputEdit}
              handleQtyModificationOnButtonClick={handleQtyModificationOnButtonClick}
              productVariantData={productVariantData}
              handleStockAvailabilityData={handleStockAvailabilityData}
              itemList={itemList}
              handleMultipleQtyChange={handleMultipleQtyChange}
              qty={qty}
            />
          </div>
          <div className="col-12 mt-4">
            <StockAvailabilityTable stockAvailabilityData={stockAvailabilityData} />
          </div>
          <div className="col-12 mt-4">
            <div className="row">
              <ProductDetailSpecsAndTech productDetailData={productDetailData} tab={tab} setTab={setTab} />
            </div>
          </div>
        </div>
        <ReviewMaster />
        <MatchingProducts />
      </div>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <></>;
}

export default ProductPageMaster;
