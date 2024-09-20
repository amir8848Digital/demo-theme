import React from 'react';
import { FaFilter } from 'react-icons/fa6';

function FloatingFilterBtn({ handleShow, selectedMultiLangData }: any) {
  return (
    <button className="btn btn-primary rounded-0 w-100 text-uppercase" onClick={handleShow}>
      <div>
        <span className="px-2">
          <FaFilter />
        </span>
        {selectedMultiLangData?.filter}
      </div>
    </button>
  );
}

export default FloatingFilterBtn;