import React, { useEffect } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { useState } from 'react';
import { userRequest } from '../../../requestMethods'
import CustomDataGrid from '../../../components/dataGrid/CustomDataGrid';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {ImSearch} from 'react-icons/im'
import PayrollReport from './PayrollReport';

import './ManagePayroll.scss'

function ManagePayroll() {

    const [payroll, setpayroll] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getpayroll = () => {
        userRequest.get("payroll")
        .then(res => {
            setpayroll(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getpayroll()
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
          userRequest.delete('/payroll/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Payroll details deleted')
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
    
      const handleSearch = (e) => {
          e.preventDefault()
          userRequest.get(`payroll?search=${search}`)
          .then(res => {
            setpayroll(res.data)
          })
          .catch(err => {
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
          field: "staffId",
          headerName: "Staff ID",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        
        {
          field: "otHours",
          headerName: "OT Hours",
          headerAlign: "center",
          type: "number",
          align: "center",
          flex: 2,
        },
        {
          field: "salary",
          headerName: "Salary",
          headerAlign: "center",
          align: "center",
          type: "number",
          flex: 2,
          valueFormatter: ({ value }) => `Rs. ${value.toFixed(2)}`,
        },
        {
          field: "paymentStatus",
          headerName: "Payment Status",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "date",
          headerName: "Date",
          headerAlign: "center",
          align: "center",
          type: 'date',
          flex: 2,
          valueGetter: ({ value }) => value && new Date(value),
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
                <Link to={"/admin/payroll/ViewPayroll/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/payroll/EditPayroll/" + params.row._id}>
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
            <CustomDataGrid data={payroll} columns={columns} searchBar={<SearchBar />} report={<PayrollReport data={payroll}/> }/>
            </div>
        </AdminLayout>
    )
}

export default ManagePayroll