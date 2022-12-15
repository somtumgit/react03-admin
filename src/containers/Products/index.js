import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Row, Col, Container, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';  
import ModalUI from '../../components/UI/Modal';
import { NavLink } from 'react-router-dom';
import { getAllCategory, addProduct, deleteProductById, getInitailData } from '../../actions';
import {api, generateUploadImageUrl} from '../../urlConfig';
import './style.css';

export default function Products() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productPictures, setProductPictures] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productDetailModal, setProductDetailModel] = useState(false);
  const [productDetail, setProductDetail] = useState('');
  // const category = useSelector(state => state.category);
  // const product = useSelector(state => state.product);
  const category = useSelector(state => state.state.adminApp.category);
  const product = useSelector(state => state.state.adminApp.product);

  const dispatch = useDispatch();

  useEffect(function() {
    // console.log(window.store.getState());
    dispatch(getAllCategory());
  
  }, []);

  useEffect(function() {
    // console.log(window.store.getState());
    console.log('product',product);
  }, [product.products]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseProductDetailModal = () => setProductDetailModel(false);
  const handleShowProductDetailModal = () => setProductDetailModel(true);

  const creatCategoryList = function(categories, options = []) {
    for(let category of categories) {
      options.push({value: category._id, name: category.name});
      if(category.children.length > 0) {
        creatCategoryList(category.children, options);
      }
    }

    return options;
  }

  const showProductDetail = function(product) {
    // console.log('123');
    setProductDetail(product);
    handleShowProductDetailModal();
  }

  const handleCategoryId = function(e) {
    setCategoryId(e.target.value);
  }

  const handleProductPictures = function(e) {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
    // console.log(productPictures);
  }

  const handleAddProduct = function() {
    const form = new FormData();
    form.append('name',name);
    form.append('quantity',quantity);
    form.append('price',price);
    form.append('description',description);
    form.append('category',categoryId);

    for(let pic of productPictures) {
      form.append('productPicture',pic);
    }

    // const productData = {
    //   name: name,
    //   quantity: quantity,
    //   price: price,
    //   description: description,
    //   categoryId: categoryId,
    //   productPictures: productPictures
    // }
    console.log('form',form);

    dispatch(addProduct(form));
    
    setShow(false);
  }

  const renderProducts = function() {
    return (
      <div>
        <Table style={{fontSize: '14px'}} responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              {/* <th>Description</th> */}
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              product.products.length > 0 ?
              product.products.map((product) => 
                <tr key={product._id} >
                  <td>{'2'}</td>
                  <td>
                    <div onClick={() => showProductDetail(product)} style={{cursor: 'pointer'}}>{product.name}</div>
                    
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  {/* <td>{product.description}</td> */}
                  <td>{product.category.name}</td>
                  <td>
                    <button
                      onClick={()=>showProductDetail(product)}
                    >
                      info
                    </button>
                    <button
                      onClick={()=> {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ) :
              null
            }
            
            
          </tbody>
        </Table>
      </div>
    );
  }

  const renderAddProductModal = function() {
    return (
      <ModalUI size={'md'} modalTitle="Add New Product" show={show} handleClose={handleClose}  handleSubmit={handleAddProduct} displaySubmit="block">
          <Input label="Product Name" className="name" id="name" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <Input label="Quantity" className="quantity" id="quantity" type="text" placeholder="Enter Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
          <Input label="Price" className="price" id="price" type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
          <Input label="Description" className="description" id="description" type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
          <div className="mb-3">
            <label className="form-label" htmlFor="parentCategoryId">Category</label>
            <select name="categoryId" id="categoryId" className='form-control' onChange={handleCategoryId}>
              <option value="">Select Category</option>
              {
                creatCategoryList(category.categories).map(function(option) { 
                  return (<option key={option.value} value={option.value}>{option.name}</option>);
                })
              }
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="productPictures">Product Image</label>
            <input type="file" name="productPictures" id="productPictures" className="form-control" onChange={handleProductPictures}/>
          </div>
          {
            productPictures.length > 0 ?
            productPictures.map((pic,index) => <div key={index}>{pic.name}</div>) :
            null
          }
      </ModalUI>
    );
  }

  const renderProductDetailModal = function() {
    // console.log(productDetail);
    // return null;
    if(productDetail == '') {
      return null;
    }
    return (
      <ModalUI size={'lg'} modalTitle="Product Details" show={productDetailModal} handleClose={handleCloseProductDetailModal}  displaySubmit="none">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetail.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetail.price}</p>
          </Col>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetail.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetail.category.name}</p>
          </Col>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetail.description}</p>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            {JSON.stringify(productDetail.productPictures)}
          </Col>
        </Row> */}
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{display: 'flex'}}>
              {productDetail.productPictures.map((picture) => 
                <div key={picture._id} className='product-image'>
                  <img src={generateUploadImageUrl(picture.img)} alt="product picture" />
                </div>  
              )}
            </div>
            
          </Col>
        </Row>

      </ModalUI>
    );

  }

  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{display:'flex', justifyContent: 'space-between', }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add Product</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {renderProducts()}
          </Col>
        </Row>
        {/* <Row>
          <Col md={12}>
            {JSON.stringify(product)}
          </Col>
        </Row> */}
      </Container>


      {renderAddProductModal()}
      {renderProductDetailModal()}

    </Layout>
  )
}
