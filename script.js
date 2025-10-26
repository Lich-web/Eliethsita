document.addEventListener('DOMContentLoaded', () => {
  // Quita la clase 'not-loaded' para iniciar las animaciones CSS
  const timer = setTimeout(() => {
    document.body.classList.remove('not-loaded');
    clearTimeout(timer);
  }, 1000);

  // --- Animación para el texto inicial ---
  const title = document.querySelector('.text-container h1');
  const paragraph = document.querySelector('.text-container p');
  
  const moveTextUp = () => {
    title.classList.add('title-move-up');
    paragraph.classList.add('title-move-up');
  };

  const textAnimationTimeout = setTimeout(moveTextUp, 4000); // El texto se moverá hacia arriba después de 4 segundos

  // Ocultar el texto si el usuario hace scroll antes de que termine el temporizador
  window.addEventListener('scroll', () => {
    clearTimeout(textAnimationTimeout); // Cancelamos la animación programada
    moveTextUp(); // Ejecutamos la animación inmediatamente
  }, { once: true }); // El evento se ejecuta solo una vez

  // --- Generación de pétalos ---
  const petalsContainer = document.querySelectorAll('.flower__leafs');
  petalsContainer.forEach(container => {
    // Limpiamos por si acaso, aunque ya lo hicimos en el HTML
    const whiteCircle = container.querySelector('.flower__white-circle');
    const lights = container.querySelectorAll('.flower__light');
    container.innerHTML = ''; // Limpia el contenedor

    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('div');
      petal.classList.add('flower__leaf');
      petal.style.transform = `translate(-50%, -10%) rotate(${i * 30}deg)`;
      container.appendChild(petal);
    }
    // Volvemos a añadir los elementos que no son pétalos
    container.appendChild(whiteCircle);
    lights.forEach(light => container.appendChild(light));
  });

  // --- Creación de estrellas fugaces ---
  const shootingStarsContainer = document.querySelector('.shooting-stars');
  let lastStarTime = 0;
  const starCreationInterval = 1000; // Intentar crear una estrella cada segundo

  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = `${Math.random() * 60}%`;
    star.style.left = '-10%';
    star.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
    shootingStarsContainer.appendChild(star);

    setTimeout(() => star.remove(), 4000);
  }

  function shootingStarLoop(currentTime) {
    if (currentTime - lastStarTime > starCreationInterval) {
      if (Math.random() > 0.5) createShootingStar();
      lastStarTime = currentTime;
    }
    requestAnimationFrame(shootingStarLoop);
  }
  requestAnimationFrame(shootingStarLoop);

  // --- Lógica para el mensaje al hacer scroll ---
  const scrollMessage = document.querySelector('.scroll-message');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si el elemento es visible en la pantalla
      if (entry.isIntersecting) {
        scrollMessage.classList.add('visible');
        // Opcional: dejar de observar una vez que la animación ha ocurrido
        observer.unobserve(scrollMessage);
      }
    });
  }, {
    threshold: 0.5 // La animación se dispara cuando el 50% del elemento es visible
  });

  observer.observe(scrollMessage);
});