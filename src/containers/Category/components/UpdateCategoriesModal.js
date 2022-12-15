import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import ModalUI from '../../../components/UI/Modal';

export default function UpdateCategoriesModal(props) {
    // Edit Category Modal
    const {updateCategoryModal,category,size,handleCloseUpdateCategoryModal,handleUpdateCategory,expandedArray,checkedArray,handleCategoryInput,creatCategoryList,handleType,handleCategoryImage} = props;
    // console.log(checkedArray);
    return (     
        <ModalUI size={size} modalTitle="Update Categories" show={updateCategoryModal} handleClose={handleCloseUpdateCategoryModal}  handleSubmit={handleUpdateCategory}>
          <Row>
            <Col>
                <h6>Expanded</h6>
            </Col>
          </Row>
          {
            expandedArray.length > 0 &&
            expandedArray.map((item, index) => 
              <Row key={index}>
                <Col>
                  <Input label="Category Name" className="name" id="name" type="text" placeholder="Enter Category Name" value={item.name} onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')}/>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="parentCategoryId">Parent Category</label>
                    <select name="parentCategoryId" id="parentCategoryId" className='form-control' value={item.parentId} onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'expanded')}>
                      <option value="">Select Category</option>
                      {
                        creatCategoryList(category.categories).map(function(option) { 
                          return (<option key={option.value} value={option.value}>{option.name}</option>);
                        })
                      }
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="type">Type</label>
                    <select name="type" id="type" className='form-control' value={item.type} onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}>
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </div>
                </Col>
              </Row>
            )
          }
          <h6>Checked Categories</h6>
          {
            checkedArray.length > 0 &&
            checkedArray.map((item, index) => 
              <Row key={index}>
                <Col>
                  <Input label="Category Name" className="name" id="name" type="text" placeholder="Enter Category Name" value={item.name} onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')}/>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="parentCategoryId">Parent Category</label>
                    <select name="parentCategoryId" id="parentCategoryId" className='form-control' value={item.parentId} onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'checked')}>
                      <option value="">Select Category</option>
                      {
                        creatCategoryList(category.categories).map(function(option) { 
                          return (<option key={option.value} value={option.value}>{option.name}</option>);
                        })
                      }
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="type">Type</label>
                    <select name="type" id="type" className='form-control' value={item.type} onChange={(e) => handleCategoryInput('type',e.target.value,index,'checked')}>
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </div>
                </Col>
              </Row>
            )
          }

          
          
          <div className="mb-3">
            <label className="form-label" htmlFor="categotyImage">Category Image</label>
            <input type="file" name="categotyImage" id="categotyImage" className="form-control" onChange={handleCategoryImage}/>
          </div>
        </ModalUI>
    )
    
  }