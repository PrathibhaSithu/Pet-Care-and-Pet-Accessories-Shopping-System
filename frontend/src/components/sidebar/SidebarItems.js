import { MdContentPasteSearch, MdInsights } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { MdOutlineInventory2 } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { FaPaw } from "react-icons/fa";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { BsPalette2 } from "react-icons/bs";
import { CiMedicalCross } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { FaSyringe } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";
import { MdOutlineInsights } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";

import { BsPeopleFill } from "react-icons/bs";
import { MdHolidayVillage } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";

// main function icons
import { AiFillApi } from "react-icons/ai";
import { BiStoreAlt } from "react-icons/bi";
import { BiPlusMedical } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";

// delivery function icons
import { FaUserPlus } from "react-icons/fa";
import { TbPackageExport } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

// inventory
import {TbReportAnalytics} from "react-icons/tb"
import { BsCalculator } from "react-icons/bs"

// staff
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

//pet management
import { GiSittingDog } from "react-icons/gi"
import { FaNotesMedical } from "react-icons/fa"

//service management
//import { MdOutlineMedicalServices } from "react-icons/md";//add
//import { MdOutlineManageHistory } from "react-icons/md";//manage
//import { AiOutlineFileAdd } from "react-icons/ai";//add record
//import { AiOutlineFileDone } from "react-icons/ai";//manage record

// vet management
import { BsPersonLinesFill } from "react-icons/bs"
import { BiNotepad } from "react-icons/bi"
import { MdEditNote } from "react-icons/md"
import { GiMedicines } from "react-icons/gi"

//appointment management
import { RiCalendarLine } from 'react-icons/ri'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { MdOutlineSchedule } from 'react-icons/md'
import { BsCalendarCheck } from 'react-icons/bs'


