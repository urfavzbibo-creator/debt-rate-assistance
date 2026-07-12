let currentAgent = "";

// --- 1. Login Logic (Name Only) ---
document.getElementById("login-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("agent-name").value.trim();
    const errorText = document.getElementById("login-error");

    if (nameInput === "") {
        errorText.style.display = "block";
        return;
    }

    // Set agent name and hide error
    currentAgent = nameInput;
    errorText.style.display = "none";

    // Transition UI
    document.getElementById("login-section").style.display = "none";
    const appSection = document.getElementById("app-section");
    appSection.style.display = "flex";
    appSection.classList.add("fade-in");
    
    document.getElementById("welcome-message").innerText = `أهلاً بك يا ${currentAgent}`;
});

// Logout Logic
document.getElementById("logout-btn").addEventListener("click", () => {
    currentAgent = "";
    
    // Reset inputs
    document.getElementById("agent-name").value = "";
    document.getElementById("debt-amount").value = "";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("tt-output").value = "";
    
    // Transition UI back to login
    document.getElementById("app-section").style.display = "none";
    const loginSection = document.getElementById("login-section");
    loginSection.style.display = "flex";
    loginSection.classList.add("fade-in");
});

// --- 2. Calculator Logic ---
document.getElementById("calc-btn").addEventListener("click", () => {
    const debtInput = document.getElementById("debt-amount").value;
    const debt = parseFloat(debtInput);
    const errorText = document.getElementById("calc-error");

    if (isNaN(debt) || debt <= 0) {
        errorText.style.display = "block";
        document.getElementById("result-box").style.display = "none";
        return;
    }

    errorText.style.display = "none";
    let rateStr = "";
    let rateDecimal = 0;

    // Tiers based on your image
    if (debt <= 100) {
        rateStr = "100%";
        rateDecimal = 1.00;
    } else if (debt <= 300) {
        rateStr = "33%";
        rateDecimal = 0.33;
    } else if (debt <= 700) {
        rateStr = "20%";
        rateDecimal = 0.20;
    } else if (debt <= 1300) {
        rateStr = "13%";
        rateDecimal = 0.13;
    } else {
        rateStr = "8%";
        rateDecimal = 0.08;
    }

    // Calculate (3 decimals for Kuwaiti Dinar)
    const finalAmount = (debt * rateDecimal).toFixed(3); 

    // Update UI
    document.getElementById("rate-percent").innerText = rateStr;
    document.getElementById("final-amount").innerText = finalAmount;
    document.getElementById("result-box").style.display = "block";

    // Generate TT
    const ttMessage = `تم سداد المبلغ المستحق للتسوية وقدره ${finalAmount} د.ك من قبل العميل. يرجى التكرم بإعادة توصيل الخطوط للرقم المعني. \n\nبواسطة الموظف: ${currentAgent}`;
    document.getElementById("tt-output").value = ttMessage;
});

// --- 3. Better Copy UX ---
document.getElementById("copy-btn").addEventListener("click", () => {
    const ttBox = document.getElementById("tt-output");
    const copyBtn = document.getElementById("copy-btn");
    
    if(ttBox.value.trim() === "") {
        copyBtn.innerText = "لا يوجد تذكرة!";
        copyBtn.style.borderColor = "#ff3366";
        copyBtn.style.color = "#ff3366";
        
        setTimeout(() => {
            copyBtn.innerText = "نسخ التذكرة";
            copyBtn.style.borderColor = "var(--neon-purple)";
            copyBtn.style.color = "var(--neon-purple)";
        }, 2000);
        return;
    }

    ttBox.select();
    ttBox.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(ttBox.value).then(() => {
        // Smooth UX feedback instead of alert()
        copyBtn.innerText = "تم النسخ بنجاح! ✔️";
        copyBtn.style.backgroundColor = "var(--neon-purple)";
        copyBtn.style.color = "white";

        setTimeout(() => {
            copyBtn.innerText = "نسخ التذكرة";
            copyBtn.style.backgroundColor = "transparent";
            copyBtn.style.color = "var(--neon-purple)";
        }, 2000);
    });
});
