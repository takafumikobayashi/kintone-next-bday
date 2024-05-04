(function (PLUGIN_ID) {
    kintone.events.on(['app.record.index.show'], function(event) {
    let headerSpace = kintone.app.getHeaderMenuSpaceElement(); // ヘッダースペースを取得

    // 既に追加されたボタンがあるかチェック
    let existingButton = document.getElementById('myCustomButton');
    if (existingButton) {
        return event; // 既にボタンがある場合は何もしない
    }

    // 新しいボタンを作成
    let button = document.createElement('button');
    button.id = 'myCustomButton';
    button.innerText = '日付一括更新';
    button.className = 'kintoneplugin-button-normal'; // Kintoneのデフォルトボタンスタイル
    button.style.marginRight = '10px'; // 他のボタンとの間隔を適宜調整

    // configで設定したフィールドコードを取得
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    const dateFieldCode = config.targetDate; // 日付フィールドのフィールドコード
    const alertFieldCode = config.targetDate_disp; // 更新対象者のフィールドコード

    // ボタンのクリックイベントを設定
    button.onclick = function() {
        swal({
            title: '次回誕生日を更新しますか？',
            text: "次回誕生日が過去になっているレコードを一括で更新します。",
            icon: 'info',
            buttons: {
                cancel: "いいえ",
                catch: {
                    text: "はい",
                    value: "execute",
                }
            },
        })
        .then((value) => {
            switch (value) {
                case "execute":
                    handleUpdateBirthday(dateFieldCode, alertFieldCode);
                    break;
                default:
                    console.log('誕生日更新処理がキャンセルされました。');
            }
        });
    };

    // ヘッダースペースにボタンを追加
    headerSpace.appendChild(button);
    return event;
});

function handleUpdateBirthday(targetDateFieldCode, targetDateFieldCode_disp) {
    const appId = kintone.app.getId();
    const today = new Date();
    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // 過去の日付のみを取得するクエリ
    const query = targetDateFieldCode + " < \"" + todayString + "\" and " + targetDateFieldCode + " != \"\" order by " + targetDateFieldCode + " asc limit 500";
    const params = {
        app: appId,
        query: query
    };

    // レコードを取得
    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params, function(resp) {
        let records = resp.records;

        // レコードが0件の場合の処理
        if (records.length === 0) {
            swal({
                title: '更新対象レコードはありませんでした',
                text: 'が過去の日付のレコードはありませんでした。',
                icon: 'info',
                button: 'OK'
            });
            return; // ここで処理を終了
        }

        // レコードごとに日付を更新
        records.forEach(function(record) {
            let recordDate = new Date(record[targetDateFieldCode].value);
            recordDate.setFullYear(recordDate.getFullYear() + 1);

            let updateParams = {
                app: appId,
                id: record['$id'].value,
                record: {}
            };
            updateParams.record[targetDateFieldCode] = {
                value: recordDate.toISOString().split('T')[0] // 年月日のみを更新
            };

            // レコードの更新
            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', updateParams, function(updateResp) {
                console.log('Record updated: ', updateResp);
                swal({
                    title: '更新しました。',
                    text: record[targetDateFieldCode_disp].value + 'の日付を更新しました。',
                    icon: 'success',
                    button: 'OK'
                });

            }, function(updateError) {
                console.error('Update error: ', updateError);
                swal({
                    title: 'エラーが発生しました。',
                    text: record[targetDateFieldCode_disp].value + 'の日付更新に失敗しました。',
                    icon: 'error',
                    button: 'OK'
                });
            });
        });
    }, function(error) {
        console.error('Error retrieving records: ', error);
        swal({
            title: 'エラーが発生しました。',
            text: 'レコードの取得に失敗しました。',
            icon: 'error',
            button: 'OK'
        });
    });
}

})(kintone.$PLUGIN_ID);
