class PagesController < ApplicationController
  def top
  end

  def example
  end

  def new_house
  end

  def exterior
  end

  def renovation
  end

  def concept
  end

  def service
  end

  def works
    # example と同じ内容を表示
    render :example
  end

  def company
  end

  def contact
  end

  def contact_submit
    # お問い合わせフォームの送信処理
    # 実際の処理では、パラメータの検証やメール送信を行う
    # params.require(:inquiry_type, :name, :email, :postal_code, :message)
    
    # 簡単なバリデーション
    if params[:name].present? && params[:email].present? && params[:message].present?
      # 成功時は完了ページにリダイレクト
      redirect_to contact_complete_path, notice: 'お問い合わせを受け付けました。'
    else
      # エラー時は元のページに戻る
      flash[:error] = '必須項目を入力してください。'
      render :contact
    end
  end

  def contact_complete
  end

  def privacy
  end

  def terms
  end
end
