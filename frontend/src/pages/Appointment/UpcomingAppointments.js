import React, { useEffect } from 'react'
import AdminLayout from '../Layouts/AdminLayout'
import { useState } from 'react';
import { userRequest } from '../../requestMethods'
import CustomDataGrid from '../../components/dataGrid/CustomDataGrid';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import {ImSearch} from 'react-icons/im';
import UpcomingAppointmentsReport from './Reports/UpcomingAppointmentsReport';

import './manageAppointments.scss'

function UpcomingAppointments() {

    const [appointments, setAppointments] = useState([])

    const getAppointments = () => {
        userRequest.get("/appointments")
        .then(res => {
            const currentDate = new Date();
            setAppointments(res.data.filter(appointment =>
                appointment.status === "Approved" && new Date(appointment.date).getTime() > currentDate.getTime()
            ));
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAppointments()
    }, [])

    
    const SearchBar = () => {

      const [search, setSearch] = useState('')
    
      const handleSearch = (e) => {
          e.preventDefault()

          userRequest.get('/appointments')
          .then((response) => {
            const result = response.data;
            const filteredResult = result.filter((props) =>
                props.appointmentId.includes(search) || props.petName.includes(search) || props.vet.includes(search)
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
            flex: 2,
        },
        {
            field: "vet",
            headerName: "Veterinary Surgeon",
            headerAlign: "center",
            align: "center",
            flex: 2,
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
            field: "date",
            headerName: "Date",
            headerAlign: "center",
            type: 'date',
            align: "center",
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
                <Link to={"/admin/appointments/ViewAppointment/" + params.row._id}>
                  <AiOutlineEye className='view' />
                </Link>
              </div>
            );
          },
        },
      ];

    return (
        <AdminLayout>
            <div className='listContainer'>
            <CustomDataGrid data={appointments} columns={columns} searchBar={<SearchBar />} report={<UpcomingAppointmentsReport data={appointments}/>} /> 
            </div>
        </AdminLayout>
    )
}

export default UpcomingAppointments
