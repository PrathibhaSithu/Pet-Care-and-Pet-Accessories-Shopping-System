import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import AddItem from './pages/FormSample/AddItem';
import AdminLayout from './pages/Layouts/AdminLayout';


import AddProduct from './pages/Product/AddProduct';
import ManageProducts from './pages/Product/ManageProducts';
import EditProduct from './pages/Product/EditProduct';
import ViewProduct from './pages/Product/ViewProduct';
import ProductCatalog from './pages/Store/ProductCatalog';
import Product from './pages/Store/Product';
import Cart from './pages/Store/Cart';
import ManageOrders from './pages/Product/ManageOrders';
import Success from './pages/Store/Success';
import Wishlist from './pages/Store/Wishlist';
import ViewOrder from './pages/Product/ViewOrder';
import Insights from './pages/Product/Insights'

// delivery components
import AddDriver from "./pages/Delivery/RegisterDriver/RegisterDriver";
import ManageDriver from "./pages/Delivery/ManageDriver/ManageDriver";
import ViewDeliveryOrder from "./pages/Delivery/ViewOrder/ViewOrder";
import UpdateDriver from "./pages/Delivery/updateDriver/update-driver";
import UpdateOrder from "./pages/Delivery/UpdatePendingOrder/UpdateOrder";
import ProcessingOrder from "./pages/Delivery/ProcessingOrder/ProcessingOrder";
import CompletedOrder from "./pages/Delivery/CompletedOrder/CompletedOrder";

// inventory components
import AddItemPage from "./pages/Inventory/add-item-page/AddItem";
import OverviewPage from "./pages/Inventory/overview-page/overview";
import SupplierRegForm from "./pages/Inventory/register-supplier-page/supplier-register";
import ManageInventoryPage from "./pages/Inventory/manage-inventory-page/manage-inventory";
import UpdateItem from "./pages/Inventory/update-inventory-page/update-inventory";
import TestComp from "./pages/Inventory/release-items-page/test-comp";
import ViewInventoryItem from "./pages/Inventory/view-item-details-page/view-items";
import ManageSupplierWindow from "./pages/Inventory/manage-supplier/manage-supplier";
import ViewSupplierDetails from './pages/Inventory/view-supplier/view-supplier'
import ReleaseItems from "./pages/Inventory/release-items-page/test-comp";
import ReleasedItems from './pages/Inventory/released-items/ReleasedItems';
import UpdateSupplierDetails from './pages/Inventory/update-supplier-page/update-supplier'
import OrdersReport from "./pages/Inventory/generate-reports/OrdersReport";
import Login from './pages/Signin&Signup/Page';
import ReleaseSearch from './pages/Inventory/release-search/ReleaseSearch';
import RopCalculator from './pages/Inventory/rop-calculator/RopCalc'

//payroll management
import AddPayroll from './pages/Staff/Payroll/AddPayroll';
import ManagePayroll from './pages/Staff/Payroll/ManagePayroll';
import EditPayroll from './pages/Staff/Payroll/EditPayroll';
import ViewPayroll from './pages/Staff/Payroll/ViewPayroll';
//staff management
import AddStaff from './pages/Staff/Staff/AddStaff'
import ManageStaff from './pages/Staff/Staff/ManageStaff';
import EditStaff from './pages/Staff/Staff/EditStaff';
import ViewStaff from './pages/Staff/Staff/ViewStaff';
//leave management
import AddLeave from './pages/Staff/Leave/AddLeave';
import ManageLeave from './pages/Staff/Leave/ManageLeave'
import EditLeave from './pages/Staff/Leave/EditLeave'
import ViewLeave from './pages/Staff/Leave/ViewLeave';


//pet management
import AddPet from './pages/Pet/AddPet';
import ViewPet from './pages/Pet/ViewPet';
import ManagePet from './pages/Pet/ManagePet';
import EditPet from './pages/Pet/EditPet';
import AddTreatments from './pages/Pet/AddTreatments';
import ManageTreatment from './pages/Pet/ManageTreatment';
import EditTreatment from './pages/Pet/EditTreatment';
import ViewTreatment from './pages/Pet/ViewTreatment';


//service management
import AddRecord from './pages/Services/AddRecord';
import AddService from './pages/Services/AddService'
import EditRecord from './pages/Services/EditRecord';
import ViewRecord from './pages/Services/ViewRecord';
import ManageService from './pages/Services/ManageService';
import ManageRecord from './pages/Services/ManageRecord';
import EditService from './pages/Services/EditService';
import ViewService from './pages/Services/ViewService';

import AppBlog from './components/blog';

//vet management
import Addvet from './pages/Vet/Vet/AddVet';
import EditVet from './pages/Vet/Vet/EditVet';
import ManageVets from './pages/Vet/Vet/ManageVets';
import ViewVet from './pages/Vet/Vet/ViewVet';
//prescriptions
import AddPrescription from './pages/Vet/Prescription/AddPrescription';
import ManagePrescription from './pages/Vet/Prescription/ManagePrescription';
import EditPrescription from './pages/Vet/Prescription/EditPrescription';
import ViewPrescription from './pages/Vet/Prescription/ViewPrescription';
//medicine
import Medicine from './pages/Vet/Medicine/Medicine';
import HomePage from './pages/Home/Home-page';

import Register from './pages/User/Register';
import UserLayout from './pages/Layouts/UserLayout'
import MyOrders from './pages/Store/MyOrders';

//appointment
import CreateAppointment from './pages/Appointment/CreateAppointment';
import ManageAppointments from './pages/Appointment/ManageAppointments';
import EditAppointment from './pages/Appointment/EditAppointment';
import ViewAppointment from './pages/Appointment/ViewAppointment';
import UpcomingAppointments from './pages/Appointment/UpcomingAppointments';
import CompletedAppointments from './pages/Appointment/CompletedAppointments';

