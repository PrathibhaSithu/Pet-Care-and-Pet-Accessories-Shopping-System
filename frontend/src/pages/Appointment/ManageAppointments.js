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
import AppointmentReport from './Reports/AppointmentReport';

import './manageAppointments.scss'

function ManageAppointments() {

    const [appointments, setAppointments] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getAppointments = () => {
        userRequest.get("/appointments")
        .then(res => {
            setAppointments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAppointments()
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
          userRequest.delete('/appointments/' + id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('Appointment deleted')
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

          userRequest.get('/appointments')
          .then((response) => {
            const result = response.data;
            const filteredResult = result.filter((props) =>
                props.appointmentId.includes(search) || props.petName.includes(search)
            );
            setAppointments(filteredResult)
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
          field: "appointmentId",
          headerName: "ID",
          headerAlign: "center",
          align: "center",
          flex: 1.5,
        },
        {
          field: "ownerName",
          headerName: "Pet Owner Name",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
            field: "petName",
            headerName: "Pet Name",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "petSpecies",
            headerName: "Pet Species",
            headerAlign: "center",
            align: "center",
            flex: 1.5,
        },
        {
            field: "petGender",
            headerName: "Pet Gender",
            headerAlign: "center",
            align: "center",
            flex: 1.5,
        },
        {
            field: "date",
            headerName: "Date",
            headerAlign: "center",
            type: 'date',
            align: "center",
            flex: 1.5,
            valueGetter: ({ value }) => value && new Date(value),
        },
  
        {
            field: "reason",
            headerName: "Reason",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },

        {
          field: "status",
          headerName: "Status",
          headerAlign: "center",
          align: "center",
          flex: 1.5,
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
                <Link to={"/admin/appointments/ViewAppointment/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
                <Link to={"/admin/appointments/EditAppointment/" + params.row._id}>
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
            <CustomDataGrid data={appointments} columns={columns} searchBar={<SearchBar />} report={<AppointmentReport data={appointments}/>} /> 
            </div>
        </AdminLayout>
    )
}

export default ManageAppointments
