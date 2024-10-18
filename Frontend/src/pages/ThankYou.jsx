
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div className='h-screen grid place-items-center'>
            <div className="bg-white shadow-md rounded-lg p-8 mt-8 max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thank You!</h2>
                <p className="text-gray-600 mb-4">Thank you for sending the response. We have received your registration.</p>
                <Link to="/" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ThankYou;
