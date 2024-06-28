function showDiv(divId) {
    // Hide all content divs
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }
    
    // Show the selected content div
    document.getElementById(divId).style.display = 'block';
}
