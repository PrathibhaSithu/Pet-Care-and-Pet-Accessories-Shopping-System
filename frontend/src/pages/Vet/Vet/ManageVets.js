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
import VetReport from './VetReport'

import './ManageVets.scss'

function ManageVets() {

    const [vets, setVets] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getVets = () => {
        userRequest.get("/vets")
        .then(res => {
            setVets(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getVets()
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
          userRequest.delete('/vets/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Vet deleted')
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
          userRequest.get(`vets?search=${search}`)
          .then(res => {
            setVets(res.data)
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
          field: "vcslId",
          headerName: "VCSL ID",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "vetName",
          headerName: "Vet Name",
          headerAlign: "center",
          align: "center",
          flex: 4,
          renderCell: (params) => {
            return (
              <div className="listItemName">
                <img className="listItemImg" src={params.row.profilePicture} alt="" />
                {params.row.vetName}
              </div>
            );
          },
        },
        {
          field: "telephone",
          headerName: "Telephone",
          headerAlign: "center",
          align: "center",
          flex: 2.5,
        },
        {
          field: "email",
          headerName: "Email",
          headerAlign: "center",
          align: "center",
          flex: 3,
        },
        {
          field: "experience",
          headerName: "Experience",
          headerAlign: "center",
          align: "center",
          flex: 3.5,
        },
        {
          field: "qualification",
          headerName: "Qualification",
          headerAlign: "center",
          align: "center",
          flex: 3.5,
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
                <Link to={"/admin/vets/viewVet/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/vets/EditVet/" + params.row._id}>
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
            <CustomDataGrid data={vets} columns={columns} searchBar={<SearchBar />} report={ <VetReport data={vets} />} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageVets