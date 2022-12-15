import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import ModalUI from '../../../components/UI/Modal';

export default function AddCategoryModal(props) {
    {/* Add Category Modal */}
    const {show,handleClose,handleAddCategory,categoryName,setCategoryName,handleParentCategoryId,creatCategoryList,category,handleCategoryImage} = props;
    return (
      <ModalUI modalTitle="Add New Category" show={show} handleClose={handleClose}  handleSubmit={handleAddCategory}>
      <Input label="Category Name" className="name" id="name" type="text" placeholder="Enter Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
        <div className="mb-3">
          <label className="form-label" htmlFor="parentCategoryId">Parent Category</label>
          <select name="parentCategoryId" id="parentCategoryId" className='form-control' onChange={handleParentCategoryId}>
            <option value="">Select Category</option>
            {
              creatCategoryList(category.categories).map(function(option) { 
                return (<option key={option.value} value={option.value}>{option.name}</option>);
              })
            }
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="categotyImage">Category Image</label>
          <input type="file" name="categotyImage" id="categotyImage" className="form-control" onChange={handleCategoryImage}/>
        </div>
      </ModalUI>
    )
  }