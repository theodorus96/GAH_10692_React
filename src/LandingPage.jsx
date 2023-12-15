
import {Nav} from "./NavigationBar/Navbar"
import { Banner } from "./NavigationBar/Banner";
import {Hero} from "./Hero/Hero"
import {BookLanding} from "./Reservation/BookLanding"
import {DetailKamar} from "./Hero/DetailKamar"

export default function LandingPage() {

  return (
    <>
    <div className="w-full bg-banner-bg bg-center">
        <div className="w-full text-white">
         <Nav />
         <Banner />
         </div>
    </div>
    <>
      <BookLanding />
      <Hero />
      <DetailKamar />
    </>
    </>
  );
}
