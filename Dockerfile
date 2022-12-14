FROM docker.io/denoland/deno:alpine

USER deno

WORKDIR /app

COPY deno.json deno.lock .
COPY vendor vendor
COPY . .
