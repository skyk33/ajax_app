function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", true);
    
    // メモをクリックした時の処理
    post.addEventListener("click", () => {
      //どのメモをクリックしたのかidを取得
      const postId = post.getAttribute("data-id");
      // Ajaxにつかうオブジェクト作成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化
      XHR.open("GET", `/posts/${postId}`, true)
      // 受け取りデータ形式の指定
      XHR.responseType = "json";
      // リクエスト送信
      XHR.send();

      // データ受信時の処理
      XHR.onload = () => {
        // ステータスコードでエラーコードの場合は処理をすぐに抜ける
        if (XHR.status != 200) {
          // エラー内容をアラートとして表示する
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        // 受信データをitem変数へ
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読だったらカスタムデータを追加
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          //　未読だった場合はカスタムデータを削除
          post.removeAttribute("data-check");
        }
      };
     });
  });
}
//window.addEventListener("load", check);
// 上記だとウィンドウがロードされないと実行されない
// 定期的にcheckを実行するようにする
setInterval(check, 1000);