function App() {
  return (
    <Router>
      <Toaster />
      
      <Routes>
        {/* <Route path='/' element={<AppBlog />} /> */}
        <Route exact path='/component-2' element={<AddItem />} />
        <Route exact path='/component-3' element={<AddProduct />} />
        

        {/* product routes */}
        <Route path='/admin/products/manageProducts' element={< ManageProducts />} />
        <Route path='/admin/products/addProduct' element={<AddProduct />} />
        <Route path='/admin/products/editProduct/:id' element={<EditProduct />} />
        <Route path='/admin/products/viewProduct/:id' element={<ViewProduct />} />
        <Route path='/admin/products/manageOrders' element={<ManageOrders />} />
        <Route path='/admin/products/viewOrder/:id' element={<ViewOrder />} />
        <Route path='/admin/products/insights' element={<Insights />} />

        {/* store routes */}
        <Route path='/store' element={<ProductCatalog />} />
        <Route path='/store/:id' element={<Product />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />


        {/* delivery routes */}
        <Route path="/admin/delivery/add-driver" element={<AddDriver />} />
        <Route path="/admin/delivery/manage-driver" element={<ManageDriver />} />
        <Route path="/admin/delivery/view-order" element={<ViewDeliveryOrder />} />
        <Route path="/admin/delivery/update-driver" element={<UpdateDriver/>}/> 
        <Route path="/admin/delivery/update-order" element={<UpdateOrder/>}/> 
        <Route path="/admin/delivery/processing-order" element={<ProcessingOrder/>}/>
        <Route path="/admin/delivery/completed-order" element={<CompletedOrder/>}/>


        {/* inventory routes */}
        <Route path="/admin/inventory/overview" element={<OverviewPage />} />
        <Route path="/admin/inventory/add-item" element={<AddItemPage />} />
        <Route path="/admin/inventory/manage-inventory" element={<ManageInventoryPage />}/>
        <Route path="/admin/inventory/supplier-registration" element={<SupplierRegForm />}/>
        {/* <Route path="/admin/inventory/generate-reports" element={<OrdersReport />}/> */}
        <Route path="/admin/inventory/test-comp" element={<TestComp />} />
        <Route path="/admin/inventory/update-item" element={<UpdateItem />} />
        <Route path="/admin/inventory/view-item" element={<ViewInventoryItem />}/>
        <Route path="/admin/inventory/manage-suppliers" element={<ManageSupplierWindow />}/>
        <Route path="/admin/inventory/report" />
         <Route path="/admin/inventory/released-list" element={<ReleasedItems/>} />
        <Route path="/admin/inventory/release-items" element={<ReleaseItems/>} />
        <Route path="/admin/inventory/release-search" element={<ReleaseSearch/>} />
        <Route path="/admin/supplier/view-supplier-details" element={<ViewSupplierDetails/>} />
        <Route path="/admin/supplier/update-supplier-details" element={<UpdateSupplierDetails/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/inventory/rop-calculator" element={<RopCalculator/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/services" element={<AppBlog/>} />


        {/* staff routes */}
        <Route path='/admin/staff/AddStaff' element={< AddStaff />} />
        <Route path='/admin/staff/ManageStaff' element={<ManageStaff />} />
        <Route path='/admin/staff/EditSatff/:id' element={<EditStaff />} />
        <Route path='/admin/staff/ViewStaff/:id' element={<ViewStaff />} />

        <Route path='/admin/payroll/AddPayroll' element={< AddPayroll />} />
        <Route path='/admin/payroll/ManagePayroll' element={< ManagePayroll />} />
        <Route path='/admin/payroll/EditPayroll/:id' element={<EditPayroll />} />
        <Route path='/admin/payroll/ViewPayroll/:id' element={<ViewPayroll/>} />
        
        <Route path='/admin/leave/AddLeave' element={< AddLeave />} />
        <Route path='/admin/leave/ManageLeave' element={< ManageLeave />} />
        <Route path='/admin/leave/EditLeave/:id' element={<EditLeave />} />
        <Route path='/admin/leave/ViewLeave/:id' element={<ViewLeave/>} />

        
        {/* pet routes */}
        <Route path='/admin/treatments/AddTreatments' element={<AddTreatments/>} />
        <Route path='/admin/treatments/ManageTreatments' element={<ManageTreatment/>} />
        <Route path='/admin/treatments/ViewTreatment/:id' element={<ViewTreatment/>} />
        <Route path='/admin/treatments/EditTreatment/:id' element={<EditTreatment/>} />
        <Route path='/admin/pets/petRegister' element={<AddPet/>} />
        <Route path='/admin/pets/managePet' element={<ManagePet/>} />
        <Route path='/admin/pets/ViewPet/:id' element={<ViewPet/>} />
        <Route path='/admin/pets/EditPet/:id' element={<EditPet/>} />


        {/* service routes */}
        <Route path='/admin/service/AddService' element={< AddService />} />
        <Route path='/admin/service/ManageServices' element={< ManageService />} />
        <Route path='/admin/service/EditService/:id' element={<EditService />} />
        <Route path='/admin/service/ViewService/:id' element={<ViewService />} />

        <Route path='/admin/service/AddRecord' element={< AddRecord />} />
        <Route path='/admin/service/ManageRecords' element={< ManageRecord />} />
        <Route path='/admin/service/EditRecord/:id' element={<EditRecord />} />
        <Route path='/admin/service/ViewRecord/:id' element={<ViewRecord />} />


        {/* vet routes */}
        <Route path='/admin/vets/addVet' element={<Addvet />} />
        <Route path='/admin/vets/manageVet' element={<ManageVets />} />
        <Route path='/admin/vets/editVet/:id' element={<EditVet />} />
        <Route path='/admin/vets/viewVet/:id' element={<ViewVet />} />

        <Route path='/admin/prescriptions/addPrescription' element={<AddPrescription />} />
        <Route path='/admin/prescriptions/managePrescription' element={<ManagePrescription />} />
        <Route path='/admin/prescriptions/editPrescription/:id' element={<EditPrescription />} />
        <Route path='/admin/prescriptions/viewPrescription/:id' element={<ViewPrescription />} />

        <Route path='/admin/medicines/manageMedicines' element={<Medicine />} />

        {/* appointment routes */}
        <Route path='/makeAppointment' element={<CreateAppointment />} />

        <Route path='/admin/appointments/manageAppointments' element={<ManageAppointments />} />
        <Route path='/admin/appointments/editAppointment/:id' element={<EditAppointment />} />
        <Route path='/admin/appointments/viewAppointment/:id' element={<ViewAppointment />} />
        <Route path='/admin/appointments/upcoming' element={<UpcomingAppointments />} />
        <Route path='/admin/appointments/completed' element={<CompletedAppointments />} />


        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<UserLayout />} />
        <Route path='/account/myOrders' element={<MyOrders />} />


      </Routes>
    </Router>
  )
}

export default App;