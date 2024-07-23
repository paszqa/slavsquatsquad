function showDiv(divId) {
    // Hide all content divs
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }
    
    // Show the selected content div
    document.getElementById(divId).style.display = 'block';
    
    // Load CSV data for the fresh releases or upcoming sections
    if (divId === 'fresh-releases') {
        loadCSVData('https://raw.githubusercontent.com/paszqa/slavsquatsquad/main/data/new-eng.csv', 'fresh-releases-table');
    } else if (divId === 'upcoming') {
        loadCSVData('https://raw.githubusercontent.com/paszqa/slavsquatsquad/main/data/month-eng.csv', 'upcoming-table');
    }
}

function loadCSVData(filePath, tableId) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const tableContainer = document.getElementById(tableId);
            const rows = data.split('\n');
            let tableHTML = '<table><tr>';
            
            // Split the first row (header)
            const headers = rows[0].split(';');
            headers.forEach(header => {
                tableHTML += `<th>${header.trim()}</th>`;
            });
            tableHTML += '</tr>';
            
            // Split the remaining rows (data)
            for (let i = 1; i < rows.length; i++) {
                if (rows[i].trim()) {
                    const cells = rows[i].split(';');
                    tableHTML += '<tr>';
                    cells.forEach(cell => {
                        tableHTML += `<td>${cell.trim()}</td>`;
                    });
                    tableHTML += '</tr>';
                }
            }
            tableHTML += '</table>';
            tableContainer.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading CSV data:', error));
}
