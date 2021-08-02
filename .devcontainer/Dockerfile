FROM mcr.microsoft.com/vscode/devcontainers/base:0-focal

COPY ejot-scripts/artifacts.sh /conf/artifacts.sh
# Install node.js required libraries
RUN apt-get update \
	&& apt-get install -y curl

# Set up node.js repository
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Install node.js
RUN apt-get install -y nodejs

# Install essentials
RUN apt-get install -y build-essential

# Install http-server
RUN npm i -g http-server

# Reject Angulars analytics request
ENV NG_CLI_ANALYTICS=false

# Install Angular's cli
RUN npm i -g @angular/cli@^11
