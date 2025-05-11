import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Login from './components/Login';
import Signup from './components/Signup';
import Wallet from './components/Wallet';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SendMoney from './pages/SendMoney';
import AddMoney from './pages/AddMoney';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import Home from './pages/Home';
import BillSplitterPage from './pages/BillSplitterPage';
import BillSplitResultsPage from './pages/BillSplitResultsPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import BillPayments from './pages/BillPayments';
import QRCodePayments from './pages/QRCodePayments';
import TransactionCategories from './pages/TransactionCategories';
import MultiCurrency from './pages/MultiCurrency';
import Rewards from './pages/Rewards';
import SaveCardsPage from './pages/SaveCardsPage';
import BankLinkingPage from './pages/BankLinkingPage';
import TalkPay from './pages/TalkPay'; // Added TalkPay import
import TransactionHistory from './pages/TransactionHistory';


const App = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(1000); // Default balance
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed: ", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setUser(auth.currentUser);
    console.log("User after login: ", auth.currentUser);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    console.log("User after logout: ", null);
  };

  const handleAddMoney = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions((prev) => [
      { type: 'Added', amount, timestamp: new Date().toLocaleString() },
      ...prev
    ]);
  };

  const handleSendMoney = (amount, recipient) => {
    if (amount > balance) {
      alert("Insufficient Balance!");
      return;
    }
    setBalance((prevBalance) => prevBalance - amount);
    setTransactions((prev) => [
      { type: `Sent to ${recipient}`, amount, timestamp: new Date().toLocaleString() },
      ...prev
    ]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar onLogout={handleLogout} />
          <div className="p-6">
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/talkpay" element={<TalkPay />} /> {/* Added TalkPay route */}

              {/* Protected Routes */}
              <Route
                path="/wallet"
                element={
                  user ? (
                    <Wallet onLogout={handleLogout} user={user} balance={balance} transactions={transactions} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/send"
                element={user ? <SendMoney onSendMoney={handleSendMoney} /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/add"
                element={user ? <AddMoney onAddMoney={handleAddMoney} /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/profile"
                element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/transactions"
                element={user ? <Transactions transactions={transactions} /> : <Navigate to="/login" replace />}
              />

              {/* Additional Features */}
              <Route path="/bill-payments" element={<BillPayments />} />
              <Route path="/qr-payments" element={<QRCodePayments />} />
              <Route path="/categories" element={<TransactionCategories />} />
              <Route path="/multi-currency" element={<MultiCurrency />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/save-cards" element={<SaveCardsPage />} />
              <Route path="/bill-splitter" element={<BillSplitterPage />} />
              <Route path="/bill-split-results" element={<BillSplitResultsPage />} />
              <Route path="/payment-history" element={<PaymentHistoryPage transactions={transactions} />} />
              <Route path="/bank-link" element={<BankLinkingPage />} />
              <Route path="/transaction-history" element={<TransactionHistory />} />
              
              

              {/* Default Route */}
              <Route path="/" element={user ? <Navigate to="/wallet" replace /> : <RedirectToLogin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

// Redirect to Login Component
const RedirectToLogin = () => (
  <div className="text-center">
    <p>Please log in or sign up</p>
    <Link to="/login" className="text-blue-500">Go to Login</Link>
  </div>
);

export default App;
