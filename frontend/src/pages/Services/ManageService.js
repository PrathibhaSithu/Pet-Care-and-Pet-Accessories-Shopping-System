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

import './ManageService.scss'

function ManageService() {

    const [services, setServices] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getServices = () => {
        userRequest.get("/services")
        .then(res => {
          console.log(res.data)
          setServices(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getServices()
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
          userRequest.delete('/services/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Service deleted')
          })
          .catch(err => {
            alert(err)
          })
        }
      })
      
    }

    
    const SearchBar = () => {

      const [search, setSearch] = useState('')
    
      console.log(search)

      //userRequest.get(`services?search=${search}`)
    
      const handleSearch = (e) => {
        e.preventDefault()
        userRequest.get(`services?search=${search}`)
        .then(res=>{
          setServices(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
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
          field: "serviceId",
          headerName: "Service ID",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        { 
          field: "serviceName",
          headerName: "Service Name",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        { 
            field: "serviceImage",
            headerName: "Service Image",
            headerAlign: "center",
            align: "center",
            flex: 2,
            renderCell: (params) => {
              return (
                <div className="listItemName">
                  <img className="listItemServiceImg" src={params.row.serviceImage} alt="" />
                </div>
              );
            },
        },

        { 
            field: "serviceCharge",
            headerName: "Service Charge",
            headerAlign: "center",
            align: "center",
            type: "number",
            flex: 2,
            valueFormatter: ({ value }) => `Rs. ${value?.toFixed(2)}`,
        },  

        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          align: "center",
          sortable: false,
          filterable: false,
          flex: 2,
          renderCell: (params) => {
            return (
              <div className='action'>
                <Link to={"/admin/service/viewService/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/service/editService/" + params.row._id}>
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
            <CustomDataGrid data={services} columns={columns} searchBar={<SearchBar />} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageService