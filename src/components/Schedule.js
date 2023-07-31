import "../styles/schedule.css";
import Header from "./homepage/Header";

import Footer from "./homepage/Footer";
export default function Newschedule() {


  return (
    // <></>
    <div className="shedule " style={{ marginTop: "100px" }} >
      <Header />
      <div className="sche">
        <table class="table table-dark table-striped table-borderless table-hover caption-top ">

          <thead>
            <tr>

              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Time</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Monday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Tuesday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Wednesday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Thursday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Friday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Saturday</th>
              <th scope="col" class="bb text-center fs-4 fw-light txtcolor">Sunday</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <th scope="row" class="bb text-center">7:00AM - 9:00AM</th>
              <td class="bb text-center">
                <span class=" bb badge badgecolor text-wrap">Class : Theurapeutic </span>
              </td>
              <td class="bb text-center">
                <span class="bb badge badgecolor text-wrap">Class : Vinyasa Krama </span>
              </td>
              < td class="bb text-center">
                <span class="bb badge badgecolor text-wrap">Class : Theurapeutic </span>
              </td>
              <td class="bb text-center">
                <span class="bb badge badgecolor text-wrap">Class : Vinyasa Krama </span>
              </td>
              <td class="bb text-center">
                <span class="bb badge badgecolor text-wrap">Class : Theurapeutic </span>
              </td>
              <td class="bb text-center">
                <span class="bb badge badgecolor text-wrap">Class : Vinyasa Krama </span>
              </td>
              <td class="bb text-center"></td>
            </tr>
            <tr>
              <th scope="row" class="text-center">9:00AM - 11:00AM</th>
              <td class="text-center">
                <span class="bb badge bg-danger text-wrap">Class : The Smart Flow Yoga </span><br />
                <br /><span class="bb badge bg-danger text-wrap">Class : Yoga For Better Sleep </span>
              </td>
              <td class="text-center">

              </td>
              < td class="text-center">

                <span class="bb badge bg-danger text-wrap">Class : The Smart Flow Yoga</span><br />
                <br /><span class="bb badge bg-danger text-wrap">Class : Yoga For Better Sleep </span>
              </td>
              <td class="text-center">

              </td>
              <td class="text-center">
                <span class="bb badgehover badge bg-danger text-wrap">Class : The Smart Flow Yoga </span><br />
                <br /><span class="bb badge bg-danger text-wrap">Class : Yoga For Better Sleep </span>
              </td>
              <td class="text-center">

              </td>
              <td class="text-center"></td>
            </tr>
            <tr>
              <th scope="row" class="text-center">13:00PM - 15:00PM</th>
              <td class="text-center">
              <span class="bb badgehover badge bg-primary text-wrap">Class : Restorative yoga </span>
              </td>
              <td class="text-center">
                <span class="bb badgehover badge bg-primary text-wrap">Class : Mom Baby Connection </span>
              </td>
              < td class="text-center">
              <span class="bb badgehover badge bg-primary text-wrap">Class : Restorative yoga </span> 
              </td>
              <td class="text-center">
                <span class="bb badgehover badge bg-primary text-wrap">Class : Mom Baby Connection </span>
              </td>
              <td class="text-center">
              <span class="bb badgehover badge bg-primary text-wrap"> Class : Restorative yoga </span>
              </td>
              <td class="text-center">
                <span class="bb badgehover badge bg-primary text-wrap">Class : Mom Baby Connection </span>
              </td>
              <td class="text-center"></td>
            </tr>
            <tr>
              <th scope="row" class="text-center">15:00PM - 17:00PM</th>
              <td class="text-center">
                <span class="bb badge badgecolor text-wrap"> </span>
              </td>
              <td class="text-center">

              </td>
              <td class="text-center">
                <span class="bb badge badgecolor text-wrap"> </span>
              </td>
              <td class="text-center">

              </td>
              <td class="text-center">
                <span class="bb badge badgecolor text-wrap"> </span>
              </td>
              <td class="text-center">

              </td>
              <td class="text-center"></td>
            </tr>
            <tr>
              <th scope="row" class="text-center">17:00PM - 19:00PM</th>
              <td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Dalai Lama </span>
              </td>
              <td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Thai Yoga<br></br>Class : Karma Yoga</span>
              </td>
              < td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Dalai Lama </span>
              </td>
              <td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Thai Yoga <br></br>Class : Karma Yoga</span>
              </td>
              <td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Dalai Lama </span>
              </td>
              <td class="text-center">
                <span class="bb badge bg-success text-wrap">Class : Thai Yoga<br></br>Class : Karma Yoga </span>
              </td>
              <td class="text-center"></td>
            </tr>

          </tbody>

        </table>
      </div>
      <Footer />
    </div>
  )

}