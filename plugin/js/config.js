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

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/***/ (() => {

eval("(function (PLUGIN_ID) {\n  const formEl = document.querySelector('.js-submit-settings');\n  const cancelButtonEl = document.querySelector('.js-cancel-button');\n  if (!(formEl && cancelButtonEl)) {\n    throw new Error('Required elements do not exist.');\n  }\n\n  let appId = kintone.app.getId();\n  let selectMenu = document.createElement('select');\n  selectMenu.id = 'field-selection';\n  selectMenu.className = 'field-selection';\n\n  let selectMenu_disp = document.createElement('select');\n  selectMenu_disp.id = 'field-selection-disp';\n  selectMenu_disp.className = 'field-selection-disp';\n  \n  const config = kintone.plugin.app.getConfig(PLUGIN_ID);\n  if (config.message) {\n    messageEl.value = config.message;\n  }\n\n  kintone.api('/k/v1/form', 'GET', {app: appId}, function(resp) {\n\n    for (let key in resp.properties) {\n      let field = resp.properties[key];\n\n      //field-selectionへの格納\n      if (field.type === 'DATE') {\n        let option = document.createElement('option'); // 新しい<option>エレメントを作成\n        option.value = field.code;  // <option>のvalueを設定\n        option.textContent = field.label;  // <option>のテキストを設定\n\n        if (field.code === config.targetDate) {\n          option.selected = true;  // <option>を選択済みにする\n        }\n        selectMenu.appendChild(option);  // <select>メニューに<option>を追加\n      }\n\n      //field-selection_dispへの格納\n      if (field.type === 'SINGLE_LINE_TEXT') {\n        let option = document.createElement('option'); // 新しい<option>エレメントを作成\n        option.value = field.code;  // <option>のvalueを設定\n        option.textContent = field.label;  // <option>のテキストを設定\n\n        if (field.code === config.targetDate_disp) {\n          option.selected = true;  // <option>を選択済みにする\n        }\n        selectMenu_disp.appendChild(option);  // <select>メニューに<option>を追加\n      }\n    }\n\n    // <select>メニューをconfig画面の適切な場所に追加\n    formEl.querySelector('.field-selection-area').appendChild(selectMenu);\n    formEl.querySelector('.field-selection-area-2').appendChild(selectMenu_disp);\n\n  }, function(error) {\n      console.error('フォーム情報の取得に失敗しました。:', error);\n  });\n\n  formEl.addEventListener('submit', (e) => {\n    e.preventDefault();\n    let selectedValue = formEl.querySelector('.field-selection').value;\n    let selectedValue_disp = formEl.querySelector('.field-selection-disp').value; \n    kintone.plugin.app.setConfig({ targetDate: selectedValue, targetDate_disp: selectedValue_disp }, () => {      \n      swal({\n        title: '更新しました。',\n        text: '変更した設定を反映するには、「アプリの設定」画面に戻り 「アプリの更新」ボタンをクリックします。',\n        icon: 'success',\n        button: 'OK'\n      }).then(() => {\n        // ダイアログクローズ後の処理\n        console.log('targetDate:', selectedValue);\n        console.log('targetDate_disp:', selectedValue_disp);\n        window.location.href = '../../flow?app=' + kintone.app.getId();\n      });\n    });\n  });\n\n  cancelButtonEl.addEventListener('click', () => {\n    window.location.href = '../../' + kintone.app.getId() + '/plugin/';\n  });\n})(kintone.$PLUGIN_ID);\n\n\n//# sourceURL=webpack://kintone-next-bday/./src/js/config.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/config.js"]();
/******/ 	
/******/ })()
;