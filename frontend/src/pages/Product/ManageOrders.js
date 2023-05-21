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
import {ImSearch} from 'react-icons/im'

import './manageProducts.scss'
import './manageOrders.scss'

import OrdersReport from './OrdersReport'

function ManageOrders() {

    const [orders, setOrders] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getOrders = () => {
        userRequest.get("/orders")
        .then(res => {
            console.log(res.data)
            setOrders(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getOrders()
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
          userRequest.delete('/orders/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Order deleted')
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
        userRequest.get(`/orders?search=${search}`)
        .then(res => {
            setOrders(res.data);
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
          field: "orderId",
          headerName: "Order ID",
          headerAlign: "center",
          align: "center",
          flex: 1,
        },
        {
          field: "total",
          headerName: "Amount",
          headerAlign: "center",
          align: "center",
          type: "number",
          flex: 1,
          valueFormatter: ({ value }) => `Rs. ${value.toFixed(2)}`,
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            headerAlign: 'center',
            align: 'center',
            type: 'date',
            flex: 1,
            valueGetter: ({ value }) => value && new Date(value),
            valueFormatter: ({ value }) => value ? new Date(value).toLocaleString() : '',
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
              const status = params.value.toLowerCase();
              return status === "succeeded" ? (
                <span className='successful'>Successful</span>
              ) : (
                <span className='pending'>Pending</span>
              );
            },
        },
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
              const status = params.value;
              const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
              let statusStyle = '';
              switch (status) {
                case 'Completed':
                  statusStyle = 'successful';
                  break;
                case 'Pending':
                  statusStyle = 'pending';
                  break;
                case 'Processing':
                  statusStyle = 'processing';
                  break;
                // Add more cases for additional delivery statuses here
                default:
                  statusStyle = 'default';
                  break;
              }
              return <span className={statusStyle}>{capitalizedStatus}</span>;
            },
        },
        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          align: "center",
          sortable: false,
          filterable: false,
          flex: 1,
          renderCell: (params) => {
            return (
              <div className='action'>
                <Link to={"/admin/products/viewOrder/" + params.row._id}>
                  <AiOutlineEye className='view' />
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
            <CustomDataGrid data={orders} columns={columns} searchBar={<SearchBar />} report={<OrdersReport data = {orders} />} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageOrders