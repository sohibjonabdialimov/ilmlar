import Hero from "./landing_components/hero/Hero";
import About from "./landing_components/about/About";
import Teacher from "./landing_components/teacher/Teacher";
import Student from "./landing_components/student/Student";
import Footer from "./landing_components/footer/Footer";
import "./landing_components/style.css";
import "react-lazy-load-image-component/src/effects/blur.css";

function Begin() {
  return (
    <div className="landing_page">
      <Hero />
      <About />
      <Teacher />
      <Student />
      <Footer />
    </div>
  );
}

export default Begin;
