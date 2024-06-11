export default async function decorate(block) {    
    const divs = block.querySelectorAll(':scope > div > div');
    const teaserContent = divs[0];
    teaserContent.classList.add("teaser-content");
    teaserContent.querySelectorAll('a').forEach(a => {
        a.classList.add("teaser-cta");
    });
    divs[1].classList.add('teaser-image');
}
