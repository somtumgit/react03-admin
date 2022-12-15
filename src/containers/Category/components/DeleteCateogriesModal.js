import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import ModalUI from '../../../components/UI/Modal';

export default function DeleteCateogriesModal(props) {
    {/* Edit Category Modal */}
    const {size,deleteCategoryModal,handleCloseDeleteCategoryModal,handleDeleteCategory,expandedArray,checkedArray} = props;
    return (     
      <ModalUI size={size} modalTitle="Delete Categories" show={deleteCategoryModal} handleClose={handleCloseDeleteCategoryModal}  handleSubmit={handleDeleteCategory} buttons={[{label: 'No',color: 'primary',onClick: handleCloseDeleteCategoryModal }, {label: 'Yes',color: 'danger',onClick: handleDeleteCategory}]}>
        <Row>
          <Col>
              <h6>Are you Sure ?</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Expanded</h5>
            {
              expandedArray.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))
            }
            <h5>Checked</h5>
            {
              checkedArray.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))
            }
          </Col>
        </Row>
        
      </ModalUI>
    )
}