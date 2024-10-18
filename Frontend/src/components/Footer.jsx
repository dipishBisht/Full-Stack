import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold mb-2">About Us</h4>
          <p className="text-sm max-w-[700px] leading-[28px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea quisquam in, illum, eum dicta optio quibusdam cum molestiae assumenda est ipsam officiis laudantium, porro eius. Corrupti perferendis officia atque?</p>
        </div>
        <div className="mb-6 md:mb-0 flex flex-col items-start justify-center">
          <h4 className="text-xl font-bold mb-5">Quick Links</h4>
          <ul className="text-sm">
            <li className="mb-1"><Link to="/" className="hover:underline">Home</Link></li>
            <li className="mb-1"><Link to="/signup" className="hover:underline">Sign Up</Link></li>
            <li className="mb-1"><Link to="/users" className="hover:underline">All Users</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
