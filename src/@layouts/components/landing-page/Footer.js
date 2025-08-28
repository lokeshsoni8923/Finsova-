import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(360deg,_#3e35ed_-30.73%,_#674285_10.89%)] rounded-[30px] p-5 m-10 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Column 1: Logo + About */}
        <div>
        <Image
          src="/img/finsova.png"
          alt="Finsova"
          width={100}
          height={100}
          className="h-auto bg-gray-300 rounded-4xl w-auto"

        />

          <p className="text-sm text-black">
            In many small towns and remote areas, accessing banking services is
            a daunting task. Long costly journeys just for basic transactions
            often cause inconvenience and money problems.
          </p>
        </div>

        {/* Column 2: Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-3">Stay Ahead With Our Exclusive Newsletter</h3>
          <div className="flex items-center border border-black  bg-transparent overflow-hidden mb-4 rounded-2xl">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 w-full outline-none bg-transparent text-sm rounded-2xl"
            />
            <button className="bg-transparent  px-4 py-2 text-gray-900 text-sm transition-transform duration-300 hover:scale-110">
              Subscribe
            </button>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[url(https://maxst.icons8.com/vue-static/icon/landing/links/social/instagram2x.webp)] bg-auto md:bg-contain transition-transform duration-300 hover:scale-125">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[url(https://maxst.icons8.com/vue-static/icon/landing/links/social/linkedIn2x.webp)] bg-auto md:bg-contain transition-transform duration-300 hover:scale-125">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[url(https://maxst.icons8.com/vue-static/icon/landing/links/social/youtube2x.webp)] bg-auto md:bg-contain transition-transform duration-300 hover:scale-125">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[url(https://maxst.icons8.com/vue-static/icon/landing/links/social/twitter2x.webp)] bg-auto md:bg-contain transition-transform duration-300 hover:scale-125">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black ">
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">About Us</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">Our Team</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">FAQs</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">Blog</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">News & Media</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">Contact Us</a></li>
            <li className="transition-transform duration-300 hover:scale-110"><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Column 4: Our Services */}
        <div>
          <h3 className="font-bold text-lg mb-3 ">Our Services</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>Micro ATM</li>
            <li>AePS</li>
            <li>Travel Services</li>
            <li>Insurance</li>
            <li>CMS</li>
            <li>Utility Bill Payments</li>
            <li>Pan Card Services</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black mt-8 py-6 text-center text-sm text-black">
        <p>© {new Date().getFullYear()} Finsova. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2 ">
          <a href="#">Privacy Policy</a>
          <a href="#">Refund Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
