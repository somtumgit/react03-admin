import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import ModalUI from '../../components/UI/Modal';
import { NavLink } from 'react-router-dom';
import { getAllCategory, addCategory, updatedCategories, deletedCategories, getInitailData } from '../../actions';
import {IoIosCheckboxOutline,IoIosCheckbox,IoIosArrowForward,IoIosArrowDown,IoIosAdd,IoIosCloudUpload,IoIosTrash } from 'react-icons/io';
import CheckboxTree from 'react-checkbox-tree';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCateogriesModal from './components/DeleteCateogriesModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

export default function Category() {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categotyImage, setCategotyImage] = useState('');
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  // const category = useSelector(state => state.category);
  // const initailData = useSelector(state => state.initailData);
  const state = useSelector(state => state.state);
  const category = useSelector(state => state.state.adminApp.category);
  const initailData = useSelector(state => state.state.adminApp.initailData);

  const dispatch = useDispatch();

  useEffect(() => {
    
    if(!category.loading) {
      setShow(false);
    }
    
  }, [category.loading]);

  // useEffect(function() {
    // console.log(window.store.getState());
    // ย้ายไป app() เพื่อแก้ไขเมื่อ refresh page จะไม่ทำ useEffect
    // dispatch(getAllCategory());
    // console.log("useEffect");
  // });

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderCategories = function(categories) {
    let categoriesArr = [];
    for(let category of categories) {
      categoriesArr.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 ? renderCategories(category.children) : null
        }
        // <li key={category.name}>
        //   {category.name}
        //   {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        // </li>
      );
    }
    return categoriesArr
  }  

  const creatCategoryList = function(categories, options = []) {
    for(let category of categories) {
      options.push({value: category._id, name: category.name, parentId: category.parentId, type: category.type});
      if(category.children.length > 0) {
        creatCategoryList(category.children, options);
      }
    }

    return options;
  }

  const checkedAndExpendedCategories = function() {
    const categories = creatCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach(function(categoryId, index) {
      const category = categories.find(function(category, _index) {
         return categoryId == category.value
      });
      category && checkedArray.push(category);
    });
    expanded.length > 0 && expanded.forEach(function(categoryId, index) {
      const category = categories.find(function(category, _index) {
         return categoryId == category.value
      });
      category && expandedArray.push(category);
    });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log('checkedAndExpendedCategories',{checked, expanded, categories, checkedArray, expandedArray});
  }

  const handleCategoryImage = function(e) {
    setCategotyImage(e.target.files[0]);
  }

  const handleParentCategoryId = function(e) {
    setParentCategoryId(e.target.value);
  }

  const handleAddCategory = function() {
    const form = new FormData();

    if(categoryName === "") {
      alert("Name is required");
      return;
    }

    form.append('name',categoryName);
    form.append('parentId',parentCategoryId);
    form.append('categotyImage',categotyImage);
    // const categoryData = {
    //   categoryName: categoryName,
    //   parentCategoryId: parentCategoryId,
    //   categotyImage: categotyImage
    // }
    // console.log(categoryData);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    setShow(false);
  }

  const handleCloseUpdateCategoryModal = function() {
    setUpdateCategoryModal(false);
  }

  const handleEditCategoryModal = function() {
    setUpdateCategoryModal(true);
    checkedAndExpendedCategories();
  }

  const handleUpdateCategory = function() {
    const form = new FormData();

    expandedArray.forEach((item,index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type',item.type);
    });
    checkedArray.forEach((item,index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type',item.type);
    });

    console.log('form',form);

    dispatch(updatedCategories(form)).then(result => {
      // console.log('result: '+ result);
      if(result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);

  }

  const handleCloseDeleteCategoryModal = function() {
    setDeleteCategoryModal(false);
  }

  const handleDeleteCategoryModal = function() {
    setDeleteCategoryModal(true);
    checkedAndExpendedCategories();
    // console.log('delete category:', checked);
  }

  const handleDeleteCategory = function() {
    setDeleteCategoryModal(false);
    const checkedIdArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));

    const idArray = expandedIdArray.concat(checkedIdArray);
    // const idArray = checkedIdArray;

    if(checkedIdArray.length > 0) {
      dispatch(deletedCategories(checkedIdArray)).then((result) => {
        if(result) {
          dispatch(getAllCategory());
        }
      });
    }
    
  }

  

  const handleType = function() {

  }

  const handleCategoryInput = function(key, value, index, type) {
    // console.log('key:',key);
    // console.log('value:',value);
    // console.log('index:',index);
    // console.log('type:',type);
    if(type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) => {
        if(index == _index) {
          return {...item,type: value}
        }else {
          return item;
        }
      });
      setCheckedArray([...updatedCheckedArray]);
    }else if(type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) => {
        return index == _index ? {...item, [key]: value} : item;      
      });
      setExpandedArray(updatedExpandedArray);
    }
    // console.log('handleCategoryInput',{checkedArray, expandedArray});
  }


  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{display:'flex', justifyContent: 'space-between', }}>
              <h3>Category</h3>
              <div className="action">
                <button className='ms-1 btn btn-primary' onClick={handleShow}><IoIosAdd style={{fontSize:'24px'}} /> Add</button>
                <button className='ms-1 btn btn-success' onClick={handleEditCategoryModal}><IoIosCloudUpload style={{fontSize:'24px'}} /> Edit</button>
                <button className='ms-1 btn btn-danger' onClick={handleDeleteCategoryModal}><IoIosTrash style={{fontSize:'24px'}} /> Delete</button>
              </div>
              
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>

            {/* {JSON.stringify(category.categories)} */}
            
            
            
            {/* {JSON.stringify(renderCategories(category.categories)) } */}
            {/* <ul>
              {renderCategories(category.categories)}
              {JSON.stringify(creatCategoryList(category.categories))}
            </ul> */}
            <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked )}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox />,
                  uncheck: <IoIosCheckboxOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
              }}
            />

          </Col>
        </Row>
        
      </Container>

      

      <AddCategoryModal 
        show = {show}
        handleClose = {handleClose}
        handleAddCategory = {handleAddCategory}
        categoryName = {categoryName}
        setCategoryName = {setCategoryName}
        handleParentCategoryId = {handleParentCategoryId}
        creatCategoryList = {creatCategoryList}
        category = {category}
        handleCategoryImage = {handleCategoryImage}
      />
      <UpdateCategoriesModal 
        updateCategoryModal = {updateCategoryModal}
        size = {'lg'}
        category = {category}
        handleCloseUpdateCategoryModal = {handleCloseUpdateCategoryModal}
        handleUpdateCategory = {handleUpdateCategory}
        expandedArray = {expandedArray}
        checkedArray = {checkedArray}
        handleCategoryInput = {handleCategoryInput}
        creatCategoryList = {creatCategoryList}
        handleType = {handleType}
        handleCategoryImage = {handleCategoryImage}
      />
      {/* {renderDeleteCateogriesModal()} */}
      <DeleteCateogriesModal 
        size= {'md'}
        deleteCategoryModal = {deleteCategoryModal}
        handleCloseDeleteCategoryModal = {handleCloseDeleteCategoryModal}
        handleDeleteCategory = {handleDeleteCategory}
        expandedArray = {expandedArray}
        checkedArray = {checkedArray}
      />


    </Layout>
  )
}