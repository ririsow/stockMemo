# ビルドステージ
FROM node:16 AS build

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコンテナ内にコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリをビルド
COPY . ./
RUN npm run build

# 軽量なnginxイメージを使って、ビルドしたアプリをホスティング
FROM nginx:alpine

# ビルドしたReactアプリをnginxの公開ディレクトリにコピー
COPY --from=build /app/build /usr/share/nginx/html

# コンテナ起動時にnginxを起動
CMD ["nginx", "-g", "daemon off;"]

# コンテナのポート80番を開放
EXPOSE 80
