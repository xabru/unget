#!/usr/bin/env bash

printf -v "TIMEFORMAT" \
  "\e[38;5;105m%s\e[38;5;9m%s " \
  "real=" "%Rs" \
  "user=" "%Us" \
  "system=" "%Ss"

printf -v "TIMEFORMAT" \
  "\n\e[48;5;234;38;5;226m%s %s\e[0m" \
  "Elapsed time:" "${TIMEFORMAT::-1}"

time node dist/index.cjs "${@}"
