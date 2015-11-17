/**
 * bemjson-to-html
 * ===============
 *
 * Собирает *html*-файл с помощью *bemjson* и *bh.php*.
 *
 * **Опции**
 *
 * * *String* **bhFile** — Исходный BH-файл. По умолчанию — `?.bh.js`.
 * * *String* **bemjsonFile** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 * * *String* **target** — Результирующий HTML-файл. По умолчанию — `?.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-bh-php/techs/bemjson-to-html'));
 * ```
 */
var util = require('../lib/util'),
    requireOrEval = require('enb/lib/fs/require-or-eval'),
    dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('bemjson-to-html')
    .target('target', '?.html')
    .useSourceFilename('bhFile', '?.bh.php')
    .useSourceFilename('bemjsonFile', '?.bemjson.js')
    .optionAlias('bhFile', 'bhTarget')
    .optionAlias('bemjsonFile', 'bemjsonTarget')
    .optionAlias('target', 'destTarget')
    .builder(function(bhPhpFilename, bemjsonFilename) {
        dropRequireCache(require, bemjsonFilename);

        return requireOrEval(bemjsonFilename)
            .then(function() {

                var code = [
                    '$res = "";',

                    // dumping thing for debuggin' purpose
                    'function d () { return call_user_func_array(\'\\BEM\\d\', func_get_args()); }',

                    // this is a splitter between stdout (render results) and stderr (debugging purposes)
                    'register_shutdown_function(function() use (&$res) {',
                    '    $output = ob_get_clean();',
                    '    $stderr = fopen(\'php://stderr\', \'w\');',
                    '    fwrite($stderr, $output);',
                    '    fclose($stderr);',
                    '    echo $res;',
                    '});',

                    'require \'' + bhPhpFilename + '\';',

                    'ob_start();', // catch output (to print as well as console.log does)
                    '$res = $bh->apply(file_get_contents(\'' + bemjsonFilename + '\'));'
                ];

                return util.runPhpCode(code);

        });
    })
    .createTech();
