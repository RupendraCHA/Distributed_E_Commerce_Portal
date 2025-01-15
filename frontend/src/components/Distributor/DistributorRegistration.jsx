import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DistributorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: {
      name: '',
      email: '',
      phone: '',
      designation: '',
    },
    businessDetails: {
      gstNumber: '',
      panNumber: '',
      registrationNumber: '',
    },
    warehouse: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    // Company validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    // Contact person validation
    if (!formData.contactPerson.name.trim()) {
      newErrors['contactPerson.name'] = 'Contact person name is required';
    }
    if (!formData.contactPerson.email.trim()) {
      newErrors['contactPerson.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactPerson.email)) {
      newErrors['contactPerson.email'] = 'Invalid email format';
    }
    if (!formData.contactPerson.phone.trim()) {
      newErrors['contactPerson.phone'] = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.contactPerson.phone)) {
      newErrors['contactPerson.phone'] = 'Phone number must be 10 digits';
    }

    // Business details validation
    if (!formData.businessDetails.gstNumber.trim()) {
      newErrors['businessDetails.gstNumber'] = 'GST number is required';
    }
    if (!formData.businessDetails.panNumber.trim()) {
      newErrors['businessDetails.panNumber'] = 'PAN number is required';
    }

    // Warehouse validation
    if (!formData.warehouse.addressLine1.trim()) {
      newErrors['warehouse.addressLine1'] = 'Address is required';
    }
    if (!formData.warehouse.city.trim()) {
      newErrors['warehouse.city'] = 'City is required';
    }
    if (!formData.warehouse.state.trim()) {
      newErrors['warehouse.state'] = 'State is required';
    }
    if (!formData.warehouse.zipCode.trim()) {
      newErrors['warehouse.zipCode'] = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.warehouse.zipCode)) {
      newErrors['warehouse.zipCode'] = 'Invalid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3002/distributor/register',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/distributor/dashboard');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const usaStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Distributor Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Company Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors.companyName ? 'border-red-500' : ''
                    }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.companyName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Contact Person Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson.name"
                  value={formData.contactPerson.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['contactPerson.name'] ? 'border-red-500' : ''
                    }`}
                />
                {errors['contactPerson.name'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['contactPerson.name']}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="contactPerson.designation"
                  value={formData.contactPerson.designation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactPerson.email"
                  value={formData.contactPerson.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['contactPerson.email'] ? 'border-red-500' : ''
                    }`}
                />
                {errors['contactPerson.email'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['contactPerson.email']}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPerson.phone"
                  value={formData.contactPerson.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['contactPerson.phone'] ? 'border-red-500' : ''
                    }`}
                />
                {errors['contactPerson.phone'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['contactPerson.phone']}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Business Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessDetails.gstNumber"
                  value={formData.businessDetails.gstNumber}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['businessDetails.gstNumber']
                        ? 'border-red-500'
                        : ''
                    }`}
                />
                {errors['businessDetails.gstNumber'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['businessDetails.gstNumber']}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessDetails.panNumber"
                  value={formData.businessDetails.panNumber}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['businessDetails.panNumber']
                        ? 'border-red-500'
                        : ''
                    }`}
                />
                {errors['businessDetails.panNumber'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['businessDetails.panNumber']}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="businessDetails.registrationNumber"
                  value={formData.businessDetails.registrationNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Primary Warehouse */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Primary Warehouse Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="warehouse.addressLine1"
                  value={formData.warehouse.addressLine1}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['warehouse.addressLine1'] ? 'border-red-500' : ''
                    }`}
                />
                {errors['warehouse.addressLine1'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['warehouse.addressLine1']}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="warehouse.addressLine2"
                  value={formData.warehouse.addressLine2}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouse.city"
                    value={formData.warehouse.city}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                      focus:border-blue-500 focus:ring-blue-500 ${
                        errors['warehouse.city'] ? 'border-red-500' : ''
                      }`}
                  />
                  {errors['warehouse.city'] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors['warehouse.city']}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="warehouse.state"
                    value={formData.warehouse.state}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                      focus:border-blue-500 focus:ring-blue-500 ${
                        errors['warehouse.state'] ? 'border-red-500' : ''
                      }`}
                  >
                    <option value="">Select State</option>
                    {usaStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors['warehouse.state'] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors['warehouse.state']}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouse.zipCode"
                    value={formData.warehouse.zipCode}
                    onChange={handleInputChange}
                    placeholder="5-digit PIN code"
                    maxLength="5"
                    minLength="5"
                    className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                      focus:border-blue-500 focus:ring-blue-500 ${
                        errors['warehouse.zipCode'] ? 'border-red-500' : ''
                      }`}
                  />
                  {errors['warehouse.zipCode'] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors['warehouse.zipCode']}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Warehouse Contact Number{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="warehouse.phone"
                  value={formData.warehouse.phone}
                  onChange={handleInputChange}
                  placeholder="Warehouse contact number"
                  className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 
                    focus:border-blue-500 focus:ring-blue-500 ${
                      errors['warehouse.phone'] ? 'border-red-500' : ''
                    }`}
                />
                {errors['warehouse.phone'] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors['warehouse.phone']}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Submission */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register as Distributor'
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DistributorRegistration;
