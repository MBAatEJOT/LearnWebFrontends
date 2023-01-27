#!/bin/sh

cwd=$(pwd)

if [ -z "${FULL_NAME}" ]; then
	printf "Please enter your full Name: "
	read name
else
	name="${FULL_NAME}"
fi

if [ -z "${USER_MAIL}" ]; then
	printf "Please enter your e-Mail: "
	read mail
else
	mail="${USER_MAIL}"
fi

git config --global user.name "$name"
git config --global user.email "$mail"
