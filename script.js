let payments = JSON.parse(localStorage.getItem("payments")) || [];

function saveToStorage() {
  localStorage.setItem("payments", JSON.stringify(payments));
}

function addPayment() {
  const count = document.getElementById("labourCount").value;
  const amount = document.getElementById("paymentAmount").value;
  const hours = document.getElementById("hoursWorked").value;
  const date = document.getElementById("paymentDate").value;

  if (count && amount && date) {
    payments.push({ count, amount, hours, date });
    saveToStorage();
    displayPayments();
    updateSummary();
    document.getElementById("labourCount").value = "";
    document.getElementById("paymentAmount").value = "";
    document.getElementById("hoursWorked").value = "";
    document.getElementById("paymentDate").value = "";
  } else {
    alert("Please fill all fields.");
  }
}

function deletePayment(index) {
  payments.splice(index, 1);
  saveToStorage();
  displayPayments();
  updateSummary();
}

function displayPayments() {
  const tbody = document.getElementById("paymentTableBody");
  tbody.innerHTML = "";
  payments.forEach((pay, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${pay.count}</td>
        <td>₹${pay.amount}</td>
        <td>${pay.hours || "-"}</td>
        <td>${pay.date}</td>
        <td><button onclick="deletePayment(${index})">Delete</button></td>
      </tr>
    `;
  });
}

function updateSummary() {
  let totalAmount = 0;
  let totalLabourers = 0;
  payments.forEach(pay => {
    totalAmount += parseFloat(pay.amount);
    totalLabourers += parseInt(pay.count);
  });

  document.getElementById("totalPaid").textContent = `Total Paid: ₹${totalAmount.toFixed(2)}`;
  document.getElementById("totalLabourers").textContent = `Total Labourers Paid: ${totalLabourers}`;
}

window.onload = function () {
  displayPayments();
  updateSummary();
};
document.getElementById("aboutBtn").onclick = function () {
  document.getElementById("aboutModal").style.display = "block";
};

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("aboutModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
