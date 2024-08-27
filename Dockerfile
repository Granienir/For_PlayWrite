FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# ENV BASE_URL = https://qauto.forstudy.space/
# ENV USER_NAME = guest
# ENV USER_PASS = welcome2qauto
# ENV APP_USER_EMAIL = ilya.13.654@gmail.com
# ENV APP_USER_PASS = Qwerty12345

WORKDIR /playwright-tests

COPY . .

RUN npm install

CMD ["npx", "playwright", "test"]

