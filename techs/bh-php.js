/**
 * bh-php
 * ======
 *
 * Собирает *bh.php*-файлы по deps'ам инклудами, сохраняет в виде `?.bh.php`.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bh.php`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — 'bh.php'.
 * * *String* **phpBootstrap** — Путь к библиотеке `bem/bh` относительно корня проекта. По умолчанию — `vendor/bem/bh/index.php`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-bh-php'));
 */

var util = require('../lib/util');

module.exports = require('enb/lib/build-flow').create()
    .name('bh.php')
    .target('target', '?.bh.php')
    .useFileList('bh.php')
    .builder(function(sourceFiles) {
        var node = this.node;

        var bhChunk = [
            '<?php',
            'require_once __DIR__ . "/' + (this._options.phpBootstrap || 'vendor/bem/bh/index.php') + '";',
            '$bh = new \\BEM\\BH();',
            '$bh->setOptions('  + util.innerPackData(this._options) + ');'
        ].join('\n');

        return [bhChunk].concat(sourceFiles.map(function(file) {
            return '\n$fn = include __DIR__ . "/' + node.relativePath(file.fullname) + '"; $fn($bh);';
        })).join('\n');
    })
    .createTech();
