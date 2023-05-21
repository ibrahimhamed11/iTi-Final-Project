
import './Services.css'
import doctor from'../assets/images/doctors_service.png'
import shopping from'../assets/images/shopping_service.png'
import guide from'../assets/images/'
import community from'../assets/images/doctors_service.png'
function Services(){
    return(
        // <!-- *******************services section*********************** -->
    <section className="services">
        <div className="container">
            <div className="row">
                <h2 className="pb-5">خدماتنا</h2>
                <div className="col-lg-3 services__items">
                    <img src="./assets/images/products_auto_x2-removebg-preview.png" alt=""/>
                    <h4>تسوقي لطفلك</h4>
                    <p> Ipsum dolor sit amet conse ctetur adipisicing elit aliqua duruderya.
                    </p>
                </div>
                <div className="col-lg-3 services__items ">
                    <img src="./assets/images/parent_communit.png" alt=""/>
                    <h4>مجتمع للامهات</h4>
                    <p>Nunc suscipit. Suspendisse enim arcu, convallis non, cursus
                    </p>
                </div>
                <div className="col-lg-3 services__items">
                    <img src="./assets/images/Mother_guide_auto_x2-removebg-preview.png" alt=""/>
                    <h4>دليلك لرعاية طفلك </h4>
                    <p>Nunc suscipit. Suspendisse enim arcu, convallis non, cursus
                    </p>
                </div>

                <div className="col-lg-3 services__items">
                    <img src="./assets/images/doctors_auto_x2-removebg-preview.png" alt=""/>
                    <h4>اكفأ الاطباء لطفلك</h4>
                    <p>Nunc suscipit. Suspendisse enim arcu, convallis non, cursus
                    </p>
                </div>
            </div>
        </div>
    </section>
    /* <!-- *****************end services section ******************************** --> */

    )
}
export default Services