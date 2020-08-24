class PostsController < ApplicationController

  def index # indexアクションを定義
    #@post = Post.find(1) #Postsテーブルにあるid1のレコードを代入
    @posts = Post.all.order(id: "DESC") #Postsテーブルの全てのレコードを代入
  end

  # def def new
  # end

  def create
    Post.create(content: params[:content], checked: false)
    #redirect_to action: :index
    render json:{ post: post}
  end

  def checked
    #binding.pry
    post = Post.find(params[:id])
    if post.checked
      # 既読だった場合は解除する
      post.update(checked: false)
    else
      # 未読だった場合は既読にする
      post.update(checked: true)
    end

    #更新したレコードをitemとして再取得
    item = Post.find(params[:id])
    # JSON形式で checked.js に返却
    render json: { post: item }
  end
  
  

end
