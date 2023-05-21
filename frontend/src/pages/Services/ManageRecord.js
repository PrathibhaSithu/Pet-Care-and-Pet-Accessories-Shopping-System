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
import RecordReport from './RecordReport';

import './ManageRecord.scss'

function ManageRecord() {

    const [records, setRecords] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getRecords = () => {
        userRequest.get("/servicerecords")
        .then(res => {         
            setRecords(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getRecords()
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
          userRequest.delete('/servicerecords/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Record deleted')
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
      //userRequest.get(`servicerecords?search=${search}`)
    
      const handleSearch = (e) => {
          e.preventDefault()
          userRequest.get(`servicerecords?search=${search}`)
          .then(res=>{
            setRecords(res.data)
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
            field: "recordId",
            headerName: "Record ID",
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
            field: "customerName",
            headerName: "Customer Name",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        
        { 
            field: "vetName",
            headerName: "Vet Name",
            headerAlign: "center",
            align: "center",
            flex: 2,
          },

          { 
            field: "petType",
            headerName: "Pet Type",
            headerAlign: "center",
            align: "center",
            flex: 2,
          },

          { 
            field: "date",
            headerName: "Service Date",
            headerAlign: "center",
            align: "center",
            type: 'date',
            flex: 2,
            valueGetter: ({ value }) => value && new Date(value),
          },
        
        {
          field: "serviceCharge",
          headerName: "Charge",
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
          flex: 3,
          renderCell: (params) => {
            return (
              <div className='action'>
                <Link to={"/admin/service/ViewRecord/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/service/EditRecord/" + params.row._id}>
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
              <CustomDataGrid data={records} columns={columns} searchBar={<SearchBar />} report={ <RecordReport data={records}/> }/>
            </div>
        </AdminLayout>
    )
}

export default ManageRecord