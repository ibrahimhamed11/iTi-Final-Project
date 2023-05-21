 import './Nav.css'
 import logo from '../assets/images/logo.png'
 function Nav() {
   return(
    <nav className="navbar navbar-expand-lg position-fixed ">
            <div className="container ">
                <a className="navbar-brand offset-lg-4" href="#">
                    <img src={logo} alt="logo"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <a className="nav-link active__nav" aria-current="page" href="#">الرئيسية</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./assets/mother-profile.html"> صفحتك</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="assets/product.html">تسوقي</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">عنا</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="assets/blog.html">المدونة</a>
                        </li>
                        <li className="nav-item items__btn">
                            <a className="nav-link primary_btn" href="assets/join us.html">تسجيل</a>
                        </li>
                        <li className="nav-item items__btn">
                            <a className="nav-link secondary_btn" href="assets/signin.html">دخول</a>
                        </li>


                    </ul>

                </div>
            </div>
        </nav>
   ) 
 }
 export default Nav;