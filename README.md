# enb-bh-php

[![NPM version](http://img.shields.io/npm/v/enb-bh-php.svg?style=flat)](http://badge.fury.io/js/enb-bh-php) [![Build Status](http://img.shields.io/travis/zxqfox/enb-bh-php/master.svg?style=flat)](https://travis-ci.org/zxqfox/enb-bh-php) [![Dependency Status](http://img.shields.io/david/zxqfox/enb-bh-php.svg?style=flat)](https://david-dm.org/zxqfox/enb-bh-php)

Поддержка [`bh-php`](https://github.com/zxqfox/bh-php) для ENB.

## Установка

```sh
$ npm install --save-dev enb-bh-php
```

## Технологии

* [bh-php](#bh-php)
* [bh-php-test](#bh-php-test)
* [bemjson-to-html](#bemjson-to-html)

Для работы модуля требуется зависимость от пакета `enb` версии `0.12.0` или выше.

### bh-php

Склеивает *bh.php*-файлы по deps'ам с помощью набора `include` в виде `?.bh.php`. Содержит `require` php-пакета `bem/bh`. После сборки требуется наличие всех файлов.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bh.php`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `['bh.php']`.
* *String* **jsAttrName** — атрибут блока с параметрами инициализации. По умолчанию — `onclick`.
* *String* **jsAttrScheme** — Схема данных для параметров инициализации. По умолчанию — `js`. Форматы: `js` — Получаем `return { ... }`. `json` — JSON-формат. Получаем `{ ... }`.
* *String* **phpBootstrap** — Путь к библиотеке `bem/bh` относительно корня проекта. По умолчанию — `vendor/bem/bh/index.php`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bh-php').bhPhp);
```

### bh-php-test

Склеивает *bh.php*-файлы по deps'ам с помощью набора `include`, завернутого в js-код, в виде `?.bh-php.js`. Подключает через `require` php-пакет `bem/bh`. Предназначен для создания автотестов `enb-bem-tmpl-specs`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bh.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `['bh.js']`.
* *String* **jsAttrName** — атрибут блока с параметрами инициализации. По умолчанию — `onclick`.
* *String* **jsAttrScheme** — Схема данных для параметров инициализации. По умолчанию — `js`. Форматы: `js` — Получаем `return { ... }`. `json` — JSON-формат. Получаем `{ ... }`.
* *String* **phpBootstrap** — Путь к библиотеке `bem/bh` относительно корня проекта. По умолчанию — `vendor/bem/bh/index.php`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bh-php').bhPhpTest);
```

### bemjson-to-html

Собирает *html*-файл с помощью *bemjson* и *bh.php*.

**Опции**

* *String* **bhFile** — Исходный BH-файл. По умолчанию — `?.bh.js`.
* *String* **bemjsonFile** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* *String* **target** — Результирующий HTML-файл. По умолчанию — `?.html`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bh/techs/html-from-bemjson'));
```

## Лицензия

© 2014 Alexey Yaroshevich. Код лицензирован [The MIT License](LICENSE).
