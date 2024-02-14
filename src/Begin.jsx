import About from "./components/platforma-main/about/About";
import Footer from "./components/platforma-main/footer/Footer";
import Hero from "./components/platforma-main/hero/Hero";
import Student from "./components/platforma-main/student/Student";
import Teacher from "./components/platforma-main/teacher/Teacher";
import "./components/platforma-main/style.css";
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
