export default async function decorate(block) {
    const divs = block.querySelectorAll(':scope > div > div');
    const teaserContent = divs[0];
    teaserContent.classList.add('teaser-content');
    teaserContent.querySelectorAll('a').forEach((a) => {
        a.classList.add('teaser-cta');
    });
    teaserContent.querySelector('p').classList.add('teaser-description');
    divs[1].classList.add('teaser-image');

    teaserContent.querySelector('u').classList.add('txt-type');

    initTypeWriter();
}

// Init App
function initTypeWriter() {
    const teaserSection = document.querySelector(".section.teaser-container");
    const txtElement = document.querySelectorAll(".txt-type");
    if (txtElement.length) {
        const txtElement = document.querySelector('.txt-type');
        const words = teaserSection.getAttribute("data-words").split(',');
        const wait = teaserSection.getAttribute("data-wait");
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
    console.log("Init teaser type writer");
}

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}
