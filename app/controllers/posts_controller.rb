class PostsController < ApplicationController

  def index # indexアクションを定義
    @post = Post.find(1) #Postsテーブルにあるid1のレコードを代入
    @posts = Post.all #Postsテーブルの全てのレコードを代入
  end

  def def new

  end

  def create
    Post.create(content: params[:content])
  end
  
  

end
