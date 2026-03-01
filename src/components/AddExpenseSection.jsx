import { useState } from "react";

function AddExpenseSection({ group, addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (!group) return null;

  const handleCheckboxChange = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = () => {
    if (!title || !amount || !paidBy || selectedMembers.length === 0) return;

    const newExpense = {
      title,
      amount: parseFloat(amount),
      paidBy,
      splitBetween: selectedMembers,
    };

    addExpense(group.name, newExpense);

    setTitle("");
    setAmount("");
    setPaidBy("");
    setSelectedMembers([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">Add Expense</h3>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Who paid?</option>
          {group.members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>

        <div>
          <p className="font-semibold mb-2">Split Between:</p>
          {group.members.map((member) => (
            <label key={member} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedMembers.includes(member)}
                onChange={() => handleCheckboxChange(member)}
              />
              {member}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white py-2 rounded"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseSection;