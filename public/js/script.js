async function testAPI() {
  const dateInput = document.getElementById('dateInput').value;
  const result = document.getElementById('result');
  
  try {
    const response = await fetch(`/api/timestamp/${dateInput}`);
    const data = await response.json();
    result.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    result.innerHTML = `Error: ${error.message}`;
  }
}

async function testCurrentTime() {
  const result = document.getElementById('result');
  
  try {
    const response = await fetch('/api/timestamp');
    const data = await response.json();
    result.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    result.innerHTML = `Error: ${error.message}`;
  }
}
