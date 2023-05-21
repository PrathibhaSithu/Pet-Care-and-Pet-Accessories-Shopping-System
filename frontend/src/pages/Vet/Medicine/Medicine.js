import React, { useEffect } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { useState } from 'react';
import { userRequest } from '../../../requestMethods'
import CustomDataGrid from '../../../components/dataGrid/CustomDataGrid';
import {ImSearch} from 'react-icons/im'

import './Medicine.scss'

function Medicine() {

    const [medicines, setMedicines] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getMedicines = () => {
        userRequest.get("/medicines")
        .then(res => {
            setMedicines(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getMedicines()
    }, [isSubmitted])
    
    const SearchBar = () => {

      const [search, setSearch] = useState('')
    
    //  console.log(search)
    
      const handleSearch = (e) => {
          e.preventDefault()
          userRequest.get(`medicines?search=${search}`)
          .then(res => {
              setMedicines(res.data)
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
          field: "medicineName",
          headerName: "Medicine Name",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "uses",
          headerName: "Use",
          headerAlign: "left",
          align: "left",
          type: "text",
          flex: 6,
        },
      ];

    return (
        <AdminLayout>
            <div className='listContainer'>
            <CustomDataGrid data={medicines} columns={columns} searchBar={<SearchBar />} /> 
            </div>
        </AdminLayout>
    )
}

export default Medicine