const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

 // Находим элемнты 
 const headerContainer = document.querySelector('#header');
 const listContainer = document.querySelector('#list');
 const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0;  // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

// Очещаем разметку HTML
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){

	// Вопрос

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	// Отображает вопрос на странице
	headerContainer.innerHTML = title;
	
	// Варианты ответов
	let answerNumber = 1;
	for ( answerText of questions[questionIndex]['answers']) {
		console.log(answerNumber, answerText)
		const questionTemplete =
			`<li>
				<label>
					<input value="%number%"type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;
		
		
		const answerHTML = questionTemplete
										.replace('%answer%', answerText)
										.replace('%number%', answerNumber)
		
		listContainer.innerHTML += answerHTML;
		answerNumber++;


		
	}
}
	
function checkAnswer(){
	console.log('checkAnswer started!');

	// Находим выбранную радиокнопку 
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// Если отвект не выбран ничего не делаем, выходим из функции
	if (!checkedRadio){
		submitBtn.blur();
		return
	} 

	// Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)

	// Если ответ верно - увеличиваем ответ
	if (userAnswer === questions [questionIndex]['correct']) {
		score++;
	}
		console.log('score = ', score);

		if(questionIndex !== questions.length -1){
			console.log('Это не последний вопрос');
			questionIndex++;
			clearPage();
			showQuestion();
			return;
		} else{
			console.log('Это последний вопрос');
			clearPage();
			showResults();
		}
}

function showResults(){
	console.log('showResults started!');
	console.log(score);
	const resultsTemplate =`
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>`;

		let title, message;	
		// Варианты ответов
		if (score === questions.length) {
			title = 'Поздровляем!🎉';
			message = 'Вы ответили верно на все вопросы 🤩';
		} else if ((score * 100) / questions.length >=50 ){
			title = 'Неплохой результат 😄';
			message = 'Вы дали более половины правельных ответов 👌';
		} else {
			title = 'Стоит постараться😐';
			message = 'Пока у вас меньше половины правельных ответов';

		}

		// Результат 
		let result = `${score} из ${questions.length}`;

		// Финальный ответ, подставляем данные в шаблон
		const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result)

		headerContainer.innerHTML = finalMessage;

		// Меняем кнопку "Играть снова"
		submitBtn.blur();
		submitBtn.innerText = 'Играть снова';
		submitBtn.onclick = () => history.go();
	}
	
