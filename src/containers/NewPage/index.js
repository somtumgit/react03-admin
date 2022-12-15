import React, { useEffect, useState } from 'react'
import { Row,Col,Button } from 'react-bootstrap';
import Layout from '../../components/Layout'
import ModalUI from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import creatCategoryList from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';

export default function NewPage() {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const category = useSelector(state => state.state.adminApp.category);
  const page = useSelector(state => state.state.adminApp.page);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('NewPage',category);
    setCategories(creatCategoryList(category.categories));
  },[category]);

  useEffect(() => {
    console.log('NewPage',page);
    if(!page.loading) {
        setCreateModal(false);
        setTitle('');
        setCategoryId('');
        setDesc('');
        setBanners('');
        setProducts('');
    }
  },[page]);

  const handleBannerImages = function(e) {
    console.log(e);
    setBanners([...banners, e.target.files[0]])
  }

  const handleProductImages = function(e) {
    console.log(e);
    setProducts([...products, e.target.files[0]])
  }

  const submitCreatePageForm = function(e) {
    // e.target.preventDefault();

    if(title == "") {
        alert('Title is required');
        setCreateModal(false);
        return;
    }
    const form  = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    if(banners.length > 0) {
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
    }else {
        form.append('banners', []);
    }
    if(products.length > 0) {
        products.forEach((product, index) => {
            form.append('products', product);
        });
    }else {
        form.append('products', []);
    }
   

    console.log({title, desc, categoryId, type, banners, products});
    dispatch(createPage(form));
    // setCreateModal(false);
  }

  const handleChangeCategory = function(e) {
    const cat = categories.find(category => category.value == e.target.value);
    // console.log(cat);
    setCategoryId(e.target.value);
    setType(cat.type);
  }

  const renderCreatePageModel = function() {
    return (
        <ModalUI
            size="lg"
            show={createModal}
            modalTitle="Create New Page"
            handleClose={() => setCreateModal(false)}
            handleSubmit = {submitCreatePageForm}
        >
            <Row>
                <Col>
                    {/* <div className="mb-3">
                        <label className="form-label" htmlFor="parentCategoryId">Category</label>
                        <select name="categoryId" id="categoryId" className='form-control' 
                            value={categoryId}
                            onChange={handleChangeCategory}
                        >
                            <option value="">Select category</option>
                            {
                                categories.map(cat => 
                                    <option key={cat.value} value={cat.value}>{cat.name}</option>    
                                )
                            }

                        </select>
                    </div> */}
                    <Input
                        type="select"
                        label="Category"
                        value={categoryId}
                        onChange={handleChangeCategory}
                        options={categories}
                        placeholder={'Select Category'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        type='text'
                        label={"Page Title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={'Enter Page Title'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        type='text'
                        label={"Page Description"}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder={'Enter Page Description'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label="Banner Image"
                        type="file"
                        name="banners"
                        onChange={handleBannerImages}
                    />
                    <div className='mb-3'>
                        {
                        banners.length > 0 ?
                        banners.map((pic,index) => <div key={index}>{pic.name}</div>) :
                        null
                        }
                    </div> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label="Product Image"
                        type="file"
                        name="products"
                        onChange={handleProductImages}
                    />
                      
                    <div className='mb-3'>
                        {
                        products.length > 0 ?
                        products.map((pic,index) => <div key={index}>{pic.name}</div>):
                        null
                        }
                    </div> 
                    
                </Col>
            </Row>
        </ModalUI>
    );
  }

  return (
    <Layout sidebar={true}>
        <h1>Page</h1>
        {
            page.loading ?
            <>
                <p>Create Page... Please wait.</p>
            </>
            :
            <>
                {renderCreatePageModel()}
                <button onClick={()=>setCreateModal(true)}>Create Page</button>
            </>
        }

        
        
        {/* {JSON.stringify(categories)} */}
    </Layout>

  )
}
