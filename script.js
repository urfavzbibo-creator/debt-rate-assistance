// --- 1. Calculator Logic (Only calculates the debt now) ---
document.getElementById("calc-btn").addEventListener("click", () => {
    const debtInput = document.getElementById("debt-amount").value;
    const debt = parseFloat(debtInput);
    const errorText = document.getElementById("calc-error");

    // Check for valid input
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

    // Update UI (But do NOT generate TT here anymore)
    document.getElementById("rate-percent").innerText = rateStr;
    document.getElementById("final-amount").innerText = finalAmount;
    document.getElementById("result-box").style.display = "block";
});


// --- 2. Generate TT Logic (Based on manual paid input) ---
document.getElementById("generate-tt-btn").addEventListener("click", () => {
    const paidInput = document.getElementById("paid-amount").value;
    const paid = parseFloat(paidInput);
    const ttErrorText = document.getElementById("tt-error");

    // Check for valid paid amount
    if (isNaN(paid) || paid <= 0) {
        ttErrorText.style.display = "block";
        return;
    }

    ttErrorText.style.display = "none";
    
    // Format to 3 decimals
    const finalPaidAmount = paid.toFixed(3);

    // Generate TT using the manually entered paid amount
    const ttMessage = `تم سداد المبلغ المستحق للتسوية وقدره ${finalPaidAmount} د.ك من قبل العميل. يرجى التكرم بإعادة توصيل الخطوط للرقم المعني.`;
    document.getElementById("tt-output").value = ttMessage;
});


// --- 3. Better Copy UX ---
document.getElementById("copy-btn").addEventListener("click", () => {
    const ttBox = document.getElementById("tt-output");
    const copyBtn = document.getElementById("copy-btn");
    
    // If empty
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

    // Copy to clipboard
    ttBox.select();
    ttBox.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(ttBox.value).then(() => {
        // Smooth UX feedback
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
