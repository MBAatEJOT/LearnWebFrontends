FROM mcr.microsoft.com/vscode/devcontainers/base:0-jammy

COPY ejot-scripts/setup.sh /conf/setup.sh

RUN echo 'set show-all-if-ambiguous on' >> /etc/inputrc
RUN echo '"\\e[Z": menu-complete' >> /etc/inputrc

# Reject Angulars analytics request
ENV NG_CLI_ANALYTICS=false

# Install node.js required libraries
RUN apt-get update \
	&& apt-get install -y curl

# Set up node.js repository
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -

# Install node.js
RUN apt-get install -y nodejs

# Install essentials
RUN apt-get install -y build-essential

# Install http-server
RUN npm i -g http-server

# Install Angular's cli
RUN npm i -g @angular/cli@^14
