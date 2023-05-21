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
import LeaveReport from './LeaveReport';

import './ManageLeave.scss'

function ManageLeaves() {

    const [leave, setleave] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getLeave = () => {
        userRequest.get("leave")
        .then(res => {
            setleave(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getLeave()
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
          userRequest.delete('/leave/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Leave details deleted')
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
          userRequest.get(`leave?search=${search}`)
          .then(res => {
            setleave(res.data)
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
          field: "leaveType",
          headerName: "Leave Type",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "reason",
          headerName: "Reason",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "leaveFrom",
          headerName: "Leave From",
          headerAlign: "center",
          align: "center",
          type: 'date',
          flex: 2,
          valueGetter: ({ value }) => value && new Date(value),
        },
        {
          field: "leaveTo",
          headerName: "Leave To",
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
                <Link to={"/admin/leave/ViewLeave/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/leave/EditLeave/" + params.row._id}>
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
            <CustomDataGrid data={leave} columns={columns} searchBar={<SearchBar />} report={<LeaveReport data={leave}/>} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageLeaves