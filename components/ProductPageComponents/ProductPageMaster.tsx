import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import styles from '../../styles/components/productDetail.module.scss';
const BreadCrumbs = dynamic(() => import('../BreadCrumbs'));
const ReviewMaster = dynamic(() => import('../Reviews/ReviewMaster'));
const MatchingProducts = dynamic(() => import('./MatchingProducts'));
const StockAvailabilityTable = dynamic(() => import('./StockAvailabilityTable'));
const ProductDetailSpecsAndTech = dynamic(() => import('./ProductDetailSpecsAndTech'));
const ProductDetailSkeleton = dynamic(() => import('./ProductDetailSkeleton'));
const ProductDetailImageGallery = dynamic(() => import('./ProductDetailImageGallery'));
const ProductDetailDescribtionSection = dynamic(() => import('./ProductDetailDescribtionSection'));

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
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  useEffect(() => {
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
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
              selectedMultiLangData={selectedMultiLangData}
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
