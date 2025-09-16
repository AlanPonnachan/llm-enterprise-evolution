document.addEventListener('DOMContentLoaded', function() {
    // Reading progress bar
    function updateReadingProgress() {
        const article = document.querySelector('.post-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = (scrollTop - articleTop + windowHeight/2) / articleHeight;
        const progressPercentage = Math.max(0, Math.min(100, progress * 100));
        
        document.querySelector('.reading-progress').style.width = progressPercentage + '%';
    }
    
    window.addEventListener('scroll', updateReadingProgress);
    
    // Table of Contents highlighting
    function highlightCurrentSection() {
        const headings = document.querySelectorAll('.post-content h2, .post-content h3');
        const tocLinks = document.querySelectorAll('.table-of-contents a');
        
        let current = '';
        
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                current = heading.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Estimated reading time for sections
    function calculateReadingTime() {
        const sections = document.querySelectorAll('.post-content section');
        sections.forEach(section => {
            const words = section.innerText.split(/\s+/).length;
            const readingTime = Math.ceil(words / 200);
            
            const timeElement = document.createElement('span');
            timeElement.className = 'section-reading-time';
            timeElement.textContent = `${readingTime} min read`;
            
            const heading = section.querySelector('h2, h3');
            if (heading) {
                heading.appendChild(timeElement);
            }
        });
    }
    
    calculateReadingTime();
});