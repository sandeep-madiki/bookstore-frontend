import './App.css';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch()
  return (
   <div className="d-flex">
  <div className="w-25 vh-100 p-3 text-start" style={{backgroundColor: '#97587C'}}>
    <h5>Sidebar</h5>
    <ul className="list-unstyled">
      <li>Link 1</li>
      <li>Link 2</li>
      <li>Link 3</li>
    </ul>
  </div>

  <div className="flex-grow-1">
    <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom">
      <h3 className="fw-normal mb-0">BookStore</h3>
      <button className="btn btn-primary btn-sm" onClick={() => dispatch(logout())}>Logout</button>
    </div>
    <div className="p-4">
      <Outlet />
    </div>
  </div>
</div>

      
     
    // </div>
  );
}

export default App;
