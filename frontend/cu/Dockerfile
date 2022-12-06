#frontend/Dockerfile
FROM snuspl/swpp:practice11

WORKDIR /usr/app

COPY public/ public/
COPY run_frontend.sh .

COPY package.json .
RUN yarn install --silent

COPY src/ src/
COPY tsconfig.json .
RUN npm run build --prod --silent

RUN apt-get update && apt-get install -y nginx
# should have made nginx configuration file to the frontend directory
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN mkdir -p /usr/share/nginx/html
RUN cp -r build/* /usr/share/nginx/html/

ENTRYPOINT sh ./run_frontend.sh
