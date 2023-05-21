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

import './VetCard.scss'


function VetCard(props){

    const vet = props.vet;

    return (
      <div className='card-container'>
        <img
          src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
          alt='Books'
          height={200}
        />
        <div className='desc'>
          <h2>
            <Link to={`/show-book/${vet.id}`}>{vet.vetName}</Link>
          </h2>
          <h3>{vet.email}</h3>
          <p>{vet.experience}</p>
        </div>
      </div>
    );
}

export default VetCard