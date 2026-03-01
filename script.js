// Dark/Light Mode
function toggleMode() {
    document.body.classList.toggle("light-mode");
}

// Scroll Reveal Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});

// Typing Animation
const text = "AI Engineer | Software Developer | Problem Solver";
let index = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
    }
}

window.onload = typeEffect;

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Message = mongoose.model("Message", messageSchema);

app.post("/contact", async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json({ message: "Message saved successfully!" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

document.getElementById("contactForm")?.addEventListener("submit", async function(e){
    e.preventDefault();

    const response = await fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
    });

    const data = await response.json();
    alert(data.message);
});

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value;
    if (!message) return;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = "";

    chatBox.innerHTML += `<p><strong>AI:</strong> Thinking...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simple smart responses
    let reply = "I'm Fawaaz's AI assistant. Ask me about skills, projects, or goals!";

    if (message.toLowerCase().includes("skill")) {
        reply = "Fawaaz works with HTML, CSS, JavaScript, Python, C, C++, and AI fundamentals.";
    } 
    else if (message.toLowerCase().includes("project")) {
        reply = "He builds responsive websites, full-stack apps, and is exploring AI systems.";
    }
    else if (message.toLowerCase().includes("goal")) {
        reply = "His mission is to become a top-tier AI Engineer and software architect.";
    }

    setTimeout(() => {
        chatBox.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const chatBox = document.getElementById("chatBox");
        if (chatBox) {
            chatBox.innerHTML += `<p><strong>AI:</strong> Hi 👋 I'm Fawaaz's assistant. Ask me about his skills or projects!</p>`;
        }
    }, 1500);
});

