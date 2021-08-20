import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import NavBarState from "./NavBarState";
const NavBar = () => {
  const { isLoggedin,
    setisLoggedin,
    whoLoggein,
    setWhoLoggedin } = NavBarState();
  return (
    <>
      <div className="navContaienr">
        <div className="navBar">
          <div className="logo">
            <h1 className="logoText">Hospital Management</h1>
          </div>
          <div className="navItems">
            <ul className="navItem_ul">
              <NavLink to="/" className="navItem" exact activeClassName="navLinkActive"> <li>Home</li> </NavLink>
              {/* <NavLink to="/about" className="navItem" activeClassName="navLinkActive"> <li>About</li> </NavLink> */}
              {/* <NavLink to="/contact" className="navItem"> <li>Contact Us</li>  </NavLink> */}
              
              
              {isLoggedin === false ? (
                <>
                  <li className="navItem dropDownLink">
                    Login
                    <ul className="dropDownContent">
                      <NavLink to="/login/hospital" className="dropDownItem"><li>Login as Hospital</li></NavLink>
                      <NavLink to="/login/patient" className="dropDownItem"><li>Login as Patient</li></NavLink>
                    </ul>
                  </li>
                  <li className="navItem dropDownLink">
                    Signup
                    <ul className="dropDownContent">
                      <NavLink to="/signup/hospital" className="dropDownItem"><li>Signup as Hospital</li></NavLink>
                      <NavLink to="/signup/patient" className="dropDownItem"><li>Signup as Patient</li></NavLink>
                    </ul>
                  </li>
                </>
              ) :
                (
                  <>
                    <NavLink to={`/dashboard/${whoLoggein}`} activeClassName="navLinkActive" className="navItem"> <li>Dashboard</li> </NavLink>
                    <NavLink to="/logout" activeClassName="navLinkActive" className="navItem"> <li>Logout</li> </NavLink>
                  </>
                )
              }
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default NavBar


// import React from 'react';
// import { Link,NavLink } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"
// import "./Navbar.css"
// const NavBar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{zIndex: "1251"}}>
//         <div className="container">
//           <Link className="navbar-brand" to="/">Hospital Management</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link active" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="#">DashBoard</Link>
//               </li>
//               <li className="nav-item dropdown">
//                 <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Login
//                 </span>
//                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li><Link className="dropdown-item" to="/patient/login">Login as Patient</Link></li>
//                   <li><Link className="dropdown-item" to="/hospital/login">Login as Hospital</Link></li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <span className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Signup
//                 </span>
//                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li><Link className="dropdown-item" to="/patient/signup">Signup as Patient</Link></li>
//                   <li><Link className="dropdown-item" to="/hospital/signup">Signup as Hospital</Link></li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default NavBar

// // import React from 'react';
// // import { makeStyles } from '@material-ui/core/styles';
// // import AppBar from '@material-ui/core/AppBar';
// // import Toolbar from '@material-ui/core/Toolbar';
// // import Typography from '@material-ui/core/Typography';
// // import Button from '@material-ui/core/Button';
// // import IconButton from '@material-ui/core/IconButton';
// // import MenuIcon from '@material-ui/icons/Menu';

// // const useStyles = makeStyles((theme) => ({
// //     root: {
// //         flexGrow: 1,
// //     },
// //     menuButton: {
// //         marginRight: theme.spacing(2),
// //     },
// //     title: {
// //         flexGrow: 1,
// //     },
// //     appBar: {
// //         zIndex: 1251,
// //     }
// // }));

// // export default function NavBar() {
// //     const classes = useStyles();

// //     return (
// //         <div className={classes.root}>
// //             <AppBar position="fixed" className={classes.appBar}>
// //                 <Toolbar>
// //                     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
// //                         <MenuIcon />
// //                     </IconButton>
// //                     <Typography variant="h6" className={classes.title}>
// //                         Hospitals
// //                     </Typography>
// //                     <Button color="inherit">Login</Button>
// //                 </Toolbar>
// //             </AppBar>
// //         </div>
// //     );
// // }
