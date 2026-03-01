import { useState } from "react";

function MembersSection({ group, updateGroupMembers }) {
  const [newMember, setNewMember] = useState("");

  const handleAdd = () => {
    if (newMember.trim() === "") return;
    updateGroupMembers(group.name, newMember.trim()); // ← This line must be here
    setNewMember("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Members</h3>
      <ul className="mb-4">
        {group.members.map((member) => (
          <li key={member} className="p-1">{member}</li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add member"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <button
          onClick={handleAdd}  // ← This must be exact
          className="bg-purple-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default MembersSection;