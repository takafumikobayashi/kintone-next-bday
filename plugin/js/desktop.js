/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/desktop.js":
/*!***************************!*\
  !*** ./src/js/desktop.js ***!
  \***************************/
/***/ (() => {

eval("(function (PLUGIN_ID) {\n  kintone.events.on(['app.record.index.show'], function(event) {\n    let headerSpace = kintone.app.getHeaderMenuSpaceElement(); // ヘッダースペースを取得\n\n    // 既に追加されたボタンがあるかチェック\n    let existingButton = document.getElementById('myCustomButton');\n    if (existingButton) {\n        return event; // 既にボタンがある場合は何もしない\n    }\n\n    // 新しいボタンを作成\n    let button = document.createElement('button');\n    button.id = 'myCustomButton';\n    button.innerText = '誕生日更新';\n    button.className = 'kintoneplugin-button-normal'; // Kintoneのデフォルトボタンスタイル\n    button.style.marginRight = '10px'; // 他のボタンとの間隔を適宜調整\n\n    // ボタンのクリックイベントを設定\n    button.onclick = function() {\n        swal({\n            title: '次回誕生日を更新しますか？',\n            text: \"次回誕生日が過去になっているレコードを一括で更新します。\",\n            icon: 'info',\n            buttons: {\n                cancel: \"いいえ\",\n                catch: {\n                    text: \"はい\",\n                    value: \"execute\",\n                }\n            },\n        })\n        .then((value) => {\n            switch (value) {\n                case \"execute\":\n                    handleUpdateBirthday();\n                    break;\n                default:\n                    console.log('誕生日更新処理がキャンセルされました。');\n            }\n        });\n    };\n\n    // ヘッダースペースにボタンを追加\n    headerSpace.appendChild(button);\n    return event;\n});\n\nfunction handleUpdateBirthday() {\n    const appId = kintone.app.getId();\n    const dateFieldCode = '次回誕生日'; // 日付フィールドのフィールドコード\n    const arlrtFieldCode = '子ども氏名'; // 更新対象者のフィールドコード\n    const today = new Date();\n    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();\n\n    // 過去の日付のみを取得するクエリ\n    const query = dateFieldCode + \" < \\\"\" + todayString + \"\\\" and \" + dateFieldCode + \" != \\\"\\\" order by \" + dateFieldCode + \" asc limit 500\";\n    const params = {\n        app: appId,\n        query: query\n    };\n\n    // レコードを取得\n    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params, function(resp) {\n        let records = resp.records;\n\n        // レコードが0件の場合の処理\n        if (records.length === 0) {\n            swal({\n                title: '更新対象者はいませんでした',\n                text: '次回誕生日が過去の日付のレコードはありませんでした。',\n                icon: 'info',\n                button: 'OK'\n            });\n            return; // ここで処理を終了\n        }\n\n        // レコードごとに日付を更新\n        records.forEach(function(record) {\n            let recordDate = new Date(record[dateFieldCode].value);\n            recordDate.setFullYear(recordDate.getFullYear() + 1);\n\n            let updateParams = {\n                app: appId,\n                id: record['$id'].value,\n                record: {}\n            };\n            updateParams.record[dateFieldCode] = {\n                value: recordDate.toISOString().split('T')[0] // 年月日のみを更新\n            };\n\n            // レコードの更新\n            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', updateParams, function(updateResp) {\n                console.log('Record updated: ', updateResp);\n                swal({\n                    title: '更新しました。',\n                    text: record[arlrtFieldCode].value + 'さんの誕生日を更新しました。',\n                    icon: 'success',\n                    button: 'OK'\n                });\n\n            }, function(updateError) {\n                console.error('Update error: ', updateError);\n                swal({\n                    title: 'エラーが発生しました。',\n                    text: record[arlrtFieldCode].value + 'さんの誕生日更新に失敗しました。',\n                    icon: 'error',\n                    button: 'OK'\n                });\n            });\n        });\n    }, function(error) {\n        console.error('Error retrieving records: ', error);\n        swal({\n            title: 'エラーが発生しました。',\n            text: 'レコードの取得に失敗しました。',\n            icon: 'error',\n            button: 'OK'\n        });\n    });\n  }\n})(kintone.$PLUGIN_ID);\n\n\n//# sourceURL=webpack://kintone-next-bday/./src/js/desktop.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/desktop.js"]();
/******/ 	
/******/ })()
;