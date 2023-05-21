import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import ProductLineChart from '../../components/productCharts/ProductLineChart';

import './viewProduct.scss'

function ViewProduct() {

    const { id } = useParams()

    const [categoryA, setCategoryA] = useState([])
    const [categoryB, setCategoryB] = useState(null)

    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [SKU, setSKU] = useState('')
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        userRequest.get('/products/' + id)
        .then(res => {
            setProductId(res.data.productId)
            setProductName(res.data.productName)
            setBrand(res.data.brand)
            setPrice(res.data.price)
            setQuantity(res.data.quantity)
            setDescription(res.data.description)
            setSKU(res.data.SKU)
            setCategoryA(res.data.categories.categoryA);
            setCategoryB(res.data.categories.categoryB);
            setImageURL(res.data.image)
        }).catch(err =>{
            toast.error(err.message)
        })

        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });

      }, [id])

    return (
        <AdminLayout>

            <div className='productWrapper'>

                <div className='productGraphicsContainer'>

                    <div className='productImageContainer'>
                        <img src={imageURL} className='productImage'/>
                    </div>

                    <ProductLineChart id={id} />
                    
                </div>

                <div className='productInfoContainer'>

                    <table className='productInfo'>
                        <tr className='productRow'>
                            <td className='productDetail'>Product ID</td>
                            <td className='productData'>{productId}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Product Name</td>
                            <td className='productData'>{productName}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Brand</td>
                            <td className='productData'>{brand}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Price</td>
                            <td className='productData'>Rs. {Number(price).toFixed(2).toLocaleString()}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Quantity</td>
                            <td className='productData'>{quantity}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Availability</td>
                            <td className='productData'>{quantity > 0 ? "In Stock" : "Out of Stock"}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>SKU</td>
                            <td className='productData'>{SKU}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Categories</td>
                            <td className='productData'>{categoryA.map(cat => cat + ', ')}{categoryB}</td>
                        </tr>
                        <tr className='productRow'>
                            <td className='productDetail'>Description</td>
                            <td className='productData' style={{whiteSpace: 'pre-wrap'}}>{description}</td>
                        </tr>
                    </table>

                </div>

            </div>

            
        </AdminLayout>
    )
}

export default ViewProduct