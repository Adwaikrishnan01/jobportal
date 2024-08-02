import { motion } from 'framer-motion';
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <footer className="bg-green-800 text-white py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-6 sm:px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              We are dedicated to making your Abroad experience easier and more convenient.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:underline">Home</a></li>
              <li><a href="#About" className="text-sm text-gray-400 hover:underline">Services</a></li>
              <li><a href="#Pricing" className="text-sm text-gray-400 hover:underline">Pricing</a></li>
              <li><a href="#Contact" className="text-sm text-gray-400 hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@Abroadapp.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Abroad Street, Clean City</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaSquareXTwitter className='w-6 h-6'/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebook className='w-6 h-6'/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagramSquare className='w-6 h-6'/>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Abroad App. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;