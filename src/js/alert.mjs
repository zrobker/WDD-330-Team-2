class alert {
  
    async displayMessages() {
        const messages = await this.findMessages();
        for (const message of messages) {
            this.createMessage(message)
        }
    }

    async findMessages() {
        const response = await fetch("/json/alerts.json");
        return response.json();
    }

    createMessage(message) {
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.className = "alert-list";
        section.innerHTML = message.message;
        section.style.background = message.background;
        section.style.color = message.color;
        main.prepend(section);
    }
}

export default alert;