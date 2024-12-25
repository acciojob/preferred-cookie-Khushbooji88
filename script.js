// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expire in 'days'
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value by its name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Apply the stored preferences
function applyPreferences() {
    const fontSize = getCookie("fontsize");
    const fontColor = getCookie("fontcolor");

    if (fontSize) {
        document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
        document.getElementById("fontsize").value = fontSize;
    }
    if (fontColor) {
        document.documentElement.style.setProperty('--fontcolor', fontColor);
        document.getElementById("fontcolor").value = fontColor;
    }
}

// Event listener for form submission
document.getElementById("preferencesForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Get values from the form inputs
    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // Save the preferences in cookies
    setCookie("fontsize", fontSize, 365);  // Save for 1 year
    setCookie("fontcolor", fontColor, 365);  // Save for 1 year
});

// Apply preferences when the page loads
applyPreferences();
