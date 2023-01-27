#!/bin/sh

cwd=$(pwd)

if [ -z "${FULL_NAME}" ]; then
	printf "Full name not found. Please run"
	printf "  git config --global user.name <<your full name>>"
else
	name="${FULL_NAME}"
	git config --global user.name "$name"
fi

if [ -z "${USER_MAIL}" ]; then
	printf "E-Mail not found. Please run"
	printf "  git config --global user.email <<your e-mail>>"
else
	mail="${USER_MAIL}"
	git config --global user.email "$mail"
fi

