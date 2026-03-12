const backendURL = "https://gaming-platform-8m93.onrender.com";

async function fetchUsers() {
  try {
    const res = await fetch(backendURL + "/api/admin/users");
    const users = await res.json();
    const table = document.getElementById("usersTable");
    users.forEach(user => {
      const row = table.insertRow();
      row.insertCell(0).innerText = user.playerCode;
      row.insertCell(1).innerText = user.username;
      row.insertCell(2).innerText = user.email;
      row.insertCell(3).innerText = user.balance;
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}
fetchUsers();
