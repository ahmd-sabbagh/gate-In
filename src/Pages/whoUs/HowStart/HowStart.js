import { trans } from "../../../Components/Navbar/Navbar"

function HowStart() {
  return (
    <div className="HowStart py-5">
        <div className="container text-center" data-aos="fade-up" data-aos-duration="1000">
            <h3 className="fs-32-700">{trans('whoUs.tittle')}</h3>
            <p className="fs-20-500 mt-4">{trans('whoUs.story')}</p>
        </div>
    </div>
  )
}

export default HowStart