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

class Movie {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
}

const addMovie = () => {
	if (!checkInput()) { 
        return
    }
    addNewFilmsList();
    saveFilmsToLocal(movies);
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
    return new Movie(movieInputNode.value, STATUS.not_viewed);
};

// Удаление фильма
const deleteFilm = (film_index) => {
	movies.splice(film_index,1);
	saveFilmsToLocal(movies);
	
};

//Функция обновления статуса фильма и рендера
const changeMovieViewStatus = (film_index) => {
    const film = movies[film_index];
    film.status = (film.status === STATUS.viewed) ? STATUS.not_viewed : STATUS.viewed;
    saveFilmsToLocal(movies);
};

// загружаем в память браузера через LocalStorage
const clearFilmsInput = () => movieInputNode.value = '';
const switchFocusToFilmsInput = () => movieInputNode.focus();

// Рендер сообщения об ошибке
const renderError = (error_message) => {
    errorOutputNode.innerText = error_message;
    errorOutputNode.classList.toggle('visible');
    clearFilmsInput();
    switchFocusToFilmsInput();
};

// ОТРАБОТЧИК 
buttonNode.addEventListener('click', addMovie);
movieInputNode.addEventListener('keypress', function (event) {
	if (event.keyCode == 13)
	 addMovie();
});
listFilmsNode.addEventListener('click', function(e){
	if 	(e.target.tagName === 'IMG') {
		deleteMovie(e.target.dataset.movie);
	} else if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
		changeMovieViewStatus(e.target.dataset.check);
	}
});
