import React, { useEffect } from 'react'
import AdminLayout from '../Layouts/AdminLayout'
import { useState } from 'react';
import { userRequest } from '../../requestMethods'
import CustomDataGrid from '../../components/dataGrid/CustomDataGrid';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {ImSearch} from 'react-icons/im';
import ProductsReport from './ProductsReport';

import './manageProducts.scss'

function ManageProducts() {

    const [products, setProducts] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getProducts = () => {
        userRequest.get("products")
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProducts()
    }, [isSubmitted])

    
    const handleDelete = (id) => {

      Swal.fire({
        title: 'Confirmation Needed',
        text: "Please confirm your action",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f44336', // Red color for confirm button
        cancelButtonColor: '#4caf50', // Green color for cancel button      
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          userRequest.delete('/products/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Product deleted')
          })
          .catch(err => {
            alert(err)
          })
        }
      })
      
    }

    
    const SearchBar = () => {

      const [search, setSearch] = useState('')
    
      const handleSearch = (e) => {
        e.preventDefault()
        userRequest.get(`/products?search=${search}`)
        .then(res => {
            setProducts(res.data);
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        });
      }
    
      return(

        <div className="searchBarContainer">
          <form onSubmit={handleSearch}>
              <input type="text" className="searchField" value={search}  placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
              <button type='submit' className="searchBtn">
                <ImSearch className='search'/>
              </button>
          </form>
        </div>
      )
    }

    const columns = [
        { 
          field: "productId",
          headerName: "ID",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "productName",
          headerName: "Product",
          headerAlign: "center",
          flex: 7,
          renderCell: (params) => {
            return (
              <div className="listItemName">
                <img className="listItemImg" src={params.row.image} alt="" />
                {params.row.productName}
              </div>
            );
          },
        },
        {
          field: "quantity",
          headerName: "Quantity",
          headerAlign: "center",
          align: "center",
          type: "number",
          flex: 2,
        },
        {
          field: "price",
          headerName: "Price",
          headerAlign: "center",
          align: "center",
          type: "number",
          flex: 2,
          valueFormatter: ({ value }) => `Rs. ${value.toFixed(2)}`,
        },
        {
            field: "SKU",
            headerName: "SKU",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          align: "center",
          sortable: false,
          filterable: false,
          flex: 3,
          renderCell: (params) => {
            return (
              <div className='action'>
                <Link to={"/admin/products/viewProduct/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/products/editProduct/" + params.row._id}>
                  <FiEdit className='edit' />
                </Link>
                <MdOutlineDelete className='delete' onClick={() => {handleDelete(params.row._id)}} />
              </div>
            );
          },
        },
      ];

    return (
        <AdminLayout>
            <div className='listContainer'>
            <CustomDataGrid data={products} columns={columns} searchBar={<SearchBar />} report={<ProductsReport data={products} />} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageProducts