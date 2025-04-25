# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=10.9.0

FROM node:${NODE_VERSION}

# Use production node environment by default.
ENV NODE_ENV=development

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY . .

RUN pnpm install --recursive
RUN pnpm build --filter=@yape-modules/core
RUN pnpm build
# RUN npx ts-node modules/core/prisma/seed.ts
RUN cd modules/core && pnpm db:seed

# Expose the port that the application listens on.
EXPOSE 3000

CMD ["sh", "-c", "pnpm start --filter @yape/processor && pnpm start --filter @yape/gateway"]