const SidebarItems = [
	{
		id: 2000,
		icon: <BiStoreAlt />,
		text: "Product Management",
		nestedFunctions: [
			{
				id: 200,
				link: "/admin/products/addProduct",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Add Product",
			},
			{
				id: 201,
				link: "/admin/products/manageProducts",
				nestedItemicon: <BsFillBoxSeamFill />,
				nestedItemtext: "Manage Products",
			},
			{
				id: 202,
				link: "/admin/products/manageOrders",
				nestedItemicon: <BsFillCartFill />,
				nestedItemtext: "Orders",
			},

			{
				id: 203,
				link: "/admin/products/insights",
				nestedItemicon: <MdInsights />,
				nestedItemtext: "Insights",
			},
		],
	},

	{
		id: 1000,
		icon: <TbTruckDelivery />,
		text: "Delivery Management",
		nestedFunctions: [
			{
				id: 100,
				link: "/admin/delivery/add-driver",
				nestedItemicon: <FaUserPlus />,
				nestedItemtext: "Add Driver",
			},

			{
				id: 101,
				link: "/admin/delivery/manage-driver",
				nestedItemicon: <FaUserEdit />,
				nestedItemtext: "View Drivers",
			},


			{
				id: 102,
				link: "/admin/delivery/view-order",
				nestedItemicon: <TbPackageExport />,
				nestedItemtext: "Assign Driver",
			},

			{
				id: 103,
				link: "/admin/delivery/processing-order",
				nestedItemicon: <BiTimer />,
				nestedItemtext: "Processing Orders",
			},

			{
				id: 104,
				link: "/admin/delivery/completed-order",
				nestedItemicon: <AiOutlineFileDone />,
				nestedItemtext: "Completed Orders",
			},

			// {
			// 	id: 805,
			// 	link: "",
			// 	nestedItemicon: <MdInsights />,
			// 	nestedItemtext: "Insights",
			// },
		],
	},
	
	{
		id: 1000,
		icon: <BsPalette2 />,
		text: "Inventory Management",
		nestedFunctions: [
			{
				id: 100,
				link: "/admin/inventory/overview",
				nestedItemicon: <MdContentPasteSearch />,
				nestedItemtext: "Overview",
			},

			{
				id: 101,
				link: "/admin/inventory/add-item",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Add new item",
			},

			{
				id: 103,
				link: "/admin/inventory/manage-inventory",
				nestedItemicon: <MdOutlineInventory2 />,
				nestedItemtext: "Manage inventory",
			},

			{
				id: 104,
				link: "/admin/inventory/release-search",
				nestedItemicon: <BiCategoryAlt />,
				nestedItemtext: "Release items",
			},

			{
				id: 105,
				link: "/admin/inventory/supplier-registration",
				nestedItemicon: <TbUserPlus />,
				nestedItemtext: "Add supplier",
			},

			{
				id: 106,
				link: "/admin/inventory/manage-suppliers",
				nestedItemicon: <TbUser />,
				nestedItemtext: "Manage suppliers",
			},

			// {
			// 	id: 107,
			// 	link: "/admin/inventory/generate-reports",
			// 	nestedItemicon: <TbReportAnalytics />,
			// 	nestedItemtext: "Generate reports",
			// },

			{
				id: 108,
				link: "/admin/inventory/rop-calculator",
				nestedItemicon: <BsCalculator />,
				nestedItemtext: "ROP Calculator",
			},
		],
	},

	{
		id: 7000,
		icon: <RiCalendarLine />,
		text: "Appointment Management",
		nestedFunctions: [
			{
				id: 700,
				link: "/admin/appointments/manageAppointments",
				nestedItemicon: <FaRegCalendarAlt />,
				nestedItemtext: "Manage Appointments",
			},

			{
				id: 701,
				link: "/admin/appointments/upcoming",
				nestedItemicon: <MdOutlineSchedule />,
				nestedItemtext: "Upcoming",
			},

			{
				id: 702,
				link: "/admin/appointments/completed",
				nestedItemicon: <BsCalendarCheck />,
				nestedItemtext: "Completed",
			},
		],
	},

	{
        id:4000,
        icon:<FaPaw/>,
        text:"Pet Management",
        nestedFunctions: [
                {
                    id:400,
                    link:"/admin/pets/petRegister",
                    nestedItemicon:<GiArchiveRegister/>,
                    nestedItemtext:"Register"
                },

                {
                    id:402,
                    link:"/admin/pets/managePet",
                    nestedItemicon:<GiSittingDog/>,
                    nestedItemtext:"Manage Pets"
                },

                {
                    id:401,
                    link:"/admin/treatments/AddTreatments",
                    nestedItemicon:<FaSyringe/>,
                    nestedItemtext:"Add Treatment"
                },

				{
                    id:403,
                    link:"/admin/treatments/ManageTreatments",
                    nestedItemicon:<FaNotesMedical/>,
                    nestedItemtext:"Manage Treatments"
                },
				

        ]
    },
		
	{
		id: 3000,
		icon: <IoIosPeople />,
		text: "Staff Management",
		nestedFunctions: [
			{
				id: 300,
				link: "/admin/staff/AddStaff",
				nestedItemicon: <AiOutlineUserAdd />,
				nestedItemtext: "Add Staff Member",
			},

			{
				id: 301,
				link: "/admin/staff/ManageStaff",
				nestedItemicon: <BsPeopleFill />,
				nestedItemtext: "Manage Staff",
			},

			{
				id: 302,
				link: "/admin/leave/AddLeave",
				nestedItemicon: <FaWpforms />,
				nestedItemtext: "Add Leave",
			},

			{
				id: 303,
				link: "/admin/leave/ManageLeave",
				nestedItemicon: <MdHolidayVillage />,
				nestedItemtext: "Manage Leaves",
			},

			// {
			// 	id: 304,
			// 	link: "/admin/payroll/AddPayroll",
			// 	nestedItemicon: <GiTakeMyMoney />,
			// 	nestedItemtext: "Add Payroll",
			// },

			// {
			// 	id: 305,
			// 	link: "/admin/payroll/ManagePayroll",
			// 	nestedItemicon: <GiReceiveMoney />,
			// 	nestedItemtext: "Manage Payrolls",
			// },
		],
	},

	{
		id: 5000,
		icon: <MdOutlineHomeRepairService />,
		text: "Service Management",
		nestedFunctions: [
			{
				id: 500,
				link: "/admin/service/AddService",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Add Service",
			},

			{
				id: 501,
				link: "/admin/service/ManageServices",
				nestedItemicon: <MdMedicalServices />,
				nestedItemtext: "Manage Services",
			},

			{
				id: 502,
				link: "/admin/service/AddRecord",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Add Record",
			},

			{
				id: 503,
				link: "/admin/service/ManageRecords",
				nestedItemicon: <MdDesignServices />,
				nestedItemtext: "Manage Records",
			},

		],
	},

	{
		id: 6000,
		icon: <BiPlusMedical />,
		text: "Veterinary Management",
		nestedFunctions: [
            {
                id:600,
                link:"/admin/vets/addVet",
                nestedItemicon:<TbUserPlus/>,
                nestedItemtext:"Add Vet"
            },

			{
                id:603,
                link:"/admin/vets/manageVet",
                nestedItemicon:<BsPersonLinesFill/>,
                nestedItemtext:"Manage Vets"
            },

            {
                id:601,
                link:"/admin/prescriptions/addPrescription",
                nestedItemicon:<BiNotepad/>,
                nestedItemtext:"Add Prescription"
            },

			{
                id:603,
                link:"/admin/prescriptions/managePrescription",
                nestedItemicon:<MdEditNote/>,
                nestedItemtext:"Manage Prescriptions"
            },

            {
                id:602,
                link:"/admin/medicines/manageMedicines",
                nestedItemicon:<GiMedicines/>,
                nestedItemtext:"Medicine"
            },
		]
	},

	{
		id: 7000,
		icon: <IoMdPerson />,
		text: "Customer Management",
		nestedFunctions: [
			{
				id: 700,
				link: "",
				nestedItemicon: <BsFillBoxSeamFill />,
				nestedItemtext: "Products",
			},

			{
				id: 701,
				link: "",
				nestedItemicon: <BsFillCartFill />,
				nestedItemtext: "Orders",
			},

			{
				id: 702,
				link: "",
				nestedItemicon: <MdInsights />,
				nestedItemtext: "Insights",
			},
		],
	},

];

export default SidebarItems;