import React, { useState, useEffect } from "react";

const TalkPay = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Sent", amount: "$50", date: "Feb 10, 2025" },
    { id: 2, type: "Received", amount: "$120", date: "Feb 9, 2025" },
    { id: 3, type: "Bill Payment", amount: "$30", date: "Feb 8, 2025" },
  ]);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    if (transcript) {
      processCommand(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
      setActionMessage("");
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setTranscript(spokenText);
    };

    recognition.onerror = (event) => {
      setError("Error occurred: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processCommand = (text) => {
    if (text.includes("send money")) {
      setActionMessage("🔵 Processing money transfer...");
      setShowTransactions(false);
    } else if (text.includes("check balance")) {
      setActionMessage("💰 Fetching your account balance...");
      setShowTransactions(false);
    } else if (text.includes("pay bill")) {
      setActionMessage("📄 Initiating bill payment...");
      setShowTransactions(false);
    } else if (text.includes("show transactions")) {
      setActionMessage("📜 Displaying recent transactions...");
      setShowTransactions(true);
    } else {
      setActionMessage("⚠️ Unrecognized command. Try 'Send money', 'Check balance', or 'Show transactions'.");
      setShowTransactions(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">TalkPay 🗨️💵</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Speak to perform transactions.</p>

      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-full text-white ${
          isListening ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"
        } transition`}
      >
        {isListening ? "🎤 Listening..." : "🎙️ Tap to Speak"}
      </button>

      {transcript && (
        <p className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md">
          <strong>You said:</strong> {transcript}
        </p>
      )}

      {actionMessage && (
        <p className="mt-4 p-4 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white rounded-md">
          {actionMessage}
        </p>
      )}

      {showTransactions && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recent Transactions:</h2>
          <ul className="text-gray-700 dark:text-gray-300">
            {transactions.map((txn) => (
              <li key={txn.id} className="border-b py-2">
                {txn.date} - <strong>{txn.type}</strong>: {txn.amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TalkPay;
