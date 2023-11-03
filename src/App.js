import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const showFriendHandler = () => {
    setShowAddFriend(() => !showAddFriend);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={showFriendHandler}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList() {
  const friend = initialFriends;
  return (
    <ul>
      {friend.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you ${friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <button className="button">Select</button>
    </li>
  );
}

function FormAddFriend() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();
  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}=?${id}`,
      id,
    };

    console.log(newFriend);

    setImage("https://i.pravatar.cc/48");
    setName("");
  };
  return (
    <form className="form-add-friend" onSubmit={submitHandler}>
      <label>👩🏻‍🤝‍🧑🏼Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📸Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with TEMP</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>🙎‍♂️Your Expense</label>
      <input type="text" />

      <label>👩🏻‍🤝‍🧑🏼TEMP's Expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="friend">TEMP</option>
        <option value="user">you</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
