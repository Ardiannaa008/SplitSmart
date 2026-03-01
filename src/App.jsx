import { useState, useEffect } from "react";
import MembersSection from "./components/MembersSection";
import AddExpenseSection from "./components/AddExpenseSection";
import ExpenseListSection from "./components/ExpenseListSection";
import BalanceSummarySection from "./components/BalanceSummarySection";

function App() {
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  // 1️⃣ State for groups
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.filter((g) => g.name && g.name.trim() !== "");
  });

  // 2️⃣ State for active group
  const [activeGroup, setActiveGroup] = useState(null);

  // 3️⃣ Sync localStorage & activeGroup
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
    if (groups.length > 0 && !activeGroup) setActiveGroup(groups[0].name);
    if (groups.length === 0) setActiveGroup(null);
  }, [groups]);

  // 4️⃣ Add new group
  const addGroup = () => {
    if (!newGroupName.trim()) return;
    setGroups((prev) => [
      ...prev,
      { name: newGroupName.trim(), members: [], expenses: [] },
    ]);
    setActiveGroup(newGroupName.trim());
    setNewGroupName("");
  };

  // 5️⃣ Delete group
  const deleteGroup = (groupName) => {
    setGroups((prev) => {
      const updated = prev.filter((g) => g.name !== groupName);
      if (activeGroup === groupName) {
        setActiveGroup(updated.length > 0 ? updated[0].name : null);
      }
      return updated;
    });
  };

  // 6️⃣ Update members
  const updateGroupMembers = (groupName, memberName) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.name === groupName
          ? { ...g, members: [...g.members, memberName] }
          : g
      )
    );
  };

  // 7️⃣ Add expense
  const addExpense = (groupName, expense) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.name === groupName
          ? { ...g, expenses: [...g.expenses, expense] }
          : g
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Groups</h2>

        {/* Add Group Section */}
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            placeholder="New group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addGroup}
            className="bg-purple-500 text-white px-3 py-2 rounded w-full"
          >
            Add Group
          </button>
        </div>

        {/* Group List */}
        <ul className="mt-6 flex flex-col gap-2">
          {groups.map((group) => (
            <li
              key={group.name}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                activeGroup === group.name
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {/* Select group */}
              <span onClick={() => setActiveGroup(group.name)}>
                {group.name}
              </span>

              {/* Delete button */}
              <button
                onClick={() => setGroupToDelete(group.name)}
                className="text-white hover:text-gray-300 font-bold"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8">
        {activeGroup && groups.find((g) => g.name === activeGroup) ? (
          <>
            <h1 className="text-3xl font-bold mb-6">{activeGroup}</h1>
            <div className="grid grid-cols-2 gap-6">
              <MembersSection
                group={groups.find((g) => g.name === activeGroup)}
                updateGroupMembers={updateGroupMembers}
              />
              <AddExpenseSection
                group={groups.find((g) => g.name === activeGroup)}
                addExpense={addExpense}
              />
              <ExpenseListSection
                group={groups.find((g) => g.name === activeGroup)}
              />
              <BalanceSummarySection
                group={groups.find((g) => g.name === activeGroup)}
              />
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-xl">
            Create your first group to get started!
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {groupToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg transform transition-transform duration-200 scale-100">
            <h2 className="text-xl font-bold mb-4">Delete Group?</h2>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <strong>{groupToDelete}</strong> permanently?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setGroupToDelete(null)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGroup(groupToDelete);
                  setGroupToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;