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

        if (field.code === config.qrcode) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu.appendChild(option);  // <select>メニューに<option>を追加
      }
    }
    
    // <select>メニューをconfig画面の適切な場所に追加
    formEl.querySelector('.field-selection-area').appendChild(selectMenu);

  }, function(error) {
      console.error('フォーム情報の取得に失敗しました。:', error);
  });

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedValue = formEl.querySelector('.field-selection').value;
    kintone.plugin.app.setConfig({ targetDate: selectedValue }, () => {      
      swal({
        title: '更新しました。',
        text: '変更した設定を反映するには、「アプリの設定」画面に戻り 「アプリの更新」ボタンをクリックします。',
        icon: 'success',
        button: 'OK'
      }).then(() => {
        // ダイアログクローズ後の処理
        console.log('targetDate:', selectedValue);
        window.location.href = '../../flow?app=' + kintone.app.getId();
      });
    });
  });

  cancelButtonEl.addEventListener('click', () => {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(kintone.$PLUGIN_ID);
