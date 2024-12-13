import React,{useEffect} from "react";




//import "./Testimonials.css"; // Include styles as a separate CSS file

  const HomeNew = () => {

      return (
        <div className="index-page"> 
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <title> CPGRAMS </title>
          <meta name="description" content />
          <meta name="keywords" content />
          {/* Favicons */}
          <link href="assets/img/favicon.ico" rel="icon" />
          {/* Fonts */}
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          {/* Vendor CSS Files */}
          <link href="./assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
          <link href="./assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
          <link href="./assets/vendor/aos/aos.css" rel="stylesheet" />
          <link href="./assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
          <link href="./assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
          {/* Main CSS File */}
          <link href="assets/css/main.css" rel="stylesheet" />
          <header>
            <div className="hed-top1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 top-left">
                    <p> Government of India  |  Ministry of Personnel, Public Grievances </p>
                  </div>
                  <div className="col-lg-6 top-right">
                    <div className="dropdown me-4">
                      <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-gear-fill me-2" />  Public services 
                      </a>            
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-arrow-right" /> Contact Us </a></li>
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-arrow-right" /> Site Map </a></li>
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-arrow-right" /> 2025 Holiday List </a></li>
                      </ul>
                    </div> 
                    <div className="dropdown me-4">
                      <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Language </a>            
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"> English </a></li>
                        <li><a className="dropdown-item" href="#"> Hindi </a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            <div id="header" className="header d-flex align-items-center fixed-top"> 
              <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
                  <img src="assets/img/Department Logo.png" alt="" />      
                </a>
                <nav id="navmenu" className="navmenu">
                  <ul>
                    <li><a href className="active">Home</a></li>
                    <li><a href>About Us</a></li>
                    <li><a href>Redressal Process</a></li>
                    <li><a href>Officers List</a></li>
                    <li><a href>FAQs / Help</a></li>      
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list" />
                </nav>
                <div className="dropdown logi-in1 me-4">
                  <a className="btn btn-getstarted dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Login </a>            
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/digit-ui/citizen/login"> Citizen </a></li>
                    <li><a className="dropdown-item" href="/digit-ui/employee"> Officers </a></li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <main className="main">
            {/* Section1 */}  
            <div id="carouselExampleAutoplaying" className="carousel slide hero" data-bs-ride="carousel">
              <div className="container carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-lg-5 marg1">
                      <img src="assets/img/slider/Slider-1.png" className="ms-2" alt="" />
                    </div>
                    <div className="col-lg-7 marg1">
                      <div className="hero-content aos-init aos-animate" data-aos="fade-up" data-aos-delay={200}>
                        <div className="company-badge mb-4">
                          <i className="bi bi-gear-fill me-2" />
                          Ministry of Public Grievances
                        </div>
                        <h1 className="mb-4">
                          NextGen CPGRAMS <br />
                          <span className="accent-text"> Monitoring System </span>
                        </h1>
                        <p className="mb-4 mb-md-5">
                          The Department of Administrative  <br /> 
                          Reforms and Public Grievances.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-lg-5 marg1">
                      <img src="assets/img/slider/slider-2.png" className="ms-2" alt="" />
                    </div>
                    <div className="col-lg-7 marg1">
                      <div className="hero-content aos-init aos-animate" data-aos="fade-up" data-aos-delay={200}>
                        <div className="company-badge mb-4">
                          <i className="bi bi-gear-fill me-2" />
                          Ministry of Public Grievances
                        </div>
                        <h1 className="mb-4">
                          Public Grievance And <br />
                          <span className="accent-text"> Monitoring System </span>
                        </h1>
                        <p className="mb-4 mb-md-5">
                          The Department of Administrative  <br /> 
                          Reforms and Public Grievances.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                  <div className="customers-badge">
                    <div className="customer-avatars">
                      <img src="assets/img/avatar-1.webp" alt="Customer 1" className="avatar" />
                      <img src="assets/img/avatar-2.webp" alt="Customer 2" className="avatar" />
                      <img src="assets/img/avatar-3.webp" alt="Customer 3" className="avatar" />
                      <img src="assets/img/avatar-4.webp" alt="Customer 4" className="avatar" />
                      <img src="assets/img/avatar-5.webp" alt="Customer 5" className="avatar" />
                      <span className="avatar more">12+</span>
                    </div>
                    <p className="mb-0 mt-2"> 12,000+ Public Grievance Status <br />
                      <span className="colr1"> <a href> Status Check <i className="bi bi-arrow-right" /> </a> </span> 
                    </p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* Section1 */}
            {/* Section2 */}
            <section id="features-cards" className="features-cards section pad3">
      <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-box orange">
              <i className="bi bi-award"></i>
              <h4> Lodge Grievance </h4>
              <a className="read2" href=""> View Status  </a>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-box blue">
              <i className="bi bi-patch-check"></i>
              <h4> Track Grievance / Appeals  </h4>
              <a className="read2" href=""> View Status  </a>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-box green">
              <i className="bi bi-sunrise"></i>
              <h4> Feedback </h4> <br />
              <a className="read2" href=""> View Status  </a>
            </div>
          </div>
        </div>
      </div>
    </section>
            {/* Section2 */}
            {/* Section3 */}
            <section id="stats" className="stats section pad22">

<div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

  <div className="row gy-4">

    <div className="col">
      <div className="text-center">
        <h2> <strong>52</strong> <span>Lakhs</span> </h2>
        <p>Total Registered Citizens</p>
      </div>
    </div>

    <div className="col">
      <div className="text-center">
        <h2> <strong>1.2</strong> <span>Crores</span></h2>
        <p>Total Grievances Lodged</p>
      </div>
    </div>

    <div className="col">
      <div className="text-center">
        <h2> <strong>89</strong> <span>Lakhs</span></h2>
        <p>Total Grievances Resolved</p>
      </div>
    </div>

    <div className="col">
      <div className="text-center">
        <h2> <strong>25</strong> <span>Lakhs</span></h2>
        <p>Total Number of Appeals Raised:</p>
      </div>
    </div>

    <div className="col">
      <div className="text-center">
        <h2> <strong>21</strong> <span>Lakhs</span></h2>
        <p>Total Number of Appeals Closed</p>
      </div>
    </div>

  </div>

</div>

</section>
            {/* Section3 */}
            {/* Section4 */}
            <section id="about" className="about section pad22">

<div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
  <div className="row gy-4 justify-content-between">

    <div className="col-xl-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
      <span className="about-meta"> ABOUT US</span>
      <h2 className="about-title">  CPGRAMS platform </h2>
      <p className="about-description">Provides information about the department of 
        Administrative Reforms &amp; Public Grievances and the CPGRAMS platform.</p>

      <div className="row feature-list-wrapper">
        <div className="col-md-12">
          <ul className="feature-list">
            <li><i className="bi bi-check-circle-fill"></i> Automatically detects spam, bulk and repetitive grievances in real-time. </li>
            <li><i className="bi bi-check-circle-fill"></i> Automatically identifies the semantic gist of grievances by 
              analyzing their text contents and pdf attachments. </li>
            <li> <a className="read1" href=""> Read More +  </a> </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="col-xl-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
      <div className="image-wrapper">
        <div className="images position-relative aos-init aos-animate" data-aos="zoom-out" data-aos-delay="400">
          <img src="assets/img/about-2.jpg" alt="Business Meeting" className="img-fluid main-image rounded-4" />
          <img src="assets/img/about-3.jpg" alt="Team Discussion" className="img-fluid small-image rounded-4" />
        </div>             
      </div>
    </div>

  </div>
</div>

</section>
            {/* Section4 */}
            {/* Section5 */}
            <section className="faq-9 faq section light-background" id="faq">
      <div className="container">
        <div className="row gy-4">         
          <div className="col-lg-5 aos-init aos-animate" data-aos="fade-up">
              <h2 className="faq-title">Check out the Whats New . </h2>
              <p className="faq-description">Get updates on New Policies, features and initiatives.</p>
              <div className="faq-arrow d-none d-lg-block aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <svg className="faq-arrow" width="200" height="211" viewBox="0 0 200 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z" fill="currentColor"></path>
                </svg>
              </div>
          </div>
          <div className="col-xl-7 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
            <div className="faq-9 faq section pad1" id="faq">
              <div className="faq-container">
                <h2> Whats New  <i className="bi bi-arrow-right"></i> </h2>

                <div className="faq-item">
                  <h3> <span> 29Nov 2024  |   </span> New Citizen Charter for Grievance Redressal </h3>
                  <div className="faq-content">
                    <p> The government has launched a new Citizen Charter mandating a maximum resolution time 
                      of 30 days for all grievances across departments. </p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>

                <div className="faq-item">
                  <h3> <span> 10May 2024  | </span> Mobile App for NextGen CPGRAMS </h3>
                  <div className="faq-content">
                    <p> Launch of the official NextGen CPGRAMS mobile app for Android and iOS, 
                      allowing users to file and track grievances on the go. </p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>

                <div className="faq-item">
                  <h3> <span> 19Mar 2024  | </span> Introduction of Grievance Redressal Audits </h3>
                  <div className="faq-content">
                    <p> Government departments will now undergo periodic audits to assess and improve their grievance redressal efficiency. </p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>

                <div className="faq-item">
                  <h3> <span> 23 Jan 2024  | </span> Policy for Rural and Remote Grievance Collection </h3>
                  <div className="faq-content">
                    <p>A new initiative to establish offline grievance collection points in villages and remote areas to ensure inclusive redressal.</p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>

                <div className="faq-item">
                  <h3><span> 20Aug 2024  | </span> Grievance Prioritization for Senior Citizens and Disabled Persons </h3>
                  <div className="faq-content">
                    <p> A government directive prioritizes grievances lodged by senior citizens, persons with disabilities, and marginalized groups for faster resolution. </p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>
                             
              </div>
            </div>
          </div>
        </div>  
      </div>
    </section>

            {/* Section5 */}
            {/* Section6 */}



            {/* Section6 */}
          </main>
          <footer id="footer" className="footer">
            <div className="container footer-top">
              <div className="row gy-4">
                <div className="col-lg-4 col-md-6 footer-about">
                  <a href="index.html" className="logo d-flex align-items-center">
                    <img src="assets/img/Department Logo.png" alt="" /> 
                  </a>
                  <div className="social-links d-flex mt-4">            
                    <a href><i className="bi bi-facebook" /></a>
                    <a href><i className="bi bi-youtube" /></a>
                    <a href><i className="bi bi-twitter-x" /></a>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><a href="#"> Home </a></li>
                    <li><a href="#"> About us </a></li>
                    <li><a href="#"> Redressal Process </a></li>
                    <li><a href="#"> Officers List </a></li>
                    <li><a href="#"> FAQs / Help </a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-3 footer-links">
                  <h4>CPGRAMS</h4>
                  <div className="footer-contact pt-3">
                    <p> Acknowledges that this platform is an initiative 
                      by the Department of Administrative Reforms &amp;
                      Public Grievances (DARPG).
                    </p>           
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 footer-links">
                  <h4>CPGRAMS</h4>
                  <div className="footer-contact pt-3">
                    <p> Provides links to the Disclaimer, 
                      Website Policies, and Web Information Manager.
                    </p>
                    <p>
                      Mentions the website's version, last updated date, 
                      and total visitor count since January 19,2024.
                    </p>           
                  </div>
                </div>
              </div>
            </div>
            <div className="container copyright text-center mt-4">
              <p> © <span> Copyright </span> 
                <strong className="px-1 sitename">CPGRAMS</strong> 
                <span>All Rights Reserved</span></p>
              <div className="credits">
                Designed by <a href>CPGRAMS</a>
              </div>
            </div>
          </footer>
          {/* Scroll Top */}
          <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
            <i className="bi bi-arrow-up-short" />
          </a>
          {/* Vendor JS Files */}
          {/* Main JS File */}
        </div>
      );
      };
      export default HomeNew;