FROM alpine

COPY runner.sh .
COPY *.py ./

RUN apk add bash python3

ENTRYPOINT ["bash", "runner.sh"]