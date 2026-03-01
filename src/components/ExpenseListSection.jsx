import { useState } from "react";

function ExpenseListSection({ group }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!group) return null;

  const toggleExpense = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-2">
      <h3 className="text-xl font-bold mb-4">Expense List</h3>

      {group.expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {group.expenses.map((expense, index) => {
            const splitAmount =
              expense.amount / expense.splitBetween.length;

            return (
              <li
                key={index}
                className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleExpense(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {expense.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Paid by: {expense.paidBy}
                    </p>
                  </div>

                  <div className="text-purple-600 font-bold text-lg">
                    €{expense.amount.toFixed(2)}
                  </div>
                </div>

                {/* Expanded Section */}
                {expandedIndex === index && (
                  <div className="mt-4 border-t pt-3 text-sm text-gray-700">
                    <ul className="flex flex-col gap-2">
                      {expense.splitBetween
                        .filter(
                          (member) => member !== expense.paidBy
                        )
                        .map((member) => (
                          <li key={member}>
                            <span className="font-medium">
                              {member}
                            </span>{" "}
                            owes{" "}
                            <span className="font-medium">
                              {expense.paidBy}
                            </span>{" "}
                            €{splitAmount.toFixed(2)}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ExpenseListSection;