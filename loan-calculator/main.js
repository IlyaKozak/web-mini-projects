document.getElementById('load-form').addEventListener('submit', calculateBtnPressed);


function calculateBtnPressed(event) {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  if (amount.value && interest.value && years.value) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 500, amount, interest, years);    
  } else {
    showError('Please check your numbers');
  }

  event.preventDefault(); 
}

function calculateResults() {
  // UI Vars
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly payment formula
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  const error_div = document.createElement('div');
  error_div.className = 'alert alert-danger';
  error_div.appendChild(document.createTextNode(error));

  if (!document.querySelector('.alert')) {
    card.insertBefore(error_div, heading);  
    setTimeout(_ => {document.querySelector('.alert').remove();}, 2000);  
  }
}
