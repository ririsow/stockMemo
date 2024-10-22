# ビルドステージ
FROM node:16 AS build

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコンテナ内にコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースコードをコンテナにコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev"]

# コンテナのポート3000を開放
EXPOSE 3000
