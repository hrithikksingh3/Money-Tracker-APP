let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

//toggle Dev ID.
function toggleInfoBox() {
    var infoBox = document.getElementById("infoBox");
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
        infoBox.style.display = "block";
    } else {
        infoBox.style.display = "none";
    }
}

// Function to render expenses in the table
function renderExpenses() {
    expenseTableBody.innerHTML = ''; // Clear existing rows
    totalAmount = 0; // Reset total amount
    for (const expense of expenses) {
        if (expense.category === 'Income') {
            totalAmount += expense.amount;
        } else if (expense.category === 'Expense') {
            totalAmount -= expense.amount;
        }

        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            expenses = expenses.filter(e => e !== expense);
            renderExpenses(); // Re-render expenses
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        infoCell.textContent = expense.info;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
    totalAmountCell.textContent = totalAmount;
}

// Event listener for the add button
addBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const info = infoInput.value;
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter valid info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Create data object for the new record
    const data = {
        category_select: category,
        amount_input: amount,
        info: info,
        date_input: date
    };

    // Send data to the server via AJAX
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            expenses.push({ category, amount, info, date });
            renderExpenses(); // Re-render expenses after adding a new one

            // Clear form inputs
            categorySelect.value = '';
            amountInput.value = '';
            infoInput.value = '';
            dateInput.value = '';
        } else {
            alert('Error inserting record');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error inserting record');
    });
});



// // Dark theme test

// // JavaScript to handle theme toggling
// const themeToggleButton = document.getElementById('theme-toggle');
// const currentTheme = localStorage.getItem('theme') || 'light';

// document.addEventListener('DOMContentLoaded', () => {
//     if (currentTheme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'dark');
//     }
// });

// themeToggleButton.addEventListener('click', () => {
//     let theme = document.documentElement.getAttribute('data-theme');
//     if (theme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'light');
//         localStorage.setItem('theme', 'light');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//     }
// });
