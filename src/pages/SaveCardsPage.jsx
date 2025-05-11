import React, { useState } from 'react';

const SaveCardsPage = () => {
  const [cards, setCards] = useState([]); 
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSaveCard = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cardholderName || !cvv) {
      setError('⚠️ Please fill all fields!');
      return;
    }
    
    // Validate card number
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setError('⚠️ Card number must be 16 digits.');
      return;
    }

    // Validate CVV
    if (cvv.length !== 3 || isNaN(cvv)) {
      setError('⚠️ CVV must be 3 digits.');
      return;
    }

    const newCard = { cardNumber, expiryDate, cardholderName, cvv };
    setCards([...cards, newCard]);

    // Reset fields
    setCardNumber(''); 
    setExpiryDate(''); 
    setCardholderName(''); 
    setCvv(''); 
    setError('');
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((_, cardIndex) => cardIndex !== index);
    setCards(updatedCards);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">💳 Save Your Cards</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSaveCard}>
          <div className="mb-4">
            <label className="block text-gray-700">Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              maxLength="16"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4 flex justify-between">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="month"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                maxLength="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600 transition"
          >
            Save Card
          </button>
        </form>

        <h2 className="text-xl font-semibold mt-10 mb-4">💼 Saved Cards</h2>
        {cards.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No cards saved yet.</p>
        ) : (
          <ul>
            {cards.map((card, index) => (
              <li
                key={index}
                className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{card.cardholderName}</h3>
                  <p className="text-sm text-gray-500">💳 Ending in {card.cardNumber.slice(-4)}</p>
                  <p className="text-sm text-gray-500">📅 Expires: {card.expiryDate}</p>
                </div>
                <button
                  onClick={() => handleDeleteCard(index)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SaveCardsPage;
