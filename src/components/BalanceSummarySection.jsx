function BalanceSummarySection({ group }) {
  if (!group) return null;

  // Initialize balances
  const balances = {};

  group.members.forEach((member) => {
    balances[member] = 0;
  });

  // Calculate balances
  group.expenses.forEach((expense) => {
    const splitAmount = expense.amount / expense.splitBetween.length;

    // Person who paid gets full amount
    balances[expense.paidBy] += expense.amount;

    // Everyone in split owes their share
    expense.splitBetween.forEach((member) => {
      balances[member] -= splitAmount;
    });
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-2">
      <h3 className="text-xl font-bold mb-4">Balance Summary</h3>

      {group.members.length === 0 ? (
        <p className="text-gray-500">No members yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {Object.entries(balances).map(([member, balance]) => (
            <li
              key={member}
              className="flex justify-between border p-3 rounded-lg"
            >
              <span className="font-medium">{member}</span>

              <span
                className={`font-bold ${
                  balance > 0
                    ? "text-green-600"
                    : balance < 0
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                €{balance.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BalanceSummarySection;