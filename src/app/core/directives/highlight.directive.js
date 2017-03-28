(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('hljs', hljsDirective);

    /** @ngInject */
    function hljsDirective($timeout, $q, $interpolate)
    {
        return {
            restrict: 'EA',
            compile : function (tElement, tAttrs)
            {
                var code;
                //No attribute? code is the content
                if ( !tAttrs.code )
                {
                    code = tElement.html();
                    tElement.empty();
                }

                return function (scope, iElement, iAttrs)
                {
                    if ( iAttrs.code )
                    {
                        // Attribute? code is the evaluation
                        code = scope.$eval(iAttrs.code);
                    }
                    var shouldInterpolate = scope.$eval(iAttrs.shouldInterpolate);

                    $q.when(code).then(function (code)
                    {
                        if ( code )
                        {
                            if ( shouldInterpolate )
                            {
                                code = $interpolate(code)(scope);
                            }

                            var contentParent = angular.element(
                                '<pre><code class="highlight" ng-non-bindable></code></pre>'
                            );

                            iElement.append(contentParent);

                            // Defer highlighting 1-frame to prevent GA interference...
                            $timeout(function ()
                            {
                                render(code, contentParent);
                            }, 34, false);
                        }
                    });

                    function render(contents, parent)
                    {
                        var codeElement = parent.find('code');
                        var lines = contents.split('\n');

                        // Remove empty lines
                        lines = lines.filter(function (line)
                        {
                            return line.trim().length;
                        });

                        // Make it so each line starts at 0 whitespace
                        var firstLineWhitespace = lines[0].match(/^\s*/)[0];
                        var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);

                        lines = lines.map(function (line)
                        {
                            return line
                                .replace(startingWhitespaceRegex, '')
                                .replace(/\s+$/, '');
                        });

                        var highlightedCode = hljs.highlight(iAttrs.language || iAttrs.lang, lines.join('\n'), true);
                        highlightedCode.value = highlightedCode.value
                            .replace(/=<span class="hljs-value">""<\/span>/gi, '')
                            .replace('<head>', '')
                            .replace('<head/>', '');
                        codeElement.append(highlightedCode.value).addClass('highlight');
                    }
                };
            }
        };
    }
})();