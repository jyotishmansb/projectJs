import { setupDemos } from './demos.js';

export function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-modal');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    return closeModal;
}

export function openModal(topic) {
    const modal = document.getElementById('modal');
    
    document.getElementById('modal-tag').textContent = topic.tag;
    document.getElementById('modal-title').textContent = topic.title;
    document.getElementById('modal-body').innerHTML = topic.content;
    
    const demoContainer = document.getElementById('modal-demo');
    if (topic.demo) {
        demoContainer.innerHTML = topic.demo;
        setupDemos(topic.id);
    } else {
        demoContainer.innerHTML = '';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}
