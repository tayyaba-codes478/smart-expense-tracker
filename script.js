// 1. Get HTML Elements

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const totalAmount = document.getElementById("totalAmount");
const totalTransactions = document.getElementById("totalTransactions");

const expenseContainer = document.getElementById("expenseContainer");
const expenseCount = document.getElementById("expenseCount");


// 2. Store Expenses

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// 3. Add Expense Function

function addExpense(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Input Validation

    if (name === "" || amount <= 0 || category === "") {
        alert("Please enter valid expense details!");
        return;
    }

    // Create Expense Object

    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    // Add Expense to Array

    expenses.push(newExpense);

    // Save and Update

    saveExpenses();
    displayExpenses();
    updateSummary();

    // Clear Form

    expenseForm.reset();

}


// 4. Display Expenses Function

function displayExpenses() {

    expenseContainer.innerHTML = "";

    // Check Empty List

    if (expenses.length === 0) {

        expenseContainer.innerHTML = `
            <p class="empty-message">
                No expenses yet. Add your first expense!
            </p>
        `;

        return;
    }

    // Display Each Expense

    expenses.forEach(function(expense) {

        const expenseItem = document.createElement("div");

        expenseItem.classList.add("expense-item");

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${escapeHTML(expense.name)}</h3>
                <p>${escapeHTML(expense.category)}</p>
            </div>

            <div class="expense-actions">
                <strong>Rs. ${expense.amount.toLocaleString()}</strong>

                <button class="delete-btn" data-id="${expense.id}">
                    Delete
                </button>
            </div>
        `;

        expenseContainer.appendChild(expenseItem);

    });

}


// 5. Update Summary Function

function updateSummary() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    totalAmount.textContent = "Rs. " + total.toLocaleString();

    totalTransactions.textContent = expenses.length;

    expenseCount.textContent = expenses.length + " Items";

}


// 6. Delete Expense Function

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    saveExpenses();
    displayExpenses();
    updateSummary();

}


// 7. Save Data in Local Storage

function saveExpenses() {

    localStorage.setItem("expenses", JSON.stringify(expenses));

}


// 8. Protect User Input

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(char) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];

    });

}


// 9. Delete Button Event

expenseContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const id = Number(event.target.dataset.id);

        deleteExpense(id);

    }

});


// 10. Form Submit Event

expenseForm.addEventListener("submit", addExpense);


// 11. Initial Display

displayExpenses();
updateSummary();
