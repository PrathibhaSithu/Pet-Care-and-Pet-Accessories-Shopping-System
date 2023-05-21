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
import StaffReport from './StaffReport';

import './ManageStaff.scss'


function ManageStaff() {

    const [staff, setStaff] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getSatff = () => {
        userRequest.get("staff")
        .then(res => {
            setStaff(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getSatff()
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
          userRequest.delete('/staff/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Staff Member deleted')
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
          userRequest.get(`staff?search=${search}`)
          .then(res => {
            setStaff(res.data)
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
          field: "firstName",
          headerName: "First Name",
          headerAlign: "center",
          flex: 2,
          renderCell: (params) => {
            return (
              <div className="listItemName">
                <img className="listItemImg" src={params.row.simage} alt="" />
                {params.row.firstName}
              </div>
            );
          },
        },
        {
          field: "lastName",
          headerName: "Last Name",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        // {
        //   field: "address",
        //   headerName: "Address",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        // },
        // {
        //     field: "nic",
        //     headerName: "NIC",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 2,
        // },
        {
          field: "contactNo",
          headerName: "Contact No",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        // {
        //   field: "dob",
        //   headerName: "DOB",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        // },
        // {
        //   field: "email",
        //   headerName: "Email",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        // },
        {
          field: "department",
          headerName: "Department",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "designation",
          headerName: "Designation",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "joinedDate",
          headerName: "Joined Date",
          headerAlign: "center",
          align: "center",
          type: 'date',
          flex: 2,
          valueGetter: ({ value }) => value && new Date(value),
        },
        // {
        //   field: "salary",
        //   headerName: "Salary",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        //   valueFormatter: ({ value }) => `Rs. ${value.toFixed(2)}`,
        // },

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
                <Link to={"/admin/staff/ViewStaff/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/staff/EditSatff/" + params.row._id}>
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
                <CustomDataGrid data={staff} columns={columns} searchBar={<SearchBar />} report={<StaffReport data={staff}/>}/> 
            </div>
        </AdminLayout>
    )
}

export default ManageStaff