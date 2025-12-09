# Step 1 — base image
FROM nginx:alpine

# Step 2 — remove default nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Step 3 — copy your project
COPY . /usr/share/nginx/html

# Step 4 — expose container port
EXPOSE 80

# Step 5 — start nginx
CMD ["nginx", "-g", "daemon off;"]
