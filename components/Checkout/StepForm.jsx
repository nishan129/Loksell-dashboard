"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCheckoutFormData, setCurrentStep } from '@/redux/slices/checkoutSlice';
import { useSession } from 'next-auth/react';

const CustomerList = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.checkout.checkoutFormData.customers || []);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    storename: '',
    address: '',
    phone: '',
    pinCode: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (customers.length > 0) {
      setSelectedCustomer(customers[0].id);
    }
  }, [customers]);

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomer(customerId);
    console.log('Selected Customer ID:', customerId);
  };

  const handleAddCustomer = () => {
    setIsModalOpen(true);
    console.log('Add Customer button clicked');
  };

  const handleSaveCustomer = () => {
    const customerToAdd = { ...newCustomer, id: Date.now(), userId };
    const updatedCustomers = [customerToAdd, ...customers];
    dispatch(updateCheckoutFormData({ customers: updatedCustomers }));
    setSelectedCustomer(customerToAdd.id);

    console.log('New Customer Added:', customerToAdd);

    setIsModalOpen(false);
    setNewCustomer({
      storename: '',
      address: '',
      phone: '',
      pinCode: '',
      city: '',
      state: '',
    });
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    dispatch(updateCheckoutFormData({ customers: updatedCustomers }));
    if (selectedCustomer === customerId) {
      setSelectedCustomer(updatedCustomers.length > 0 ? updatedCustomers[0].id : null);
    }
  };

  const handleDeliverHere = () => {
    if (selectedCustomer) {
      console.log('Deliver Here clicked with Customer ID:', selectedCustomer);
      dispatch(setCurrentStep(2));
    } else {
      console.log('No customer selected');
    }
  };

  const getSelectedCustomerData = () => {
    if (!selectedCustomer) return null;
    return customers.find(customer => customer.id === selectedCustomer);
  };

  const selectedCustomerData = getSelectedCustomerData();

  return (
    <div className="max-w-3xl p-4 bg-white border border-green-600 shadow-lg">
      <button
        onClick={handleAddCustomer}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Customer
      </button>
      <ul>
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="mb-4 p-4 border border-gray-300 rounded flex items-center justify-between"
          >
            <div>
              <input
                type="radio"
                name="customer"
                value={customer.id}
                checked={selectedCustomer === customer.id}
                onChange={() => handleSelectCustomer(customer.id)}
                className="mr-2"
              />
              <span className="font-bold">{customer.storename}</span>
              <span className="text-gray-500"> ({"kirana"})</span>
              <address className="text-gray-700">{customer.address}</address>
              <span className="text-gray-700">{customer.phone}</span>
            </div>
            <button
              onClick={() => handleDeleteCustomer(customer.id)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleDeliverHere}
        disabled={!selectedCustomer}
        className={`mt-4 px-4 py-2 ${
          selectedCustomer ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
        } text-white rounded`}
      >
        DELIVER HERE
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveCustomer();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.storename}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, storename: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.pinCode}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, pinCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.state}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, state: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.city}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCustomerData && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">Selected Customer Details</h2>
          <p><strong>Store Name:</strong> {selectedCustomerData.storename}</p>
          <p><strong>Address:</strong> {selectedCustomerData.address}</p>
          <p><strong>Phone:</strong> {selectedCustomerData.phone}</p>
          <p><strong>Pincode:</strong> {selectedCustomerData.pinCode}</p>
          <p><strong>City:</strong> {selectedCustomerData.city}</p>
          <p><strong>State:</strong> {selectedCustomerData.state}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
