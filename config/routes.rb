Rails.application.routes.draw do
  root 'pages#top' # トップページ

  # 各サービスページ
  get 'new-house',   to: 'pages#new_house'  # 新築
  get 'renovation',  to: 'pages#renovation' # リフォーム
  get 'exterior',    to: 'pages#exterior'   # 外構
  get 'example',     to: 'pages#example'    # 施工事例

  # 追加ページ
  get 'concept',     to: 'pages#concept'    # コンセプト
  get 'service',     to: 'pages#service'    # サービス
  get 'works',       to: 'pages#works'      # 施工事例（別名）
  get 'company',     to: 'pages#company'    # 会社情報

  # お問い合わせ
  get 'contact',     to: 'pages#contact'    # お問い合わせフォーム
  post 'contact',    to: 'pages#contact_submit' # お問い合わせ送信
  get 'contact/complete', to: 'pages#contact_complete' # 完了画面

  # その他のページ
  get 'privacy',     to: 'pages#privacy'    # プライバシーポリシー
  get 'terms',       to: 'pages#terms'      # 利用規約
end