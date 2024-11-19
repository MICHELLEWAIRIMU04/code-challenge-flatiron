import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  function handleAddTransaction(newTransaction) {
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
  }

  const displayedTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={setSearchTerm} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;

