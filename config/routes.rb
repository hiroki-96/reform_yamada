Rails.application.routes.draw do
  get 'pages/top'
  get 'pages/example'
  get 'pages/new_house'
  get 'pages/exterior'
  get 'pages/renovation'
  root 'pages#top'                          # トップページ

  get 'example',     to: 'pages#example'    # 施工事例
  get 'new-house',   to: 'pages#new_house'  # 新築
  get 'exterior',    to: 'pages#exterior'   # 外構
  get 'renovation',  to: 'pages#renovation' # リフォーム

  resource :contact, only: [:new, :create]  # お問い合わせ
  get 'contact/complete', to: 'contacts#complete'  # 完了画面
end