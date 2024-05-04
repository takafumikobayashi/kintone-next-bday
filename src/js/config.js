(function (PLUGIN_ID) {
  const formEl = document.querySelector('.js-submit-settings');
  const cancelButtonEl = document.querySelector('.js-cancel-button');
  if (!(formEl && cancelButtonEl)) {
    throw new Error('Required elements do not exist.');
  }

  let appId = kintone.app.getId();
  let selectMenu = document.createElement('select');
  selectMenu.id = 'field-selection';
  selectMenu.className = 'field-selection';

  let selectMenu_disp = document.createElement('select');
  selectMenu_disp.id = 'field-selection-disp';
  selectMenu_disp.className = 'field-selection-disp';
  
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (config.message) {
    messageEl.value = config.message;
  }

  kintone.api('/k/v1/form', 'GET', {app: appId}, function(resp) {

    for (let key in resp.properties) {
      let field = resp.properties[key];

      //field-selectionへの格納
      if (field.type === 'DATE') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.targetDate) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu.appendChild(option);  // <select>メニューに<option>を追加
      }

      //field-selection_dispへの格納
      if (field.type === 'SINGLE_LINE_TEXT') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.targetDate_disp) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu_disp.appendChild(option);  // <select>メニューに<option>を追加
      }
    }

    // <select>メニューをconfig画面の適切な場所に追加
    formEl.querySelector('.field-selection-area').appendChild(selectMenu);
    formEl.querySelector('.field-selection-area-2').appendChild(selectMenu_disp);

  }, function(error) {
      console.error('フォーム情報の取得に失敗しました。:', error);
  });

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedValue = formEl.querySelector('.field-selection').value;
    let selectedValue_disp = formEl.querySelector('.field-selection-disp').value; 
    kintone.plugin.app.setConfig({ targetDate: selectedValue, targetDate_disp: selectedValue_disp }, () => {      
      swal({
        title: '更新しました。',
        text: '変更した設定を反映するには、「アプリの設定」画面に戻り 「アプリの更新」ボタンをクリックします。',
        icon: 'success',
        button: 'OK'
      }).then(() => {
        // ダイアログクローズ後の処理
        console.log('targetDate:', selectedValue);
        console.log('targetDate_disp:', selectedValue_disp);
        window.location.href = '../../flow?app=' + kintone.app.getId();
      });
    });
  });

  cancelButtonEl.addEventListener('click', () => {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(kintone.$PLUGIN_ID);
