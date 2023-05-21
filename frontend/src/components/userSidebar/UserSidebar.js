import React from 'react'
import { NavLink } from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa';
import {BsCartFill} from 'react-icons/bs';

import './userSidebar.scss'

function UserSidebar() {
  return (
    <div className='userSidebarContainer'>       
        <ul className='userSidebarList'>
            <NavLink to='../store'>
                <li className='userSidebarListItem'>
                    <div className='userSidebarListItemIcon'>
                        <FaUserAlt />
                    </div>
                    My Profile
                </li>
            </NavLink>
            <NavLink to='../account/myOrders'>
                <li className='userSidebarListItem'>
                    <div className='userSidebarListItemIcon'>
                        <BsCartFill />
                    </div>
                    My Orders
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default UserSidebar