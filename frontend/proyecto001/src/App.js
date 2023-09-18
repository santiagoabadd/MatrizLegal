
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./layout/Navbar"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRequirementForm from './users/AddRequirementForm';
import EditRequerimentForm from './users/EditRequirementForm';
import AddPlantForm from './plants/AddPlantForm';
import EditPlantForm from './plants/EditPlantForm';
import ListPlants from './plants/ListPlants';
import AddNormativaForm from './normativas/AddNormativasForm';
import ListNormativas from './normativas/ListNormativas';
import ListCustomers from './customers/ListCustomers';
import EditNormativaForm from './normativas/EditNormativaForm';
import AddCustomerForm from './customers/AddCustomerForm';
import EditCustomerForm from './customers/EditCustomerForm';
import AddCategoryForm from './categorys/AddCategoryForm';
import ListCategorys from './categorys/ListCategorys';
import EditCategoryForm from './categorys/EditCategoryForm';
import AddActionForm from './actions/AddActionForm';
import AddRubroForm from './rubros/AddRubroForm';
import RegisterUserForm from './userss/RegisterUserForm';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/requirements" element={<Home/>}/>
      <Route exact path="/plants" element={<ListPlants/>}/>
      <Route exact path="/categorys" element={<ListCategorys/>}/>
      <Route exact path="/normativas" element={<ListNormativas/>}/>
      <Route exact path="/customers" element={<ListCustomers/>}/>
      <Route exact path="/editrequirement/:id" element={<EditRequerimentForm/>} />
      <Route exact path="/addrequirement" element={<AddRequirementForm/>}/>
      <Route exact path="/addplant" element={<AddPlantForm/>}/>
      <Route exact path="/editplant/:id" element={<EditPlantForm/>}/>
      <Route exact path="/addaction/:id" element={<AddActionForm/>}/>
      <Route exact path="/editcategory/:id" element={<EditCategoryForm/>}/>
      <Route exact path="/editcustomer/:id" element={<EditCustomerForm/>}/>
      <Route exact path="/editnormativa/:id" element={<EditNormativaForm/>}/>
      <Route exact path="/addnormativa" element={<AddNormativaForm/>}/>
      <Route exact path="/addcustomer" element={<AddCustomerForm/>}/>
      <Route exact path="/addrubro" element={<AddRubroForm/>}/>
      <Route exact path="/addcategory" element={<AddCategoryForm/>}/>
      <Route exact path="/register" element={<RegisterUserForm/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
