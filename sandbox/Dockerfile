FROM alpine

COPY package.json sandbox.js ./sandbox/

WORKDIR sandbox

RUN apk add npm python3
RUN npm install

CMD ["node", "sandbox.js"]

EXPOSE 3000