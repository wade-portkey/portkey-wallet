var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=getTemplate;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));function getTemplate(params,enterprise,recaptchaDomain,gstaticDomain,hideBadge){var grecaptcha=enterprise?'window.grecaptcha.enterprise':'window.grecaptcha';var validHost=recaptchaDomain||'www.google.com';var gstaticHost=gstaticDomain||'www.gstatic.com';var jsScript=enterprise?"<script src=\"https://"+validHost+"/recaptcha/enterprise.js?hl={{lang}}\" async defer></script>":"<script src=\"https://"+validHost+"/recaptcha/api.js?hl={{lang}}\" async defer></script>";var template="\n    <!DOCTYPE html>\n    <html lang=\"{{lang}}\">\n    \n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title></title>\n\n        <link rel=\"preconnect\" href=\"https://"+validHost+"\">\n        <link rel=\"preconnect\" href=\"https://"+gstaticHost+"\" crossorigin>\n\n        "+jsScript+"\n\n        <script>\n            const siteKey = '{{siteKey}}';\n            const theme = '{{theme}}';\n            const size = '{{size}}';\n            const action = '{{action}}';\n    \n            let readyInterval;\n            let onCloseInterval;\n            let widget;\n            let onCloseObserver;\n            \n            let isOnCloseTriggeredInSeconds = false;\n    \n            const onClose = () => {\n                isOnCloseTriggeredInSeconds = true;\n                setTimeout(() => {\n                  isOnCloseTriggeredInSeconds = false;\n                }, 50);\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    close: [],\n                }));\n            }\n            \n            const onClickOutSide = () => {\n                if(isOnCloseTriggeredInSeconds) return;\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    closeWebView: [],\n                }));\n            }\n    \n            const onLoad = () => {\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    load: [],\n                }));\n            }\n    \n            const onExpire = () => {\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    expire: [],\n                }));\n            }\n    \n            const onError = (error) => {\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    error: [error],\n                }));\n            }\n    \n            const onVerify = (token) => {\n                window.ReactNativeWebView.postMessage(JSON.stringify({\n                    verify: [token],\n                }));\n            }\n    \n            const isReady = () => Boolean(typeof window === 'object' && window.grecaptcha && "+grecaptcha+".render);\n    \n            const registerOnCloseListener = () => {\n                if (onCloseObserver) {\n                    onCloseObserver.disconnect();\n                }\n    \n                const iframes = document.getElementsByTagName('iframe');\n    \n                const recaptchaFrame = Array.prototype.find\n                    .call(iframes, e => e.src.includes('google.com/recaptcha/api2/bframe'));\n                const recaptchaElement = recaptchaFrame.parentNode.parentNode;\n    \n                clearInterval(onCloseInterval);\n    \n                let lastOpacity = recaptchaElement.style.opacity;\n                onCloseObserver = new MutationObserver(mutations => {\n                    if (lastOpacity !== recaptchaElement.style.opacity\n                        && recaptchaElement.style.opacity == 0) {\n                        onClose();\n                    }\n                    lastOpacity = recaptchaElement.style.opacity;\n                });\n                onCloseObserver.observe(recaptchaElement, {\n                    attributes: true,\n                    attributeFilter: ['style'],\n                });\n            }\n    \n            const isRendered = () => {\n                return typeof widget === 'number';\n            }\n    \n            const renderRecaptcha = () => {\n                const recaptchaParams = {\n                    sitekey: siteKey,\n                    size,\n                    theme,\n                    callback: onVerify,\n                    'expired-callback': onExpire,\n                    'error-callback': onError,\n                }\n                if (action) {\n                    recaptchaParams.action = action;\n                }\n                widget = "+grecaptcha+".render('recaptcha-container', recaptchaParams);\n                if (onLoad) {\n                    onLoad();\n                }\n                onCloseInterval = setInterval(registerOnCloseListener, 1000);\n            }\n    \n            const updateReadyState = () => {\n                if (isReady()) {\n                    clearInterval(readyInterval);\n                    renderRecaptcha()\n                }\n            }\n    \n            if (isReady()) {\n                renderRecaptcha();\n            } else {\n                readyInterval = setInterval(updateReadyState, 1000);\n            }\n    \n            window.rnRecaptcha = {\n                execute: () => {\n                    "+grecaptcha+".execute(widget);\n                },\n                reset: () => {\n                    "+grecaptcha+".reset(widget);\n                },\n            }\n        </script>\n    \n        <style>\n            html,\n            body,\n            .container {\n                height: 100%;\n                width: 100%;\n                margin: 0;\n                padding: 0;\n                background-color: transparent;\n            }\n    \n            .container {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n\n            body > div:last-child > div:first-child {\n              background-color: transparent !important;\n            }\n\n            body > div:last-child > div:last-child {\n              top:auto !important;\n            }\n            \n            "+(hideBadge?'.grecaptcha-badge { visibility: hidden; }':'')+"\n        </style>\n    </head>\n    \n    <body onClick=\"onClickOutSide()\">\n        <div class=\"container\">\n            <span id=\"recaptcha-container\"></span>\n        </div>\n    </body>\n    \n    </html>";Object.entries(params).forEach(function(_ref){var _ref2=(0,_slicedToArray2.default)(_ref,2),key=_ref2[0],value=_ref2[1];template=template.replace(new RegExp("{{"+key+"}}",'img'),value);});return template;}