FROM python:3.8.12-slim
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE=1
RUN apt-get update \
    && apt-get install -y build-essential python3-dev libpq-dev gcc musl-dev \
    && apt-get clean
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
