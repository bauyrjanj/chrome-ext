document.addEventListener('DOMContentLoaded', function () {
  let dateContainer = document.getElementById('date-container');
  const selectLdap = document.getElementById('select-ldap');
  const selectBug = document.getElementById('select-bug');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resumeBtn = document.getElementById('resume-btn');

  // Timer variables
  let timer;
  let seconds = 0;
  let idx = 0;

  // Cloud Bigtable configurations
  const {Bigtable} = require('@google-cloud/bigtable');

  // Replace these variables with your own values
  const projectId = 'firm-lacing-313417';
  const instanceId = 'ops-logger';
  const tableId = 'ops-logger';

  // Create a Bigtable client
  const bigtable = new Bigtable({
  
        projectId: projectId,
  
  })

  // Define the row key and column family
  const rowKey = idx;
  const columnFamily = 'start-ops';

  // Connect to the instance and open the table
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // Get today's date
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Display the date
  dateContainer.textContent = 'Today\'s Date:\n' + formattedDate;

  // Populate the dropdowns with sample data (replace with your own data)
  let wranglerLdaps = ['LDAP1', 'LDAP2', 'LDAP3'];
  let bugIds = ['Bug1', 'Bug2', 'Bug3'];

  wranglerLdaps.forEach(function (ldap) {
    let option = document.createElement('option');
    option.value = ldap;
    option.text = ldap;
    selectLdap.appendChild(option);
  });

  bugIds.forEach(function (bug) {
    let option = document.createElement('option');
    option.value = bug;
    option.text = bug;
    selectBug.appendChild(option);
  });

  // Button click event handlers (replace with your own logic)
  startBtn.addEventListener('click', function () {
    console.log('Start Operations clicked');
    
    // Trigger an alert
    alert('Starting operations!');

    // Call a function
    startOperations();

  });

  function startOperations(){
    // Clear any existing timer
    clearInterval(timer);

    // Set up a new timer
    timer = setInterval(function () {
      seconds++;
      console.log('Timer: ' + seconds + ' seconds');
    }, 1000);
    // Create a mutation to insert data
    const mutation = [
    {
      method: 'insert',
      data: {
        [columnFamily]: {
        'start-ops': seconds,
       },
     },
   },
 ];
    table
       .row(rowKey)
       .create(mutation)
       .then(() => {
         console.log('Data written to Bigtable successfully.');
       })
       .catch((err) => {
        console.error('Error writing to Bigtable:', err);
       })
  
  }

  pauseBtn.addEventListener('click', function () {
    console.log('Pause Operations clicked');
  });

  stopBtn.addEventListener('click', function () {
    console.log('Stop Operations clicked');
  });

  resumeBtn.addEventListener('click', function () {
    console.log('Resume Operations clicked');
  });
});
