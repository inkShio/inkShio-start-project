# inkShio-start-project
## Установка
* установите [NodeJS](https://nodejs.org/en/)
* установите глобально [Gulp](https://gulpjs.com/): `npm install --global gulp-cli`
* скачайте сборку с помощью [Git](https://git-scm.com/downloads): `git clone https://github.com/inkShio/inkShio-start-project.git`
* перейдите в скачанную папку со сборкой: `cd inkShio-start-project`
* скачайте необходимые зависимости: `npm i`
## Команды
`npm run dev` — запускает сборку для разработки

`npm run prod` — запускает сборку для продакшена

`npm run html` — собрать html файлы

`npm run html:prod` — собрать html файлы в режиме продакшена

`npm run css` — собрать css файл

`npm run css:prod` — собрать css файл в режиме продакшена

`npm run js` — собрать js файл

`npm run js:prod` — собрать js файл в режиме продакшена

`npm run images:template` — собрать изображение шаблона

`npm run images:content` — собрать изображения контента

`npm run icon` — собрать спрайт иконок

`npm run favicon` — сгенерировать фавикон

Сборка может не запуститься из за ошибки `Cannot find module 'webp-converter/cwebp'`, для устранения данной ошибки запустите команду `npm install webp-converter@2.2.3 --save-dev`.

## Как работает
### JSON
Для удобства работы с данными в pug импользуем json.

Допустим есть news.json
```
[
  {
    "title": "Заголовок 1",
    "date": "01.01.2022",
    "url": "news-full.html"
  },
  {
    "title": "Заголовок 2",
    "date": "02.02.2022",
    "url": "news-full.html"
  }
]
```
и employees.json
```
[
  {
    "name": "Иванов Иван Иванович",
    "email": "mymail@mail.ru",
    "avatar": "content/employees/avatar.jpg",
    "url": "person.html"
  },
  {
    "name": "Петров Петр Петрович",
    "email": "mymail@mail.ru",
    "avatar": "content/employees/avatar.jpg",
    "url": "person.html"
  }
]
```
В pug выводим следующим образом
```
each item in news
  .news
    .news__title= item.title
    .news__date= item.date
    a.news__link(href= item.url) Подробнее

each item in employees
  .employee
    img.employee__avatar(src= item.avatar, alt= item.name)
    .employee__name= item.name
    .employee__email= item.email
    a.employee__link(href= item.url) Профиль
```
**Наблюдение:** Как-то столкнулся с ошибкой был файл `office.json` и выводилось это `each item in office`, вроде все ок, но выдовало ошибку, как оказалось переменная не должна начинаться ни с одного из ключевых слов, в данном случае `of`. Обсуждение есть [тут](https://github.com/pugjs/pug/issues/3263).

### PUG
Используется [emitty](https://github.com/mrmlnc/emitty) для поиска зависимостей между файлами и создания инструментов для инкрементной компиляции. Это когда проект собирается полностью лишь один раз, а затем происходит сборка лишь тех файлов, что были изменены с момента последней сборки проекта. Используйте include и extends.

Что происходит при сборке:
- Форматирование HTML-кода, придания ему удобочитаемого и красивого вида с соответствующими отступами. (`prod`)
- Сортировка атрибутов (`prod`)
- Добавление версии (`?=v`) для `style.min.css` и `scripts.min.js` (`prod`)

### SCSS
Для сброса стилей используется [inkReset](https://github.com/inkShio/inkReset.scss).

Подключена [bootstrap сетка](https://getbootstrap.com/docs/5.3/layout/grid/).

Для медиазапросов используется библиотека [sass-mediaqueries](https://github.com/rafalbromirski/sass-mediaqueries).

Что происходит при сборке:
- Создание карт источников (`dev`)
- (webpcss) (`dev`, `prod`)
- Добавление вендорных префиксов (`prod`)
- Группировка media-запросов (`prod`)
- Минимизация файла (`prod`)

### JS
Подключена библиотека [jquery](https://github.com/jquery/jquery).

Подключен полифил [object-fit-images](https://github.com/fregante/object-fit-images).

Что происходит при сборке:
- Создание карт источников (`dev`)
- Минимизация файла (`prod`)

### ИЗОБРАЖЕНИЯ
Что происходит при сборке:
- Сжатие изображений (`prod`)
- Конвертация в webp (`dev`, `prod`)

### SVG


### FONTS
Копируем шрифт с разрешением `.otf` или `.ttf` в папку `src/static/fonts/`, файлы сконвертируются в `.woff` и `.woff2` (Допустим Roboto-Thin.otf или Roboto-Thin.ttf).

Название шрифта должно иметь понятный суффик. (Roboto **-Thin**.otf, Roboto **-Light**.otf и т.д.).

Список допустимых суфиксов:
* `thin` - 100;
* `extralight` - 200;
* `light` - 300;
* `regular` - 400;
* `medium` - 500;
* `semibold` - 600;
* `bold` - 700;
* `extrabold`, `heavy` - 800;
* `black` - 900;

Подключение шрифта произойдет автоматически. Файл который будет импортироваться в css находится тут `tmp/fonts-generated.scss`.

Пример использование в css
```
h1 { 
  font-family: 'Roboto';
  font-weight: 100;
}

h2 {
  font-family: 'Roboto';
  font-weight: 300;
}
```

### FAVICONS
Фавикон генерируется с помощью сервиса [realfavicongenerator](https://realfavicongenerator.net/). Выведен в отдельный таск, т.к. генерация может быть долгой. Сгенерируй фавиконку с помощью сервиса, зайти на вкладку `gulp` скопировать функцию `realFavicon.generateFavicon` и заменить ее в файле `tasks/favicons.js`. В функции указать `masterPicture: config.paths.favicons.app` и `dest: config.paths.favicons.build`.

## Структура
```
inkShio-start-project
├── .vscode                 # конфигурация для vs code
│   ├── extensions.json     # расширения
│   └── settings.json       # настройки
├── gulp
│   ├── tasks               # задачи gulp
│   └── config.js           # конфигурация gulp
├── src                     # рабочая папка
│   ├── blocks
│   |   ├── components      # компоненты
│   |   └── modules         # модули
│   ├── js
│   |   ├── helpers         # вспомогательные скрипты
│   |   ├── libs            # библиотеки
│   |   ├── scripts         # скрипты
│   |   └── main.js         # главный скрипт
│   ├── json                # json данные
│   ├── pug 
│   |   ├── helpers         # вспомогательные элементы
│   |   ├── layouts         # макеты
│   |   └── pages           # страницы
│   ├── scss
│   |   ├── base            # основные стили
│   |   ├── helpers         # вспомогательные стили
│   |   ├── libs            # стили библиотек
│   |   ├── utilities       # утилиты
│   |   └── style.scss      # файл где собираем все стили
│   └── static
│   |   ├── content         # изображения контента (новости, статьи и т. д.)
│   |   ├── favicons        # favicons
│   |   ├── fonts           # шрифты
│   |   ├── images          # изображения макета
│   |   └── svg             # векторные иконки
├── build                   # папка с результатом
├── tmp                     # папка для временных файлов
├── .babelrc                # настройки babel
├── .editorconfig           # настройки для IDE
├── .eslintrc               # настройки eslint
├── .gitignore              # запрет на отслеживание файлов git'ом
├── .ncurc.json             # запрет на обновление пакетов
├── .pug-lintrc             # настройки puglint
├── .stylelintrc            # настройки stylelint
├── gulpfile.babel.js       # настройки gulp
├── package.json            # список зависимостей
└── README.md               # документация сборки
```
