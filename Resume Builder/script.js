// LIVE UPDATE
function updateResume() {
    document.getElementById("p_name").innerText =
        document.getElementById("name").value || "Your Name";

    document.getElementById("p_title").innerText =
        document.getElementById("title").value || "Your Title";

    document.getElementById("p_summary").innerText =
        document.getElementById("summary").value;

    document.getElementById("p_education").innerText =
        document.getElementById("education").value;

    document.getElementById("p_experience").innerText =
        document.getElementById("experience").value;

    // Skills
    const skills = document.getElementById("skills").value.split(",");
    const list = document.getElementById("p_skills");

    list.innerHTML = "";

    skills.forEach(skill => {
        if (skill.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = skill.trim();
            list.appendChild(li);
        }
    });
}

// IMAGE UPLOAD
document.getElementById("image").addEventListener("change", function () {
    const reader = new FileReader();

    reader.onload = function () {
        document.getElementById("p_image").src = reader.result;
    }

    reader.readAsDataURL(this.files[0]);
});

// DOWNLOAD PDF
function downloadPDF() {
    const element = document.getElementById("resume");

    html2pdf().from(element).save("resume.pdf");
}