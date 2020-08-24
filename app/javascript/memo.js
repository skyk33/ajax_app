function memo () {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    //formDataで取得したメモに投稿したデータを送信
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // 変数itemに受信データを入れる
      const item = XHR.response.post;
      // HTMLを描画する際に使用する親要素であるlistを取得
      const list = document.getElementById("list");
      // 処理が終了したら入力フォームをリセットする必要がある。そのリセットに使うため要素を取得
      const formText = document.getElementById("content");
      // メモとして更新・描画されるHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // inserAdjacentHTMLでlistという親要素にHTMLを追加
      list.insertAdjacentHTML("afterend", HTML)
      // フォームを空にする
      formText.value="";
    };
    e.preventDefault();
  });
};
window.addEventListener("load", memo)
