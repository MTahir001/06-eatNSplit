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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const showFriendHandler = () => {
    setShowAddFriend(() => !showAddFriend);
  };

  const addFriendHandler = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const selectHandler = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={selectHandler}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={addFriendHandler} />}
        <Button onClick={showFriendHandler}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
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

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <button className="button" onClick={() => onSelection(friend)}>
        {isSelected ? "close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

  const id = crypto.randomUUID();
  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}${id}`,
      id,
    };
    console.log(newFriend);

    onAddFriend(newFriend);

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

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>🙎‍♂️Your Expense</label>
      <input type="text" />

      <label>👩🏻‍🤝‍🧑🏼{selectedFriend.name}'s Expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="friend">{selectedFriend.name}</option>
        <option value="user">you</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
