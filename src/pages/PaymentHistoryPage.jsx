// src/pages/PaymentHistoryPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentHistoryPage = ({ transactions }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Payment History</h1>
      {transactions.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No transactions available.</p>
      ) : (
        <div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Recipient</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{transaction.date}</td>
                  <td className="py-2 px-4">{transaction.recipient}</td>
                  <td className="py-2 px-4 text-green-600">${transaction.amount}</td>
                  <td className="py-2 px-4">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => navigate('/wallet')}
        className="w-full py-2 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600 transition"
      >
        Go Back to Wallet
      </button>
    </div>
  );
};

export default PaymentHistoryPage;
