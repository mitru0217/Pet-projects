// 1. Выбираем контейнер
const gameContainer = document.querySelector('.game-container');
// 2. Создаем массив с эмодзи
const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥝', '🥑'];
// 3. Дублируем массив для пар
let cards = [...emojis, ...emojis];
// 4. Перемешиваем эмодзи
cards.sort(() => Math.random() - 0.5);
// 5. Создаем переменные для первой и второй карты
let firstCard = null;
let secondCard = null;
// 6. Создаем переменную для блокировки доски
let lockBoard = false;
// 1.1 Создаём таймер
// 1.1.0 Создаём HTML элемент для таймера
//  <p>⏳ Время: <span id="timer">0</span> сек | 🔄 Ходы: <span id="moves">0</span></p>
// 1.1.1 Выбираем элементы для таймера и количества ходов
const timerElement = document.getElementById('timer');
const movesElement = document.getElementById('moves');
// 1.1.2 Создаём переменные для таймера
let timer = 0;
// 1.1.3 Создаём переменную  для отслеживания количества ходов, которые игрок делает во время игры
let moves = 0;
// 1.1.4 Создаём переменную для интервала
let interval;
// 1.1.5 Создаём функцию для запуска таймера
function startTimer() {
	interval = setInterval(() => {
		timer++;
		timerElement.textContent = timer;
	}, 1000);
}
// 7. Создаем функцию для создания карты
function createCard(emoji) {
	// 8. Создаем элемент div
	const card = document.createElement('div');
	// 9. Добавляем класс card
	card.classList.add('card');
	// 10. Добавляем атрибут data-emoji
	card.dataset.emoji = emoji;
	// 11. Добавляем текст внутри карты
	card.innerHTML = '?';
	// 12. Добавляем обработчик события клика
	card.addEventListener('click', () => {
		// 13. Если доска заблокирована или карта равна первой карте, то выходим из функции
		if (lockBoard || card === firstCard) return;
		// 14. Добавляем текст внутри карты
		card.innerHTML = emoji;
		// 15. Добавляем класс flipped к карте
		card.classList.add('flipped');
		// 16. Если firstCard равен null, то firstCard становится текущей картой
		if (!firstCard) {
			firstCard = card;
		} else {
			// 17. Если secondCard равен null, то secondCard становится текущей картой
			secondCard = card;
			// 18. Блокируем доску
			lockBoard = true;
			// 19. Если карты совпадают, то удаляем обработчики событий
			if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
				firstCard = null;
				secondCard = null;
				lockBoard = false;
			} else {
				// 20. Если карты не совпадают, то через 1 секунду убираем текст и класс flipped у карт
				setTimeout(() => {
					firstCard.innerHTML = '?';
					secondCard.innerHTML = '?';
					firstCard.classList.remove('flipped');
					secondCard.classList.remove('flipped');
					firstCard = null;
					secondCard = null;
					lockBoard = false;
				}, 1000);
			}
		}
	});
	return card;
}
// 21. Перебираем массив с картами и добавляем их в контейнер
cards.forEach((emoji) => {
	gameContainer.append(createCard(emoji));
});
