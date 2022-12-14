FROM docker.io/denoland/deno:alpine

ADD deno.json deno.lock *.ts utils vendor
