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
var fs = require('fs');

module.exports = require('enb/lib/build-flow').create()
    .name('bh.php')
    .target('target', '?.bh.php')
    .defineOption('phpBootstrap', 'vendor/bem/bh/index.php')
    .useFileList('bh.php')
    .builder(function(sourceFiles) {
        var node = this.node;
        var opts = this._options;

        var bhOpts = {};
        ['jsAttrName', 'jsAttrScheme', 'escapeContent'].forEach(function(opt) {
            if (opts.hasOwnProperty(opt)) bhOpts[opt] = opts[opt];
        });

        var bhChunk = [
            '<?php',
            opts.phpBootstrap !== false ?
                'require_once __DIR__ . "/' + (opts.phpBootstrap) + '";'
                : '',
            '$bh = new \\BEM\\BH();',
            '$bh->setOptions('  + util.innerPackData(bhOpts) + ');'
        ];

        return bhChunk.concat(
                sourceFiles.map(readFile),
                ['return $bh;\n']
            ).join('\n');

        function readFile(file) {
            if (opts.devMode) {
                return '\n$fn = include __DIR__ . "/' + node.relativePath(file.fullname) + '"; $fn($bh);';
            }

            return [
                '// file: ' + node.relativePath(file.fullname),
                stripPhp(fs.readFileSync(file.fullname)),
                ''
            ].join('\n');
        }
    })
    .createTech();

function stripPhp(php) {
    // <?php\nreturn function ($bh) {\n(...)\n};\n?>\n
    return String(php).replace(/^(<\?(php)?\n\s*)?(return\s+function\s*\(\s*\$bh\s*\)\s*{\s*\n)?|\s*(\n\s*}\s*;)?\s*(\n\s*\?>\s*)?$/ig, '');
}
