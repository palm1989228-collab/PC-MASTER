const header = document.querySelector("header");

let lastScroll = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY;
    
    if (Math.abs(currentScroll - lastScroll) < 5) {
    return;
 }
    if (currentScroll <= 0) {
    header.classList.remove("hide");

 } else if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide");

 } else if (currentScroll < lastScroll) {
    header.classList.remove("hide");
 }
lastScroll = currentScroll;
}, { passive: true });

const cards = document.querySelectorAll(".service-card");

const reveals = document.querySelectorAll(".reveal");

const revealCard = function(entries, observer) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

};

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(revealCard, { threshold: 0.12 });

    cards.forEach(function(card, index) {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    reveals.forEach(function(element) {
        observer.observe(element);
    });
} else {
    cards.forEach(function(card) {
        card.classList.add("show");
    });

    reveals.forEach(function(element) {
        element.classList.add("show");
    });
}

const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

// Находим все карточки услуг
const serviceCards = document.querySelectorAll('.service-card');

const serviceInfo = {
    windows: {
        title: 'Установка Windows',
        description: 'Установка и настройка Windows, драйверов и необходимых программ. Состав работ и сохранение личных файлов согласуем заранее.'
    },

    cleaning: {
        title: 'Чистка ПК и ноутбуков',
        description: 'Удаление пыли и обслуживание системы охлаждения компьютера или ноутбука. Объём разборки зависит от модели устройства.'
    },

    thermal: {
        title: 'Замена термопасты',
        description: 'Замена термопасты на процессоре или видеокарте с обслуживанием системы охлаждения.'
    },

    diagnostics: {
        title: 'Диагностика и ремонт',
        description: 'Поиск уязвимостей, ошибок и неисправностей. Обычно диагностика занимает от 10 минут до 1,5–2 часов. Стоимость — 300 ₽; если затем выполняется ремонт, восстановление или замена, диагностика бесплатна.'
    },

    build: {
        title: 'Сборка компьютеров',
        description: 'Подбор совместимых комплектующих и сборка ПК или сервера под задачу. Стоимость деталей рассчитывается на момент заказа, итоговую сумму согласуем заранее.'
    },

    software: {
        title: 'Драйверы, программы и настройка',
        description: 'Установка драйверов и программ, настройка устройств, отдельные задачи по программированию и перепрошивке.'
    },

    viruses: {
        title: 'Удаление вирусов',
        description: 'Поиск и удаление вредоносных программ. Также можно обсудить восстановление данных после диагностики устройства.'
    },

    upgrade: {
        title: 'Апгрейд компьютеров',
        description: 'Подбор и замена комплектующих для компьютеров и серверов. Сначала согласуем детали и их стоимость, затем приступим к работе.'
    }
};

let lastFocusedCard = null;

function openService(card) {
    const service = serviceInfo[card.dataset.service];

    if (!service) {
        return;
    }

    lastFocusedCard = card;
    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalClose.focus();
}

function closeServiceModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedCard) {
        lastFocusedCard.focus();
    }
}

// Открываем описание мышью или клавиатурой
serviceCards.forEach(function(card) {
    card.addEventListener('click', function() {
        openService(card);
    });

    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openService(card);
        }
    });
});

modalClose.addEventListener('click', function() {
    closeServiceModal();
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeServiceModal();
    }
});

modal.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        modalClose.focus();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeServiceModal();
    }
});

const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
