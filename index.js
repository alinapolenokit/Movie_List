// Список фильмов в Local Storage
const STORAGE_SPISOK_FILMS = 'movies';
// Статус просмотра фильма. Просмотрен - done , нет - unchecked
const STATUS = {
    viewed: 'done',
    not_viewed: 'unchecked',
};

// ЭЛЕМЕНТЫ
// Поле ввода
const movieInputNode = document.querySelector('.js_form__input');
// Кнопка добавления фильмов из поля ввода
const buttonNode = document.querySelector('.js_movie__add');
//HTML-элемент, в который выводится список фильмов
const listFilmsNode = document.querySelector('.js_list__films');
// Содержимое LocalStorage
const filmsFormLocalStorage = localStorage.getItem(STORAGE_SPISOK_FILMS);
// Преобразование строки в формат JSON для работы с данными
const filmsFormStorage = JSON.parse(filmsFormLocalStorage);
// Поле ввода, в котором выводятся ошибки 
const errorOutputNode = document.querySelector('.js_error__output');

// Массив объектов 
let movies = [];

// Проверяем, есть ли в памяти фильмы
if(Array.isArray(filmsFormStorage)) {
	movies = filmsFormStorage;
}
// 
const init = () => orderFilmsList(movies);

const addMovie = () => {
	if (!checkInput()) { 
        return
    }
    addNewFilmsList();
    saveFilmsToLocal(movies);
	orderFilmsList(movies);
	clearFilmsInput();
	switchFocusToFilmsInput();
};
// Проверка значения поля ввода 
const checkInput = () => {
	if(!movieInputNode.value.trim()) {
		renderError("Неверно заполнено поле");
		return false
	}
	return true;
};
// Добавление нового фильма в начало списка
const addNewFilmsList = () => {
	const newFilms = getFilmsFromUser();
    movies.unshift(newFilms);
};
// Сохранение массива в Local Storage
function saveFilmsToLocal(movies) {
	const moviesString = JSON.stringify(movies);
	localStorage.setItem(STORAGE_SPISOK_FILMS, moviesString);
};
// Получение фильма из поля ввода, сразу возвращается объект фильма
const getFilmsFromUser = () => { 
    return new Movie(movieInputNode.value, getCurrentDate(), STATUS.not_viewed);
};
// Отображение списка фильмов
const orderFilmsList = (list_films) => {
	let movieMarkup = '';
	
	
};

// Удаление фильма
const deleteFilms = (movie_index) => {
	movies.splice(movie_index,1);
	saveFilmsToLocal(movies);
	orderFilmsList(movies);
};

//Функция обновления статуса фильма и рендера
const changeMovieViewStatus = (movie_index) => {
	(movies[movie_index].status === STATUS.viewed) ? 
		movies[movie_index].status = STATUS.not_viewed : 
		movies[movie_index].status = STATUS.viewed
	saveFilmsToLocal(movies);
	orderFilmsList(movies);
}

// загружаем в память браузера через LocalStorage
const clearFilmsInput = () => movieInputNode.value = '';
const switchFocusToFilmsInput = () => movieInputNode.focus();

// Рендер сообщения об ошибке
const renderError = (message_error) => {
	errorOutputNode.innerText =  `${message_error}`;
	errorOutputNode.classList.toggle('visible');
	clearFilmsInput();
	switchFocusToFilmsInput();
} 

init()
// ОТРАБОТЧИК 
buttonNode.addEventListener('click', addMovie);
movieInputNode.addEventListener('keypress', function (event) {
	(event.keyCode == 13) ? addMovie() : "";
});
listFilmsNode.addEventListener('click', function(e){
	(e.target.tagName === 'IMG') ? deleteMovie(e.target.dataset.movie) : "";
	(e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') ? changeMovieViewStatus(e.target.dataset.check) : ""
});
// 