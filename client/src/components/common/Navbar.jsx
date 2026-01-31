import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
export default function Navbar({visible=true,backBtn=false}) {
    const navigate = useNavigate();
  return (
      <nav className={`flex items-center justify-between px-8 py-6`} id="home">
        <h1 className="text-2xl font-extrabold tracking-widest">HP Fashion</h1>

        <ul className="hidden md:flex gap-8 text-gray-300 text-sm uppercase">
          {["Home", "Collections", "Runway Moments", "products", "Contact"].map(
            (item) => (
              <li key={item} className="hover:text-white cursor-pointer">
                <a href={`#${item.toLowerCase().replace(" ", "_")}`}>{item}</a>
              </li>
            ),
          )}
        </ul>
          {visible && <button
          type="button"
          className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
          onClick={() => navigate('/home')}
        >
          Shop Now
        </button>}
        {backBtn && <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white" onClick={() => navigate(-1)}>
            <IoArrowBack />
            Back
          </button>}
        
      </nav>
  );
}
